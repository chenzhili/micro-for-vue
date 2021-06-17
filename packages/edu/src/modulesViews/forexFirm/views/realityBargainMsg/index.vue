<template>
  <div class="container">
   <table-query :navItems="navItems" :tableHeader="tableHeader" :ajaxApi="ajaxApi" :toolBar='toolBar' :options="options" typeName="指令类型：" @navChange="navChange"></table-query>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue"
export default {
  components: {
  },
  setup () {
    const navItems = [
      { label: "当日成交", value: 0 },
      { label: "历史成交", value: 1 }
    ]

    const navValue = ref(0)
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const options = [
      { label: "全部", value: 0 },
      { label: "即时", value: 1 },
      { label: "获利", value: 2 },
      { label: "止损", value: 3 },
      { label: "双向", value: 4 }
    ]
    const header1 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "成交时间" } },
      { attrs: { prop: "a", label: "买入货币" } },
      { attrs: { prop: "a", label: "买入金额" } },
      { attrs: { prop: "a", label: "卖出货币" } },
      { attrs: { prop: "a", label: "卖出金额" } },
      { attrs: { prop: "a", label: "指令类型" } },
      { attrs: { prop: "a", label: "成交价格" } },
      { attrs: { prop: "a", label: "类型" } },
      { attrs: { prop: "a", label: "优惠点差" } },
      { attrs: { prop: "a", label: "费用" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const header2 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "成交时间" } },
      { attrs: { prop: "a", label: "买入货币" } },
      { attrs: { prop: "a", label: "买入金额" } },
      { attrs: { prop: "a", label: "卖出货币" } },
      { attrs: { prop: "a", label: "卖出金额" } },
      { attrs: { prop: "a", label: "指令类型" } },
      { attrs: { prop: "a", label: "成交价格" } },
      { attrs: { prop: "a", label: "类型" } },
      { attrs: { prop: "a", label: "优惠点差" } },
      { attrs: { prop: "a", label: "费用" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navItems,
      navChange,
      toolBar: computed(() => navValue.value === 0 ? { type: true, export: true, update: true } : { date: true, type: true, export: true, update: true }),
      tableHeader: computed(() => navValue.value === 0 ? header1 : header2),
      ajaxApi,
      options
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
