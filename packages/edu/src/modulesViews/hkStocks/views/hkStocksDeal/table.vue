<template>
  <div class="right">
    <table-toolbar title="香港主板">
      <template #tool>
        <el-input placeholder="代码/拼音首字母" v-model="input" clearable>
          <template #suffix>
            <i class="el-input__icon el-icon-search" @click="search"></i>
          </template>
        </el-input>
      </template>
    </table-toolbar>
    <page-table :api="ajaxApi" ref="pageRef" :defaultData="defaultData" :marginTop="14" :pageSize="7">
      <template #="tableScope">
        <table-com
          :tableData="tableScope.datas"
          :tableHeader="tableHeader"
          v-loading="tableScope.loading"
        >
          <template #code="{scope}">
            <span
              style="color: #3a6fd9;cursor: pointer;"
              @click="toKLine(scope.row)"
              >{{ scope.row.code }}</span
            ></template
          >
        </table-com>
      </template>
    </page-table>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  setup (props, { emit }) {
    const pageRef = ref(null)
    const defaultData = [
      { a: "465456", code: "600000", name: "浦发银行", marketId: "0" },
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
      { attrs: { prop: "code", label: "商品代码", fixed: true }, custom: true },
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

    const toKLine = e => {
      emit("showKline", e)
    }
    return {
      pageRef,
      defaultData,
      ajaxApi,
      tableHeader,
      toKLine
    }
  }
}
</script>

<style lang="scss" scoped>
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
    height: 36px;
    opacity: 1;
    border-radius: 5px;
  }
  :deep .el-input--suffix .el-input__inner {
    background: #f4f4f4;
  }
  :deep .el-table__header-wrapper, .el-table__footer-wrapper{
    height: 60px;
  }

  i {
    cursor: pointer;
    &:hover{
      color: #222222;
    }
  }
  .r-head {
    height: 86px;
    border-bottom: 1px solid #ebebeb;
  }
}
</style>
