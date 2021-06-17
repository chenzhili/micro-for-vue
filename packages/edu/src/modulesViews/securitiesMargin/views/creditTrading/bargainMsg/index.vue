<template>
  <div class="container">
    <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :toolBar="toolBar"
      :options="options"
      @navChange="navChange"
    ></table-query>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue"
export default {
  components: {},
  setup () {
    const navItems = [
      { label: "当日成交", value: 0 },
      { label: "历史成交", value: 1 }
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
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "类别" } },
      { attrs: { prop: "a", label: "成交数量" } },
      { attrs: { prop: "a", label: "成交价格" } },
      { attrs: { prop: "a", label: "成交金额" } },
      { attrs: { prop: "a", label: "成交时间" } },
      { attrs: { prop: "a", label: "成交编号" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const header2 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "类别" } },
      { attrs: { prop: "a", label: "成交数量" } },
      { attrs: { prop: "a", label: "成交价格" } },
      { attrs: { prop: "a", label: "成交金额" } },
      { attrs: { prop: "a", label: "成交日期" } },
      { attrs: { prop: "a", label: "成交时间" } },
      { attrs: { prop: "a", label: "成交编号" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navItems,
      navChange,
      ajaxApi,
      tableHeader: computed(() => (navValue.value === 0 ? header1 : header2)),
      toolBar: computed(() =>
        navValue.value === 0
          ? { type: true, export: true, update: true }
          : { date: true, type: true, export: true, search: true }
      ),
      options
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
