<template>
  <turnover :toolsBarList="toolsBarList" :nowHeader="nowHeader" :hisHeader="hisHeader"></turnover>
</template>

<script>
import turnover from "@/modulesViews/components/turnover.vue"
export default {
  components: {
    turnover
  },
  setup () {
    const toolsBarList = [
      { update: true },
      { date: true, type: true, export: true, search: true }
    ]
    const nowHeader = [
      { attrs: { prop: "order", label: "序号" }, custom: true },
      { attrs: { prop: "businesscrttime", label: "发生时间", width: 120 } },
      { attrs: { prop: "occurmoney", label: "发生金额", width: 120 } },
      { attrs: { prop: "businessbalance", label: "成交金额" } },
      { attrs: { prop: "moneydetail", label: "币种" } },
      { attrs: { prop: "businessecno", label: "流水号" } },
      { attrs: { prop: "stockcode", label: "证券代码" } },
      { attrs: { prop: "stockname", label: "证券名称" } },
      { attrs: { prop: "entrustbs", label: "类别" }, custom: true },
      { attrs: { prop: "businessamount", label: "证券成交数量", width: 120 } },
      { attrs: { prop: "businessprice", label: "证券成交价", width: 120 } },
      { attrs: { prop: "businessamount", label: "证券余量" } },
      { attrs: { prop: "standardfare0", label: "佣金" } },
      { attrs: { prop: "exchangefare1", label: "印花税" } },
      { attrs: { prop: "exchangefare2", label: "过户费" } }
    ]
    const hisHeader = [
      { attrs: { prop: "order", label: "序号" }, custom: true },
      { attrs: { prop: "businesscrtdate", label: "发生日期", width: 120 } },
      { attrs: { prop: "businesscrttime", label: "发生时间" } },
      { attrs: { prop: "occurmoney", label: "发生金额", width: 120 } },
      { attrs: { prop: "businessbalance", label: "成交金额" } },
      { attrs: { prop: "moneydetail", label: "币种" } },
      { attrs: { prop: "businessecno", label: "流水号" } },
      { attrs: { prop: "stockcode", label: "证券代码" } },
      { attrs: { prop: "stockname", label: "证券名称" } },
      { attrs: { prop: "entrustbs", label: "类别" }, custom: true },
      { attrs: { prop: "businessamount", label: "证券成交数量", width: 120 } },
      { attrs: { prop: "businessprice", label: "证券成交价", width: 120 } },
      { attrs: { prop: "businessamount", label: "证券余量" } },
      { attrs: { prop: "standardfare0", label: "佣金" } },
      { attrs: { prop: "exchangefare1", label: "印花税" } },
      { attrs: { prop: "exchangefare2", label: "过户费" } }
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
