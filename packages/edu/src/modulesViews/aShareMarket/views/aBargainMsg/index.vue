<template>
  <exchange :toolsBarList="toolsBarList" :nowHeader="nowHeader" :hisHeader="hisHeader"></exchange>
</template>

<script>
import exchange from "@/modulesViews/components/exchange.vue"
export default {
  components: {
    exchange
  },
  setup () {
    const toolsBarList = [
      { export: true, update: true },
      { date: true, type: true, export: true, search: true }
    ]
    const nowHeader = [
      { attrs: { prop: "order", label: "序号" }, custom: true },
      { attrs: { prop: "stockcode", label: "证券代码" } },
      { attrs: { prop: "stockname", label: "证券名称" } },
      { attrs: { prop: "entrustbs", label: "类别" }, custom: true },
      { attrs: { prop: "businessamount", label: "成交数量" } },
      { attrs: { prop: "businessprice", label: "成交价格" } },
      { attrs: { prop: "businessbalance", label: "成交金额" } },
      { attrs: { prop: "businesscrttime", label: "成交时间" } },
      { attrs: { prop: "businessecno", label: "成交编号" } },
      { attrs: { prop: "detail", label: "成交明细" }, custom: true },
      { attrs: { prop: "reason", label: "下单理由" }, custom: true }
    ]
    const hisHeader = [
      { attrs: { prop: "order", label: "序号" }, custom: true },
      { attrs: { prop: "stockcode", label: "证券代码" } },
      { attrs: { prop: "stockname", label: "证券名称" } },
      { attrs: { prop: "entrustbs", label: "类别" }, custom: true },
      { attrs: { prop: "businessamount", label: "成交数量" } },
      { attrs: { prop: "businessprice", label: "成交价格" } },
      { attrs: { prop: "businessbalance", label: "成交金额" } },
      { attrs: { prop: "businesscrtdate", label: "成交日期" } },
      { attrs: { prop: "businesscrttime", label: "成交时间" } },
      { attrs: { prop: "businessecno", label: "成交编号" } },
      { attrs: { prop: "detail", label: "成交明细" }, custom: true },
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
