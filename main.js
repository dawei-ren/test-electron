var electron = require('electron')

var app = electron.app  // 引用app
var BrowserWindow = electron.BrowserWindow  // 窗口引用
var mainWindow = null  // 声明要打开的主窗口

app.on('ready', ()=> {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800
  })

  mainWindow.loadFile('index.html')  // 加载html页面

  // 监听关闭
  mainWindow.on('close', ()=>{
    mainWindow = null
  })
})