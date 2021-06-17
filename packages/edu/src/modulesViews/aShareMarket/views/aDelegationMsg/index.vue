<template>
  <entrust :toolsBarList="toolsBarList" :nowHeader="nowHeader" :hisHeader="hisHeader"></entrust>
</template>

<script>
import entrust from "@/modulesViews/components/entrust.vue"
export default {
  components: {
    entrust
  },
  setup () {
    const toolsBarList = [
      { status: true, type: true, export: true, search: true },
      { date: true, type: true, export: true, search: true }
    ]
    const nowHeader = [
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
    const hisHeader = [
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
    return {
      toolsBarList,
      nowHeader,
      hisHeader
    }
  }
}
</script>

<style>
</style>
