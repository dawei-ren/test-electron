const echarts = require('echarts')

// let heatmapChart = {}
// let heatmapOption = {}

// 渐变堆叠面积图
function drawChart() {
  let myChart = echarts.init(document.getElementById('mychart'));
  let option = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: '渐变堆叠面积图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(128, 255, 165)'
          }, {
            offset: 1,
            color: 'rgba(1, 191, 236)'
          }])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0, 221, 255)'
          }, {
            offset: 1,
            color: 'rgba(77, 119, 255)'
          }])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 282, 111, 234, 220, 340, 310]
      },
      {
        name: 'Line 3',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(55, 162, 255)'
          }, {
            offset: 1,
            color: 'rgba(116, 21, 219)'
          }])
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 132, 201, 334, 190, 130, 220]
      },
      {
        name: 'Line 4',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255, 0, 135)'
          }, {
            offset: 1,
            color: 'rgba(135, 0, 157)'
          }])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      },
      {
        name: 'Line 5',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255, 191, 0)'
          }, {
            offset: 1,
            color: 'rgba(224, 62, 76)'
          }])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 302, 181, 234, 210, 290, 150]
      }
    ],
    animation: false
  };
  option && myChart.setOption(option);
  return myChart
}

// 基础线图
function drawLine() {


  var chartDom = document.getElementById('line');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }],
    animation: false,
  };

  option && myChart.setOption(option);
  // myChart.setOption(option);

  // console.log(myChart.getDataURL());

}

//  热力图
function getFftData(pressureData) {
  let fftXData = []
  let fftYData = []
  let fftValue = []

  for (var i = 0; i < pressureData.fftSeries.length; i++) {
    fftYData.push(pressureData.fftSeries[i].name)

    for (var j = 0; j < pressureData.fftSeries[i].data.length; j++) {
      let eachList = new Array();
      eachList.push(j)
      eachList.push(i)
      eachList.push(pressureData.fftSeries[i].data[j].y)
      fftValue.push(eachList)
      if (i == 0) {
        fftXData.push(pressureData.fftSeries[i].data[j].x)
      }
    }
  }
  return [pressureData.pressureTrace[0].x, pressureData.pressureTrace[0].y, fftXData, fftYData, fftValue]
}

function setHeatmapOption(fftXData, fftYData, fftValue) {
  let heatmapOption = {
    title: {
      // show: true,
      text: '气压周期振幅图',
      textStyle: {
        fontFamily: 'simsun'
      },
      x: 'center',
      top: 20
    },
    tooltip: {
      position: 'top'
    },
    xAxis: {
      type: 'category',
      data: fftXData,
      splitArea: {
        show: true
      },
      axisLabel: {
        rotate: 30,
        interval: 3
      }
    },
    yAxis: {
      type: 'category',
      data: fftYData,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      top: 60,
      type: "piecewise",   // 修改图例显示模式，逐段显示
      pieces: [
        // 自定义图例颜色
        { min: 0, max: 1, color: '#CCE6FF' },
        { min: 1, max: 3, color: '#00C8FF' },
        { min: 3, max: 6, color: '#009BF5' },
        { min: 6, max: 10, color: '#009BF5' },
        { min: 10, max: 15, color: '#0000F5' },
        { min: 15, max: 20, color: '#00F500' },
        { min: 20, max: 30, color: '#00BE00' },
        { min: 30, max: 40, color: '#008C00' },
        { min: 40, max: 50, color: '#005A00' },
        { min: 50, max: 60, color: '#FFFF00' },
        { min: 60, max: 80, color: '#E6B400' },
        { min: 80, max: 100, color: '#FF9600' },
        { min: 100, max: 120, color: '#FF0000' },
        { min: 120, max: 160, color: '#B40000' },
        { min: 160, max: 200, color: '#E6468C' },
        { min: 200, max: 100000, color: '#7828A0' },
      ]
    },
    series: [{
      name: 'Punch Card',
      type: 'heatmap',
      data: fftValue,
      label: {
        show: false    // 是否在色块上显示数值
      },

      itemStyle: {
        borderColor: '#ffffff',   // 色块边框颜色
        borderWidth: 1   // 色块边框宽度
      },
      position: []

    }],
    grid: {
      top: 100,
      bottom: 100,
    }
  };

  return heatmapOption
}

function createHeatmapChart(pressureDataList, chartDom) {
  let myChart = echarts.init(chartDom);
  let myOption = setHeatmapOption(pressureDataList[2], pressureDataList[3], pressureDataList[4])
  myOption && myChart.setOption(myOption);
  return myChart
}

function drawHeatmap(fftXData, fftYData, fftValue, heatmapId) {
  let heatmapChart = echarts.init(document.getElementById(heatmapId));
  let heatmapOption = setHeatmapOption(fftXData, fftYData, fftValue)
  heatmapOption && heatmapChart.setOption(heatmapOption);
}

function drawLineArea(elementId) {
  var chartDom = document.getElementById(elementId);
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: '堆叠区域图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };

  option && myChart.setOption(option);
}

export { drawChart, drawLine, getFftData, drawHeatmap, drawLineArea}