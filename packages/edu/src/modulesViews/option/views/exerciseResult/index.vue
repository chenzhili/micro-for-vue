<template>
  <div class="container">
    <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :toolBar="{ update: true }"
      @navChange="navChange"
    ></table-query>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  components: {},
  setup (props) {
    const navItems = [
      { label: "行权结果查询", value: 0 },
      { label: "被指派查询", value: 1 }
    ]

    const navValue = ref(0)
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const tableHeader = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "合约代码" } },
      { attrs: { prop: "a", label: "合约名称" } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "期权类别" } },
      { attrs: { prop: "a", label: "持仓类别" } },
      { attrs: { prop: "a", label: "行权价格" } },
      { attrs: { prop: "a", label: "行权数量" } },
      { attrs: { prop: "a", label: "行权冻结资金" } },
      { attrs: { prop: "a", label: "标的收付数量" } },
      { attrs: { prop: "a", label: "收付金额" } },
      { attrs: { prop: "a", label: "委托编号" } }
    ]

    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navItems,
      ajaxApi,
      tableHeader,
      navChange
    }
  }
}
</script>

<style lang="scss" scoped></style>
