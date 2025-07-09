const s = id => document.getElementById(id);
let sourceData = null;
let dst = '';

async function pick(which){
  if (which === 'src') {
    const result = await window.api.selectSource();
    if (!result) return;
    
    sourceData = result;
    
    if (result.type === 'folder') {
      s('src').value = `📁 ${result.path}`;
    } else {
      if (result.paths.length === 1) {
        s('src').value = `📄 ${result.paths[0]}`;
      } else {
        s('src').value = `📄 ${result.paths.length} files selected`;
      }
    }
  } else {
    const folder = await window.api.selectDestination();
    if (!folder) return;
    dst = folder;
    s('dst').value = `📁 ${folder}`;
  }
  
  s('run').disabled = !(sourceData && dst);
}

function updateProgress(percent, text) {
  const progressContainer = s('progress-container');
  const progressFill = s('progress-fill');
  const progressText = s('progress-text');
  
  progressContainer.style.display = 'block';
  progressFill.style.width = `${percent}%`;
  progressText.textContent = text;
}

function updateLog(message, type = 'info') {
  const log = s('log');
  log.textContent = message;
  log.className = type; // 'success', 'error', or default
}

async function run(){
  s('run').disabled = true;
  updateProgress(0, 'Starting...');
  updateLog('Initializing cleanup process...');
  
  try{
    // Show progress for file discovery
    updateProgress(10, 'Scanning files...');
    await new Promise(resolve => setTimeout(resolve, 500)); // Brief delay for UX
    
    updateProgress(20, 'Processing files...');
    const {total, cleaned} = await window.api.clean(sourceData, dst);
    
    updateProgress(100, 'Complete!');
    updateLog(`✅ Successfully processed ${total} files\n🧹 Removed metadata from ${cleaned} file(s)`, 'success');
    
  }catch(e){
    updateProgress(0, 'Error occurred');
    updateLog(`❌ Error: ${e.message}`, 'error');
  }
  
  // Hide progress bar after a delay
  setTimeout(() => {
    s('progress-container').style.display = 'none';
  }, 2000);
  
  s('run').disabled = false;
}