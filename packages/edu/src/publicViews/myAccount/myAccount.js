// 竞赛战绩
export const tableRace = {
  tableHeaderRace: [
    { attrs: { prop: 'racename', label: '竞赛名称' } },
    { attrs: { prop: 'dailyreturn', label: '日收益' } },
    { attrs: { prop: 'monthlyreturn', label: '月收益' } },
    { attrs: { prop: 'totalreturn', label: '总收益' } }
  ],
  tableDataRace: [
    { racename: "标准港股比赛", dailyreturn: '', monthlyreturn: '', totalreturn: '-0.03320' },
    { racename: "非标准港股比赛", dailyreturn: '', monthlyreturn: '', totalreturn: '' },
    { racename: "沪深A股竞赛", dailyreturn: '', monthlyreturn: '', totalreturn: '0.0210' },
    { racename: "标准港股比赛", dailyreturn: '', monthlyreturn: '', totalreturn: '-0.03320' },
    { racename: "非标准港股比赛", dailyreturn: '', monthlyreturn: '', totalreturn: '' }
  ]
}
// 自选商品
export const tablePro = {
  tableHeaderPro: [
    { attrs: { prop: 'code', label: '商品代码' } },
    { attrs: { prop: 'name', label: '商品名称' } },
    { attrs: { prop: 'now', label: '当前价' } },
    { attrs: { prop: 'pricelimit', label: '涨跌幅' } },
    { attrs: { prop: 'volume', label: '总成交量' } },
    { attrs: { prop: 'amount', label: '总成交金额' } }
  ],
  tableDataPro: [
    { code: "600000", name: '浦发银行', now: '10.43', pricelimit: '', volume: '6872817', amount: '71719514.00' },
    { code: "501007", name: '互联医疗', now: '10.43', pricelimit: '', volume: '85433', amount: '' }
  ]
}
export const tableRank = {
  tableHeaderRank: [
    { attrs: { prop: 'rank', label: '排名' } },
    { attrs: { prop: 'name', label: '姓名' } },
    { attrs: { prop: 'total', label: '总资产' } }
  ],
  tableDataRank: [
    { rank: 1, name: 'XX', total: '222222.00' },
    { rank: 2, name: 'XX', total: '222222.00' },
    { rank: 3, name: 'XX', total: '222222.00' },
    { rank: 4, name: 'XX', total: '222222.00' }
  ]
}
// 自选商品图表
const seriesData = [
  { name: '歌尔股份', value: '10' },
  { name: '立讯精密', value: '19' },
  { name: '浦发银行', value: '21' },
  { name: '华夏银行', value: '24' },
  { name: '韦尔股份', value: '20' },
  { name: '长电科技', value: '20' },
  { name: '漫步者', value: '40' },
  { name: '爱美客', value: '66' },
  { name: '通富微电', value: '20' },
  { name: '西安旅游', value: '32' },
  { name: '上海机场', value: '20' },
  { name: '华天酒店', value: '20' },
  { name: '招商银行', value: '16' },
  { name: '赣锋锂业', value: '33' },
  { name: '天齐锂业', value: '27' },
  { name: '金徽酒', value: '22' },
  { name: '盛和资源', value: '27' },
  { name: '华友钴业', value: '12' }
]
const legendData = seriesData.map(item => {
  return Object.assign({}, { name: item.name })
})
export const accountoption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20,
    itemGap: 20,
    data: legendData

    // selected: data.selected
  },
  series: [
    {
      name: '商品名称',
      type: 'pie',
      radius: '55%',
      center: ['40%', '50%'],
      data: seriesData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
