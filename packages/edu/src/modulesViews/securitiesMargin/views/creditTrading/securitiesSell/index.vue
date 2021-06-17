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
      <table-toolbar title="沪深市场">
        <template #tool>
          <el-input placeholder="代码/拼音首字母" v-model="input" clearable>
            <template #suffix>
              <i class="el-input__icon el-icon-search" @click="search"></i>
            </template>
          </el-input>
        </template>
      </table-toolbar>
      <page-table
        :api="ajaxApi"
        ref="pageRef"
        :defaultData="defaultData"
        :pageSize="7"
        :marginTop="10"
      >
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
import { SELL_DATA, SELL_BTNS } from "./form"
import { ref, reactive, computed } from "vue"
export default {
  components: {},
  setup (props) {
    const tabList = [{ label: "融券卖出", value: 0 }]
    const tabValue = ref(0)
    const tabClick = e => {
      tabValue.value = e.value
    }
    const pageRef = ref(null)
    const defaultData = [
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
      { attrs: { prop: "a", label: "序号", fixed: true } },
      { attrs: { prop: "a", label: "商品代码", fixed: true } },
      { attrs: { prop: "a", label: "商品名称" } },
      { attrs: { prop: "a", label: "最新" } },
      { attrs: { prop: "a", label: "涨跌" } },
      { attrs: { prop: "a", label: "涨幅(%)" } },
      { attrs: { prop: "a", label: "成交量" } },
      { attrs: { prop: "a", label: "均价" } },
      { attrs: { prop: "a", label: "昨收" } },
      { attrs: { prop: "a", label: "今开" } },
      { attrs: { prop: "a", label: "最高" } },
      { attrs: { prop: "a", label: "最低" } }
    ]
    return {
      formItems: SELL_DATA,
      coopBtns: SELL_BTNS,
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
    width: 297px;
    height: 595px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 11px;
    .tabs {
      display: flex;
      height: 69px;
      align-items: center;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 400;
      text-align: center;
      color: #a8abae;
      .tab {
        width: 56px;
      }
      .tabL {
        border-right: 1px solid #a8abae;
      }
    }
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
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 11px;
    flex: 1;
    max-width: 859px;
    overflow: hidden;
    padding: 0 24px;
    :deep .el-input {
      width: 170px;
      height: 40px;
      opacity: 1;
      border: 1px solid #dddddd;
      border-radius: 5px;
    }
    :deep .el-input--suffix .el-input__inner {
      background: #f4f4f4;
    }
    :deep .el-table__header-wrapper,
    .el-table__footer-wrapper {
      height: 60px;
    }

    i {
      cursor: pointer;
      &:hover {
        color: #222;
      }
    }
    .r-head {
      height: 86px;
      border-bottom: 1px solid #ebebeb;
    }
  }
}
</style>
