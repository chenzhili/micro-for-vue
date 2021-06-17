<template>
  <div class="container">
   <table-query :navItems="navItems" :tableHeader="tableHeader" :ajaxApi="ajaxApi" :toolBar='toolBar' @navChange="navChange"></table-query>
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
      { attrs: { prop: "a", label: "成交明细" } },
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
      { attrs: { prop: "a", label: "成交明细" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navItems,
      navChange,
      toolBar: computed(() => navValue.value === 0 ? { export: true, update: true } : { date: true, type: true, export: true, search: true }),
      tableHeader: computed(() => navValue.value === 0 ? header1 : header2),
      ajaxApi
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
