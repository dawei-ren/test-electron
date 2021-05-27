
const { Menu } = require('electron')

const myMenu = {
  setMenu: win => {
    // 菜单设置
    let template = [
      {
        label: '用户',
        submenu: [
          {
            label: '退出登陆',
            click: () => {
              console.log("logout");
            }
          },
          { label: '切换用户' },
          {
            label: '控制台',
            click: () => {
              win.webContents.openDevTools({ mode: 'bottom' })
            }
          }
        ]
      }
    ]

    let m = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(m)

  }
}



// export {setMenu}
module.exports = myMenu;

