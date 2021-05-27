const ipcMain = require('electron').ipcMain;
const path = require('path')

const myLoad = {
  loadFile: win => {
    win.loadFile(path.join(__dirname, '..', 'views', 'index.html'))
  
    // 监听render进程发送的ipc信息，如果接收到，转化窗口页面
    ipcMain.on('start-test', (event, arg) => {
      console.log(arg);  // 接收到的信息会打印在控制台
      win.loadFile(path.join(__dirname, '..', 'views', 'test.html'))
    })
  }
}

module.exports = myLoad;