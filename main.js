const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { ExifTool } = require('exiftool-vendored');
const fs = require('fs/promises');

const exiftool = new ExifTool({ taskTimeoutMillis: 5000 });

function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 700,
    icon: path.join(__dirname, 'build', 'icon.png'), // <-- Custom app icon
    webPreferences: { preload: path.join(__dirname, 'preload.js') },
    resizable: false,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'under-window'
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// ---------- IPC ----------
ipcMain.handle('select-source', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select Source Files or Folder',
    properties: ['openFile', 'openDirectory', 'multiSelections'],
    filters: [
      { name: 'Supported Files', extensions: ['jpg', 'jpeg', 'heic', 'mov', 'mp4'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  if (result.canceled) return null;
  
  // If multiple files selected, return them as an array
  if (result.filePaths.length > 1) {
    return { type: 'files', paths: result.filePaths };
  }
  
  // If single file or directory selected
  const selectedPath = result.filePaths[0];
  const stats = await fs.stat(selectedPath);
  
  if (stats.isDirectory()) {
    return { type: 'folder', path: selectedPath };
  } else {
    return { type: 'files', paths: [selectedPath] };
  }
});

ipcMain.handle('select-destination', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select Destination Folder',
    properties: ['openDirectory', 'createDirectory'],
    buttonLabel: 'Select Folder'
  });
  
  if (result.canceled) return null;
  return result.filePaths[0];
});

ipcMain.handle('clean-batch', async (_e, sourceData, dstDir) => {
  let files = [];
  
  if (sourceData.type === 'folder') {
    // Read all files from the source folder
    const folderFiles = await fs.readdir(sourceData.path);
    files = folderFiles
      .filter(f => /\.(jpe?g|heic|mov|mp4)$/i.test(f))
      .map(f => ({ name: f, srcPath: path.join(sourceData.path, f) }));
  } else {
    // Use the selected files directly
    files = sourceData.paths
      .filter(f => /\.(jpe?g|heic|mov|mp4)$/i.test(f))
      .map(f => ({ name: path.basename(f), srcPath: f }));
  }
  
  let cleaned = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const outPath = path.join(dstDir, file.name);

    try {
      await fs.copyFile(file.srcPath, outPath);

      await exiftool.write(
        outPath,
        {
          Make: '',
          Model: '',
          Comment: '',
          'EXIF:Make': '',
          'EXIF:Model': '',
          'QuickTime:Comment': ''
        },
        ['-overwrite_original']
      );
      cleaned++;
    } catch (error) {
      console.error(`Error processing ${file.name}:`, error);
      // Continue with other files even if one fails
    }
  }
  return { total: files.length, cleaned };
});

app.on('will-quit', () => exiftool.end());