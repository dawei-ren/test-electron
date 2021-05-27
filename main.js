const { app, BrowserWindow } = require('electron')
const path = require('path')

const myMenu = require('./src/main/menu')
const myTray = require('./src/main/tray')
const myLoad = require('./src/main/load')


let win = null

// 设置单实例模式
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  // 创建 myWindow, 加载应用的其余部分, etc...
  app.whenReady().then(() => {
    win = createWindow()
    myMenu.setMenu(win)
    myLoad.loadFile(win)
    // myTray.setTray(win)
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        win = createWindow()
        myMenu.setMenu(win)
        myLoad.loadFile(win)
        // myTray.setTray(win)
      }
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}


function createWindow() {
  win = new BrowserWindow({
    width: 850,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'js', 'preload.js'),

      // 以下配置必须要有，
      nodeIntegration: true,   // 是否启用node集成
      contextIsolation: false,
      webviewTag: true,   // 是否启用webview
      enableRemoteModule: true    // 是否启用远程模块
    }
  })
  return win
}




