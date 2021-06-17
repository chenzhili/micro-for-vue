<template>
  <div class="container">
    <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :toolBar="toolBar"
      :options="statusList"
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
      { label: "当日委托", value: 0 },
      { label: "历史委托", value: 1 }
    ]

    const navValue = ref(0)

    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const statusList = [
      { label: "全部", value: 0 },
      { label: "担保物买", value: 1 },
      { label: "担保物卖", value: 2 },
      { label: "融资买入", value: 3 },
      { label: "融券卖出", value: 4 },
      { label: "买券还券", value: 5 },
      { label: "卖券还款", value: 6 }
    ]

    const header1 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "类别" } },
      { attrs: { prop: "a", label: "委托价格" } },
      { attrs: { prop: "a", label: "委托数量" } },
      { attrs: { prop: "a", label: "成交数量" } },
      { attrs: { prop: "a", label: "委托状态" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "被撤委托编号" } },
      { attrs: { prop: "a", label: "委托时间" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const header2 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "类别" } },
      { attrs: { prop: "a", label: "委托价格" } },
      { attrs: { prop: "a", label: "委托数量" } },
      { attrs: { prop: "a", label: "成交数量" } },
      { attrs: { prop: "a", label: "委托状态" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "被撤委托编号" } },
      { attrs: { prop: "a", label: "委托日期" } },
      { attrs: { prop: "a", label: "委托时间" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navItems,
      navChange,
      ajaxApi,
      tableHeader: computed(() => navValue.value === 0 ? header1 : header2),
      toolBar: computed(() =>
        navValue.value === 0
          ? { type: true, export: true, update: true }
          : { date: true, type: true, export: true, search: true }
      ),
      statusList
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
