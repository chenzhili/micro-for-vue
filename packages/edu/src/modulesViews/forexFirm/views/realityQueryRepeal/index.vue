<template>
  <div class="container">
    <table-query :navItems="navItems" :tableHeader="tableHeader" :options="options" typeName='指令类型：' :ajaxApi="ajaxApi" :toolBar='{type:true,update:true}'></table-query>
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

    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const options = [
      { label: "全部", value: 0 },
      { label: "获利", value: 1 },
      { label: "止损", value: 2 },
      { label: "双向", value: 3 }
    ]

    const tableHeader = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "委托时间" } },
      { attrs: { prop: "a", label: "指令类型" } },
      { attrs: { prop: "a", label: "买入货币" } },
      { attrs: { prop: "a", label: "卖出货币" } },
      { attrs: { prop: "a", label: "委托卖出金额" } },
      { attrs: { prop: "a", label: "委托汇率" } },
      { attrs: { prop: "a", label: "委托状态" } },
      { attrs: { prop: "a", label: "止盈价格" } },
      { attrs: { prop: "a", label: "止损价格" } },
      { attrs: { prop: "a", label: "委托终止时间" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "操作" } }
    ]

    return {
      navItems,
      ajaxApi,
      tableHeader,
      options
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
