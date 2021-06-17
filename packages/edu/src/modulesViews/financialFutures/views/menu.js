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
  { label: "三键下单", path: "financialNewOrder", value: 0 },
  { label: "传统下单", path: "financialOldOrder", value: 1 },
  { label: "查撤委托", path: "financialQueryRepeal", value: 2 },
  { label: "委托信息", path: "financialDelegationMsg", value: 3 },
  { label: "成交信息", path: "financialBargainMsg", value: 4 },
  { label: "合约品种", path: "financialContract", value: 5 },
  { label: "银证转账", path: "financialBankSecurities", value: 6 }
]
export const GRADE = [
  { label: "我的收益", path: "", value: 0 },
  { label: "当前仓位", path: "", value: 1 },
  { label: "资产分布", path: "", value: 2 },
  { label: "资产排名", path: "", value: 3 },
  { label: "综合评分", path: "", value: 4 },
  { label: "风险指标", path: "", value: 5 }
]
