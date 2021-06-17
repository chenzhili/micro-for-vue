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
  components: {},
  setup (props) {
    const navItems = [
      { label: "期权查撤委托", value: 0 },
      { label: "证券查撤委托", value: 1 }
    ]
    const navValue = ref(0)
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })
    const header1 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "委托时间" } },
      { attrs: { prop: "a", label: "合约代码" } },
      { attrs: { prop: "a", label: "合约名称" } },
      { attrs: { prop: "a", label: "买卖类别" } },
      { attrs: { prop: "a", label: "开平仓" } },
      { attrs: { prop: "a", label: "备兑标志" } },
      { attrs: { prop: "a", label: "委托价格" } },
      { attrs: { prop: "a", label: "委托数量" } },
      { attrs: { prop: "a", label: "撤单数量" } },
      { attrs: { prop: "a", label: "成交数量" } },
      { attrs: { prop: "a", label: "委托状态" } },
      { attrs: { prop: "a", label: "操作" } },
      { attrs: { prop: "a", label: "委托编号" } }
    ]

    const header2 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "委托时间" } },
      { attrs: { prop: "a", label: "委托日期" } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "类别" } },
      { attrs: { prop: "a", label: "委托价格" } },
      { attrs: { prop: "a", label: "委托数量" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "被撤委托编号" } },
      { attrs: { prop: "a", label: "状态" } },
      { attrs: { prop: "a", label: "操作" } }
    ]
    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navItems,
      ajaxApi,
      navChange,
      tableHeader: computed(() => navValue.value === 0 ? header1 : header2),
      toolBar: { update: true }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
