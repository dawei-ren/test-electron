const ipcRenderer = require('electron').ipcRenderer


let btn = document.querySelector("#test-btn")

// 点击测试按钮，发送ipc信息给主进程
btn.onclick = () => {
  ipcRenderer.send('start-test', 'ping')
}