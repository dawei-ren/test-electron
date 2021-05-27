const { app, Tray, Menu } = require('electron')
const path = require('path')

let tray = null

const myTray = {
  setTray: win => {
    // 右下角托盘区显示

    // 当点击关闭按钮
    win.on('close', (e) => {
      e.preventDefault();  // 阻止退出程序
      win.setSkipTaskbar(true)   // 取消任务栏显示
      win.hide();    // 隐藏主程序窗口
    })

    // 创建任务栏图标
    tray = new Tray(path.join(__dirname, '..', 'icons', 'small.ico'))

    // 自定义托盘图标的内容菜单
    const contextMenu = Menu.buildFromTemplate([
      {
        // 点击退出菜单退出程序
        label: '退出', click: function () {
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
}

module.exports = myTray;