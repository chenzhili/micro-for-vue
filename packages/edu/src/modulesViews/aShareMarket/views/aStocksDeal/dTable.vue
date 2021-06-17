<template>
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
      :defaultData="tableData"
      :pageSize="7"
      :marginTop="10"
    >
      <template #="tableScope">
        <table-com
          :tableData="tableScope.datas"
          :tableHeader="tableHeader"
          v-loading="tableScope.loading"
        >
          <template #order="{scope}">{{ scope.$index + 1 }}</template>
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
import { ref, reactive, onMounted, watch } from "vue"
import { getData } from "./data"
export default {
  setup (props, { emit }) {
    const pageRef = ref(null)
    const ajaxApi = reactive({
      getList (param) {
        return getData()
      }
    })
    const input = ref("")
    const tableData = ref([])

    const tableHeader = [
      { attrs: { prop: "order", label: "序号", fixed: true }, custom: true },
      { attrs: { prop: "code", label: "商品代码", fixed: true }, custom: true },
      { attrs: { prop: "name", label: "商品名称" } },
      { attrs: { prop: "now", label: "最新" } },
      { attrs: { prop: "a", label: "涨跌" } },
      { attrs: { prop: "a", label: "涨幅(%)" } },
      { attrs: { prop: "volume", label: "成交量", width: 120 } },
      { attrs: { prop: "a", label: "均价" } },
      { attrs: { prop: "close", label: "昨收" } },
      { attrs: { prop: "open", label: "今开" } },
      { attrs: { prop: "high", label: "最高" } },
      { attrs: { prop: "low", label: "最低" } }
    ]

    const toKLine = e => {
      emit("showKline", e)
    }

    return {
      pageRef,
      ajaxApi,
      tableHeader,
      toKLine,
      input,
      tableData
    }
  }
}
</script>

<style lang="scss" scoped>
.right {
  height: 595px;
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
}
</style>
