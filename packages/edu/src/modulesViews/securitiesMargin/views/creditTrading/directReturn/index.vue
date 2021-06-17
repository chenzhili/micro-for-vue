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
  setup () {
    const navItems = [
      { label: "融资负债", value: 0 },
      { label: "融券负债", value: 1 }
    ]

    const navValue = ref(0)

    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const header1 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "商品代码" } },
      { attrs: { prop: "a", label: "名称" } },
      { attrs: { prop: "a", label: "融资盈亏" } },
      { attrs: { prop: "a", label: "尚欠金额" } },
      { attrs: { prop: "a", label: "融资利息" } },
      { attrs: { prop: "a", label: "融资费用" } },
      { attrs: { prop: "a", label: "期初负债金额" } },
      { attrs: { prop: "a", label: "负债数量" } }
    ]
    const header2 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "商品代码" } },
      { attrs: { prop: "a", label: "名称" } },
      { attrs: { prop: "a", label: "融券盈亏" } },
      { attrs: { prop: "a", label: "尚欠数量" } },
      { attrs: { prop: "a", label: "期初负债数量" } },
      { attrs: { prop: "a", label: "负债数量" } }
    ]
    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navItems,
      navChange,
      ajaxApi,
      tableHeader: computed(() => navValue.value === 0 ? header1 : header2)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
