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
      <table-toolbar title="融券负债">
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
        :marginTop="20"
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
import { FORM_DATA, COOP_BTNS } from "./form"
import { ref, reactive, computed } from "vue"
export default {
  components: {},
  setup (props) {
    const tabList = [{ label: "卖券还款", value: 0 }]
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
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "名称" } },
      { attrs: { prop: "a", label: "代码" } },
      { attrs: { prop: "a", label: "融资盈亏" } },
      { attrs: { prop: "a", label: "尚欠金额" } },
      { attrs: { prop: "a", label: "融资利息" } },
      { attrs: { prop: "a", label: "融资费用" } },
      { attrs: { prop: "a", label: "期初负债金额", width: "140px" } },
      { attrs: { prop: "a", label: "负债数量" } }
    ]
    return {
      formItems: FORM_DATA,
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
