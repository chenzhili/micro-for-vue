export const ACCOUNT_HEADER = [
  { attrs: { prop: "order", label: "序号" }, custom: true },
  { attrs: { prop: "intialasset", label: "初始资金" } },
  { attrs: { prop: "balance", label: "冻结资金" } },
  { attrs: { prop: "avalbal", label: "可用金额" } },
  { attrs: { prop: "outbal", label: "可取金额" } },
  { attrs: { prop: "totalalasset", label: "总资产" } },
  { attrs: { prop: "totalmarketvalue", label: "参考市值" } },
  { attrs: { prop: "accountprofit", label: "账户盈亏" }, custom: true }
]

export const HIS_EXCHANGES_HEADER = [
  { attrs: { prop: "order", label: "序号" }, custom: true },
  { attrs: { prop: "stockcode", label: "证券代码" } },
  { attrs: { prop: "stockname", label: "证券名称" } },
  { attrs: { prop: "entrustbs", label: "类型" }, custom: true },
  { attrs: { prop: "businessamount", label: "成交数量" } },
  { attrs: { prop: "businessprice", label: "成交价格" } },
  { attrs: { prop: "businessbalance", label: "成交金额" } },
  { attrs: { prop: "businesscrtdate", label: "成交日期" } },
  { attrs: { prop: "businesscrttime", label: "成交时间" } },
  { attrs: { prop: "businessecno", label: "成交编号" } },
  { attrs: { prop: "reason", label: "下单理由" }, custom: true }
]

export const HIS_CAPITAL_FLOWS_HEADER = [
  { attrs: { prop: "order", label: "序号" }, custom: true },
  { attrs: { prop: "businesscrtdate", label: "发生日期", width: '120' } },
  { attrs: { prop: "businesscrttime", label: "发生时间", width: '120' } },
  { attrs: { prop: "occurmoney", label: "发生金额", width: '120' } },
  { attrs: { prop: "businessbalance", label: "成交金额", width: '120' } },
  { attrs: { prop: "moneydetail", label: "币种", width: '120' } },
  { attrs: { prop: "businessecno", label: "流水号", width: '120' } },
  { attrs: { prop: "stockcode", label: "证券代码", width: '120' } },
  { attrs: { prop: "stockname", label: "证券名称", width: '120' } },
  { attrs: { prop: "entrustbs", label: "类别", width: '120' }, custom: true },
  { attrs: { prop: "businessamount", label: "证券成交数量", width: '120' } },
  { attrs: { prop: "businessprice", label: "证券成交价", width: '120' } },
  { attrs: { prop: "restnum", label: "证券余量", width: '120' } },
  { attrs: { prop: "standardfare0", label: "佣金" } },
  { attrs: { prop: "exchangefare1", label: "印花税" } },
  { attrs: { prop: "exchangefare2", label: "过户费" } }
]
