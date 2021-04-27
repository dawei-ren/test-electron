const { dialog } = require("electron").remote
const fs = require("fs")

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function downloadFile(url, name = 'chart_img') {
  var a = document.createElement("a")
  a.setAttribute("href", url)
  a.setAttribute("download", name)
  a.setAttribute("target", "_blank")
  let clickEvent = document.createEvent("MouseEvents");
  clickEvent.initEvent("click", true, true);
  a.dispatchEvent(clickEvent);
}

// 通过原生a标签下载文件
function downloadFileByBase64(base64, name) {
  var myBlob = dataURLtoBlob(base64)
  var myUrl = URL.createObjectURL(myBlob)
  downloadFile(myUrl, name)
}

// 通过fs下载文件,且弹出保存对话框
function saveFileByBase64AndAlertSaveWindow(base64_str) {
  let base64 = base64_str.replace(/^data:image\/\w+;base64,/, "");
  let dataBuffer = new Buffer.from(base64, 'base64');

  // 弹出保存文件对话框
  dialog.showSaveDialog({
    title: "保存文件",
    filters: [{ name: "Custom File Type", extensions: ['png', 'jpg'] }]
  }).then(reuslt => {
    fs.writeFileSync(reuslt.filePath, dataBuffer)
  }).catch(err => {
    console.log(err);
  })
}

// 直接下载图片到当前路径
function saveFileByBase64(base64_str) {
  let base64 = base64_str.replace(/^data:image\/\w+;base64,/, "");
  let dataBuffer = new Buffer.from(base64, 'base64');

  // 创建文件保存目录
  let fileDir = 'download'
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir)
  }

  // 创建文件名称
  let fileName = Date.parse(new Date()) + '.png'
  // 保存图片
  fs.writeFileSync(fileDir + '/' + fileName, dataBuffer)
}

export { saveFileByBase64 }