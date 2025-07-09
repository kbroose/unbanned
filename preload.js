const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  selectSource: () => ipcRenderer.invoke('select-source'),
  selectDestination: () => ipcRenderer.invoke('select-destination'),
  clean: (sourceData, dst) => ipcRenderer.invoke('clean-batch', sourceData, dst)
});