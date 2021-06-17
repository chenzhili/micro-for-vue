<template>
  <div class="container">
   <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :toolBar="toolBar"
      @navChange="navChange"
    ></table-query>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue"
export default {
  components: {
  },
  setup () {
    const navItems = [
      { label: "当日资金流水", value: 0 },
      { label: "历史资金流水", value: 1 }
    ]
    const options = [
      { label: "全部", value: 0 },
      { label: "担保物买", value: 0 },
      { label: "担保物卖", value: 0 },
      { label: "融资买入", value: 0 },
      { label: "融券卖出", value: 0 },
      { label: "买券还券", value: 0 },
      { label: "卖券还款", value: 0 }
    ]
    const navValue = ref(0)

    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const header1 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "发生时间" } },
      { attrs: { prop: "a", label: "发生金额" } },
      { attrs: { prop: "a", label: "成交金额" } },
      { attrs: { prop: "a", label: "币种" } },
      { attrs: { prop: "a", label: "流水号" } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "类别" } },
      { attrs: { prop: "a", label: "证券成交数量" } },
      { attrs: { prop: "a", label: "证券成交价" } },
      { attrs: { prop: "a", label: "证券余量" } },
      { attrs: { prop: "a", label: "佣金" } },
      { attrs: { prop: "a", label: "印花税" } },
      { attrs: { prop: "a", label: "过户费" } }
    ]
    const header2 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "发生日期" } },
      { attrs: { prop: "a", label: "发生时间" } },
      { attrs: { prop: "a", label: "发生金额" } },
      { attrs: { prop: "a", label: "成交金额" } },
      { attrs: { prop: "a", label: "币种" } },
      { attrs: { prop: "a", label: "流水号" } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "类别" } },
      { attrs: { prop: "a", label: "证券成交数量" } },
      { attrs: { prop: "a", label: "证券成交价" } },
      { attrs: { prop: "a", label: "证券余量" } },
      { attrs: { prop: "a", label: "佣金" } },
      { attrs: { prop: "a", label: "印花税" } },
      { attrs: { prop: "a", label: "过户费" } }
    ]
    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navItems,
      options,
      navChange,
      ajaxApi,
      tableHeader: computed(() => (navValue.value === 0 ? header1 : header2)),
      toolBar: computed(() =>
        navValue.value === 0
          ? { update: true }
          : { date: true, type: true, export: true, search: true }
      )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
