<template>
  <div class="container">
    <table-query :navItems="navItems" :tableHeader="tableHeader" :ajaxApi="ajaxApi">
      <template #coop><el-button>查看</el-button></template>
    </table-query>
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
    const value = ref(0)
    const time = ref("")
    const options = [
      { label: "全部", value: 0 },
      { label: '买入', value: 1 },
      { label: '卖出', value: 2 }
    ]
    const status = [
      { label: "全部", value: 0 },
      { label: "未成交", value: 1 },
      { label: "部分撤单", value: 2 },
      { label: "已撤单", value: 3 },
      { label: "部分成交", value: 4 },
      { label: "已完成", value: 5 }
    ]
    const tabValue = ref(0)
    const pageRef = ref(null)
    const defaultData = [
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" }
    ]
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
      { attrs: { prop: "coop", label: "操作" }, custom: true }
    ]
    const tabChange = e => {
      tabValue.value = e.value
    }
    return {
      navItems,
      options,
      status,
      value,
      time,
      tabChange,
      pageRef,
      defaultData,
      ajaxApi,
      tableHeader
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // width: 1350px;
  // opacity: 1;
  // background: #ffffff;
  // border-radius: 8px;
  // margin: 20px 0 20px;
  // padding: 0 24px 24px;
  .btn {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #222222;
    margin-right: 24px;
    cursor: pointer;
    img {
      width: 15px;
      height: 15px;
      margin-right: 4px;
    }
    &:nth-child(1) {
      margin-right: 0;
    }
  }
  .table{
    max-width: 1350px;
    overflow: hidden;
  }
}
</style>
