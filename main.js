const { app, BrowserWindow } = require('electron')
const path = require('path')
const ipcMain = require('electron').ipcMain;

function createWindow () {
  const win = new BrowserWindow({
    width: 850,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'js', 'preload.js'),

      // 以下配置必须要有，
      nodeIntegration: true,   // 是否启用node集成
      contextIsolation: false,
      webviewTag:true,   // 是否启用webview
      enableRemoteModule: true    // 是否启用远程模块
    }
  })

  win.loadFile(path.join(__dirname, 'src', 'views', 'index.html'))

  // 监听render进程发送的ipc信息，如果接收到，转化窗口页面
  ipcMain.on('start-test', (event, arg) => {
    console.log(arg);  // 接收到的信息会打印在控制台
    win.loadFile(path.join(__dirname, 'src', 'views', 'test.html'))
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})