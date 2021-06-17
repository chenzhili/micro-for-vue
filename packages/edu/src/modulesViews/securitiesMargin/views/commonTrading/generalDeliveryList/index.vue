<template>
  <div class="container">
     <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :toolBar="toolBar"
      typeName="买卖方向："
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
      { label: "查询交割单", value: 0 }
    ]

    const navValue = ref(0)

    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const tableHeader = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "交割单序号", width: '120px' } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "成交编号" } },
      { attrs: { prop: "a", label: "成交日期" } },
      { attrs: { prop: "a", label: "成交时间" } },
      { attrs: { prop: "a", label: "类别" } },
      { attrs: { prop: "a", label: "证券发送数量", width: '120px' } },
      { attrs: { prop: "a", label: "证券余量" } },
      { attrs: { prop: "a", label: "成交价格" } },
      { attrs: { prop: "a", label: "成交金额" } },
      { attrs: { prop: "a", label: "佣金" } },
      { attrs: { prop: "a", label: "印花税" } },
      { attrs: { prop: "a", label: "过户费" } },
      { attrs: { prop: "a", label: "清算总费用", width: '120px' } },
      { attrs: { prop: "a", label: "资金余额" } }
    ]
    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navItems,
      navChange,
      ajaxApi,
      tableHeader,
      toolBar: { date: true, type: true, export: true, search: true }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
