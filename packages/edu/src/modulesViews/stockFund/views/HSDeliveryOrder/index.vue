<template>
  <div class="container">
    <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :toolBar="{ date: true, type: true, export: true, search: true }"
      typeName="买卖方向："
    ></table-query>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
export default {
  setup (props) {
    const navItems = [{ label: "查询交割单", value: 0 }]
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })
    const tableHeader = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "交割单序号" } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "成交编号" } },
      { attrs: { prop: "a", label: "成交日期" } },
      { attrs: { prop: "a", label: "成交时间" } },
      { attrs: { prop: "a", label: "类别" } },
      { attrs: { prop: "a", label: "证券发生数量" } },
      { attrs: { prop: "a", label: "证券余量" } },
      { attrs: { prop: "a", label: "成交价格" } },
      { attrs: { prop: "a", label: "成交金额" } },
      { attrs: { prop: "a", label: "佣金" } },
      { attrs: { prop: "a", label: "印花税" } },
      { attrs: { prop: "a", label: "过户费" } },
      { attrs: { prop: "a", label: "清算总费用" } },
      { attrs: { prop: "a", label: "资金余额" } }
    ]
    return {
      navItems,
      tableHeader,
      ajaxApi
    }
  }
}
</script>

<style lang="scss" scoped></style>
