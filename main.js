const { app, BrowserWindow, Tray, Menu  } = require('electron')
const path = require('path')
const ipcMain = require('electron').ipcMain;

let tray = null
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

  // 右下角托盘区显示

  // 当点击关闭按钮
  win.on('close', (e) => {
    e.preventDefault();  // 阻止退出程序
    win.setSkipTaskbar(true)   // 取消任务栏显示
    win.hide();    // 隐藏主程序窗口
  })

  // 创建任务栏图标
  tray = new Tray(path.join(__dirname, 'src', 'icons', 'small.ico'))

  // 自定义托盘图标的内容菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      // 点击退出菜单退出程序
      label: '退出', click: function () {
        console.log(123);
        win.destroy()
        app.quit()

      }
    }
  ])

  tray.setToolTip('test-electron')  // 设置鼠标指针在托盘图标上悬停时显示的文本
  tray.setContextMenu(contextMenu)  // 设置图标的内容菜单
  // 点击托盘图标，显示主窗口
  tray.on("click", () => {
    win.show();
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