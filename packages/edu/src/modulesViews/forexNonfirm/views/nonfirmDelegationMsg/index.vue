<template>
  <div class="container">
    <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :options="options"
      :toolBar="toolBar"
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
      { label: "当日委托", value: 0 },
      { label: "历史委托", value: 1 }
    ]
    const options = [
      { label: "全部", value: 0 },
      { label: "买入开仓", value: 1 },
      { label: "买入平仓", value: 2 },
      { label: "卖出开仓", value: 3 },
      { label: "卖出平仓", value: 4 }
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
      { attrs: { prop: "a", label: "商品代码" } },
      { attrs: { prop: "a", label: "商品名称" } },
      { attrs: { prop: "a", label: "指令类型" } },
      { attrs: { prop: "a", label: "委托价格" } },
      { attrs: { prop: "a", label: "委托数量" } },
      { attrs: { prop: "a", label: "交易类型" } },
      { attrs: { prop: "a", label: "委托状态" } },
      { attrs: { prop: "a", label: "止盈价格" } },
      { attrs: { prop: "a", label: "止损价格" } },
      { attrs: { prop: "a", label: "策略状态" } },
      { attrs: { prop: "a", label: "委托终止时间" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const header2 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "委托时间" } },
      { attrs: { prop: "a", label: "商品代码" } },
      { attrs: { prop: "a", label: "商品名称" } },
      { attrs: { prop: "a", label: "指令类型" } },
      { attrs: { prop: "a", label: "委托价格" } },
      { attrs: { prop: "a", label: "委托数量" } },
      { attrs: { prop: "a", label: "交易类型" } },
      { attrs: { prop: "a", label: "委托状态" } },
      { attrs: { prop: "a", label: "止盈价格" } },
      { attrs: { prop: "a", label: "止损价格" } },
      { attrs: { prop: "a", label: "策略状态" } },
      { attrs: { prop: "a", label: "委托终止时间" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const navChange = item => {
      navValue.value = item.value
    }
    return {
      navItems,
      options,
      navChange,
      toolBar: computed(() =>
        navValue.value === 0
          ? { type: true, export: true, update: true }
          : { date: true, type: true, export: true, update: true }
      ),
      ajaxApi,
      tableHeader: computed(() => (navValue.value === 0 ? header1 : header2))
    }
  }
}
</script>

<style lang="scss" scoped></style>
