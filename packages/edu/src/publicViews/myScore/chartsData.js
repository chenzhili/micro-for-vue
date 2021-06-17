export const profitOption = (chartsSet) => {
  return {
    tooltip: {
      trigger: 'axis',
      textStyle: {
        align: 'left'
      },
      formatter: function (params) {
        let html = params[0].name + "<br>"
        for (let i = 0; i < params.length; i++) {
          html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>      '
          html += params[i].seriesName + "： " + params[i].value + "%<br>"
        }
        return html
      }
    },
    legend: {
      data: ['比赛收益', '指数收益']
    },
    grid: {
      left: '0',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      offset: 10,
      data: chartsSet.dateList
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %'
      },
      show: true,
      boundaryGap: ['20%', '20%']
    },
    series: [
      {
        name: '比赛收益',
        type: 'line',
        data: chartsSet.indexsData,
        itemStyle: {
          color: '#E0585B'
        }
      },
      {
        name: '指数收益',
        type: 'line',
        data: chartsSet.listData,
        itemStyle: {
          color: '#3A6FD9'
        }
      }
    ]
  }
}

export const distributeOption = (chartsSet) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: '4%',
      top: '7%',
      bottom: '5%',
      itemGap: 16,
      itemWidth: 28,
      itemHeight: 15,
      textStyle: {
        color: '#666',
        fontSize: 14
      },
      data: chartsSet.legendData
    },
    series: [
      {
        name: '商品名称',
        type: 'pie',
        radius: '60%',
        center: ['40%', '50%'],
        startAngle: 100,
        data: chartsSet.seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: true,
          length2: 50
        },
        label: {
          formatter: '{b}:{c}({d}%)',
          fontSize: 14
        }
      }
    ]
  }
}

export const scoreOption = (chartsSet) => {
  return {
    legend: {
      icon: 'circle',
      textStyle: {
        fontSize: 12,
        color: '#222222'
      },
      data: ['个人成绩', '市场平均']
    },
    radar: {
      shape: 'circle',
      radius: 117,
      startAngle: 55,
      name: {
        formatter: '{value}',
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#222222'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#E4E4E4',
          width: 1,
          type: 'dashed'
        }
      },
      indicator: [
        { name: '综合能力', max: 6500 },
        { name: '盈利能力', max: 16000 },
        { name: '选股水平', max: 30000 },
        { name: '出场水平', max: 38000 },
        { name: '风控能力', max: 52000 }
      ]
    },
    series: [{
      type: 'radar',
      symbol: 'none',
      data: [
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: '市场平均',
          itemStyle: {
            color: '#929292'
          },
          areaStyle: {
            color: '#929292'
          }
        },
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: '个人成绩',
          itemStyle: {
            color: '#3A6FD9'
          },
          areaStyle: {
            color: '#3A6FD9'
          }
        }
      ]
    }]
  }
}
