export const MENU_DATA = [
  {
    name: "委托下单",
    menus: [
      { name: '信用交易', path: '' },
      { name: '普通交易', path: '' }
    ]
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
  { label: "担保品买卖", path: "collateralTrading", value: 0 },
  { label: "融资买入", path: "financingBuy", value: 1 },
  { label: "融券卖出", path: "securitiesSell", value: 2 },
  { label: "买券还券", path: "securityReturn", value: 3 },
  { label: "卖券还款", path: "fundReturn", value: 4 },
  { label: "直接还款/券", path: "directReturn", value: 5 },
  { label: "查撤委托", path: "queryRepeal", value: 6 },
  { label: "委托信息", path: "delegationMsg", value: 7 },
  { label: "成交信息", path: "bargainMsg", value: 8 },
  { label: "资金流水", path: "fundCondition", value: 9 },
  { label: "担保品划转", path: "collateralTransfer", value: 10 }
]
export const GENERAL = [
  { label: "买入/卖出", path: "generalDeal", value: 0 },
  { label: "查撤委托", path: "generalQueryRepeal", value: 1 },
  { label: "委托信息", path: "generalDelegationMsg", value: 2 },
  { label: "成交信息", path: "generalBargainMsg", value: 3 },
  { label: "资金流水", path: "generalFundCondition", value: 4 },
  { label: "查询交割单", path: "generalDeliveryList", value: 5 },
  { label: "银证转账", path: "bankSecuritiesTransfer", value: 6 }
]
export const GRADE = [
  { label: "我的收益", path: "", value: 0 },
  { label: "当前仓位", path: "", value: 1 },
  { label: "资产分布", path: "", value: 2 },
  { label: "资产排名", path: "", value: 3 },
  { label: "综合评分", path: "", value: 4 },
  { label: "风险指标", path: "", value: 5 }
]
