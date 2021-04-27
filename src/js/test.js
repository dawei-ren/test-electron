// 导入js模块 
import { drawChart } from '../js/charts.js'
import { downloadFileByBase64, saveFileByBase64 } from '../js/download.js'


// 主题tab切换逻辑
let lisDom = document.getElementById("lis").children
let tabDom = document.getElementById("tab").children

for (let i = 0; i < lisDom.length; i++) {
  // 循环 添加点击事件
  lisDom[i].onclick = () => {
    // alert(i) // 弹出当前点击li 的下标。
    //  去除 所有li class 样式-选中背景，设置所有div 隐藏
    for (var j = 0; j < lisDom.length; j++) {
      lisDom[j].removeAttribute("class");
      tabDom[j].style.display = "none";
    }
    // 当前点击的 li 添加 class 样式-选中背景 
    lisDom[i].setAttribute("class", "active");
    // 当前点击 li 对应的 div 显示
    tabDom[i].style.display = "block";
  }
}

// echart 画图
let myChart = drawChart()

// 下载图片
let downloadImgBtn = document.querySelector('#download-img-btn')
downloadImgBtn.onclick = () => {
  // 判断加载完成，下载图片
  // downloadFileByBase64(myChart.getDataURL(), 'test_img')

  saveFileByBase64(myChart.getDataURL())
  


}

