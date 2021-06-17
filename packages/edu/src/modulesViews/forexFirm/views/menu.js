export const MENU_DATA = [
  {
    name: "委托下单"
  },
  {
    name: "我的自选",
    path: ""
  },
  {
    name: "我的持仓",
    path: ""
  },
  {
    name: "龙虎榜",
    path: ""
  },
  {
    name: "我的战绩"
  },
  {
    name: "考评得分",
    path: ""
  }
]

export const CHILDREN = [
  { label: "下单", path: "firmOfferOrder", value: 0 },
  { label: "查撤委托", path: "realityQueryRepeal", value: 1 },
  { label: "委托信息", path: "realityDelegationMsg", value: 2 },
  { label: "成交信息", path: "realityBargainMsg", value: 3 },
  { label: "点差参数", path: "realitySpread", value: 4 },
  { label: "银汇转账", path: "realityBankSecurities", value: 5 }
]
export const GRADE = [
  { label: "我的收益", path: "", value: 0 },
  { label: "当前仓位", path: "", value: 1 },
  { label: "资产分布", path: "", value: 2 },
  { label: "资产排名", path: "", value: 3 },
  { label: "综合评分", path: "", value: 4 },
  { label: "风险指标", path: "", value: 5 }
]
