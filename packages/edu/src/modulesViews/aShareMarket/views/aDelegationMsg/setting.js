export const nowHeader = [
  { attrs: { prop: "order", label: "序号" }, custom: true },
  { attrs: { prop: "stockcode", label: "证券代码" } },
  { attrs: { prop: "stockname", label: "证券名称" } },
  { attrs: { prop: "entrustbs", label: "类别" }, custom: true },
  { attrs: { prop: "optentrustprice", label: "委托价格" } },
  { attrs: { prop: "entrustamount", label: "委托数量" } },
  { attrs: { prop: "businessamount", label: "成交数量" } },
  { attrs: { prop: "entruststatus", label: "委托状态" }, custom: true },
  { attrs: { prop: "entrustsecno", label: "委托编号" } },
  { attrs: { prop: "orgreportno", label: "被撤委托编号" }, custom: true },
  { attrs: { prop: "entrustseccrttime", label: "委托时间" } },
  { attrs: { prop: "reason", label: "下单理由" }, custom: true }
]
export const hisHeader = [
  { attrs: { prop: "order", label: "序号" }, custom: true },
  { attrs: { prop: "stockcode", label: "证券代码" } },
  { attrs: { prop: "stockname", label: "证券名称" } },
  { attrs: { prop: "entrustbs", label: "类别" }, custom: true },
  { attrs: { prop: "optentrustprice", label: "委托价格" } },
  { attrs: { prop: "entrustamount", label: "委托数量" } },
  { attrs: { prop: "businessamount", label: "成交数量" } },
  { attrs: { prop: "entruststatus", label: "委托状态" }, custom: true },
  { attrs: { prop: "entrustsecno", label: "委托编号" } },
  { attrs: { prop: "orgreportno", label: "被撤委托编号" }, custom: true },
  { attrs: { prop: "businesscrtdate", label: "委托日期" } },
  { attrs: { prop: "businesscrttime", label: "委托时间" } },
  { attrs: { prop: "reason", label: "下单理由" }, custom: true }
]

export const status = {
  6: '已撤单',
  8: '已完成'
}

export const navItems = [
  { label: "当日委托", value: 0 },
  { label: "历史委托", value: 1 }
]
