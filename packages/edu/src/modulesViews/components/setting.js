export const ENTRUST = {
  navItems: [
    { label: "当日委托", value: 0 },
    { label: "历史委托", value: 1 }
  ]
}

export const EXCHANGE = {
  navItems: [
    { label: "当日成交", value: 0 },
    { label: "历史成交", value: 1 }
  ]
}

export const TURNOVER = {
  navItems: [
    { label: "当日资金流水", value: 0 },
    { label: "历史资金流水", value: 1 }
  ]
}

export const REGISTRATION = {
  header: [
    { attrs: { prop: "order", label: "序号" }, custom: true },
    { attrs: { prop: "businessecno", label: "交割单序号", width: 120 } },
    { attrs: { prop: "stockcode", label: "证券代码" } },
    { attrs: { prop: "stockname", label: "证券名称" } },
    { attrs: { prop: "businessecno", label: "成交编号" } },
    { attrs: { prop: "businesscrtdate", label: "成交日期", width: 120 } },
    { attrs: { prop: "businesscrttime", label: "成交时间", width: 120 } },
    { attrs: { prop: "entrustbs", label: "类别" } },
    { attrs: { prop: "businessamount", label: "证券发生数量", width: 120 } },
    { attrs: { prop: "restnum", label: "证券余量" } },
    { attrs: { prop: "businessprice", label: "成交价格" } },
    { attrs: { prop: "businessbalance", label: "成交金额" } },
    { attrs: { prop: "standardfare0", label: "佣金" } },
    { attrs: { prop: "exchangefare1", label: "印花税" } },
    { attrs: { prop: "exchangefare2", label: "过户费" } },
    { attrs: { prop: "exchangefare", label: "清算总费用", width: 120 } },
    { attrs: { prop: "totalBal", label: "资金余额", width: 120 } }
  ],
  navItems: [{ label: "查询交割单", value: 0 }]
}
