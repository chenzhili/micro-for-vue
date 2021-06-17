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
  components: {
  },
  setup () {
    const navItems = [
      { label: "查撤委托", value: 0 }
    ]

    const navValue = ref(0)

    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const tableHeader = [
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
      navChange,
      ajaxApi,
      tableHeader,
      toolBar: { type: true, status: true, search: true }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
