import total from '@/assets/myRace/total.png'
import week from '@/assets/myRace/week.png'
import day from '@/assets/myRace/day.png'

export const rankIcon = [total, week, day]

export const HOLDING_HEADER = [
  { attrs: { prop: "order", label: "序号" }, custom: true },
  { attrs: { prop: "stockcode", label: "商品代码" } },
  { attrs: { prop: "stockname", label: "商品简称" } },
  { attrs: { prop: "newvalue", label: "最新价" } },
  { attrs: { prop: "costprice", label: "成本价" } },
  { attrs: { prop: "holdnum", label: "持仓数" } },
  { attrs: { prop: "marketvalue", label: "市值" } },
  { attrs: { prop: "profitandloss", label: "盈亏" }, custom: true },
  { attrs: { prop: "plratio", label: "盈亏率" }, custom: true }
]
export const DISTRIBUTR_HEADER = [
  { attrs: { prop: "market", label: "类别" } },
  { attrs: { prop: "detail", label: "币种" } },
  { attrs: { prop: "totalmoney", label: "总资产" } },
  { attrs: { prop: "canusemoney", label: "可用资金" } },
  { attrs: { prop: "moneyscale", label: "现金资产比例" } },
  { attrs: { prop: "holdmarketvalue", label: "持仓市值" } },
  { attrs: { prop: "holdscale", label: "持仓比例" } },
  { attrs: { prop: "totaltradeamount", label: "累计交易费" } },
  { attrs: { prop: "floatingpl", label: "浮动盈亏" }, custom: true },
  { attrs: { prop: "plratio", label: "盈亏比例" }, custom: true }
]
export const RANK_HEADER = [
  { attrs: { prop: "stunickname", label: "昵称" } },
  { attrs: { prop: "stuname", label: "姓名" } },
  { attrs: { prop: "nowrank", label: "排名" } },
  { attrs: { prop: "initialmoney", label: "初始资金" } },
  { attrs: { prop: "canusemoney", label: "可用资金" } },
  { attrs: { prop: "totalmoney", label: "总资产" } },
  { attrs: { prop: "profitandloss", label: "总盈亏" }, custom: true },
  { attrs: { prop: "totalreturn", label: "总收益率" }, custom: true }
]
export const SCORE_HEADER = [
  { attrs: { prop: "stunickname", label: "昵称" } },
  { attrs: { prop: "stuname", label: "姓名" } },
  { attrs: { prop: "allscore", label: "评分" } },
  { attrs: { prop: "nowrank", label: "排名" } }
]

export const RISK_HEADER = [
  { attrs: { prop: "instructions", label: "风险指标" }, custom: true },
  { attrs: { prop: "curvalue", label: "当前值" } },
  { attrs: { prop: "average", label: "有效区间" } },
  { attrs: { prop: "totalyield", label: "总收益率" }, custom: true }
]

export const SCORE_CARD = [
  {
    title: '盈利能力',
    prefix: 'profit'
  },
  {
    title: '风控能力',
    prefix: 'risk'
  },
  {
    title: '选股水平',
    prefix: 'select'
  },
  {
    title: '出场水平',
    prefix: 'sell'
  }
]
