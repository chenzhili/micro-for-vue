<template>
  <div class="container">
    <div class="left">
      <form-head :tabList="tabList" @tabClick="tabClick">
        <template #form>
          <div class="form">
            <form-com :formItems="formItems" :coopBtns="coopBtns"></form-com>
          </div>
        </template>
      </form-head>
    </div>
    <div class="middle"><five-range-panel></five-range-panel></div>
    <div class="right">
      <table-toolbar title="可行权持仓"></table-toolbar>
      <page-table :api="ajaxApi" ref="pageRef" :defaultData="defaultData" :pageSize="7" :marginTop="25">
        <template #="tableScope">
          <table-com
            :tableData="tableScope.datas"
            :tableHeader="tableHeader"
            v-loading="tableScope.loading"
          >
          </table-com>
        </template>
      </page-table>
    </div>
  </div>
</template>

<script>
import { TABLE_DATA, COOP_BTNS } from "./form"
import { ref, computed, reactive } from "vue"
export default {
  components: {
  },

  setup (props) {
    const tabList = [{ label: "行权", value: 0 }]
    const pageRef = ref(null)
    const defaultData = [
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
      { attrs: { prop: "a", label: "序号", fixed: true } },
      { attrs: { prop: "a", label: "行权日" } },
      { attrs: { prop: "a", label: "合约代码" } },
      { attrs: { prop: "a", label: "合约名称" } },
      { attrs: { prop: "a", label: "期权类别" } },
      { attrs: { prop: "a", label: "持仓类别" } },
      { attrs: { prop: "a", label: "当前余额" } },
      { attrs: { prop: "a", label: "可用余额" } },
      { attrs: { prop: "a", label: "最新价" } },
      { attrs: { prop: "a", label: "成本价" } },
      { attrs: { prop: "a", label: "行权价" } },
      { attrs: { prop: "a", label: "浮动盈亏" } },
      { attrs: { prop: "a", label: "盈亏百分比(预估)", width: "160px" } }
    ]
    const tabValue = ref(0)
    const tabClick = e => {
      tabValue.value = e.value
    }
    return {
      formItems: TABLE_DATA,
      coopBtns: COOP_BTNS,
      tabList,
      tabClick,
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
  margin-top: 15px;
  display: flex;
  .left {
    .form {
      margin-left: 16px;
    }
  }
  .middle {
    margin-left: 19px;
    margin-right: 25px;
  }
  .right {
    height: 595px;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 11px;
    flex: 1;
    padding: 0 24px;
    overflow: hidden;
  }
}
</style>
