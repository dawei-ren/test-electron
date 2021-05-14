const {Menu} = require(['electron'])

let template = [
  {
    label: '用户',
    submenu: [
      {label: '退出登陆'},
      {label: '切换用户'}
    ]
  }
]

let m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)