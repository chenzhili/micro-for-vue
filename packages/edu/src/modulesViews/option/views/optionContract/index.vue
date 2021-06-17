<template>
  <div class="container">
    <table-toolbar title="期权合约">
      <template #tool>
        <el-select
          class="input-with-select"
          v-model="market"
          placeholder="请选择"
        >
          <el-option
            v-for="item in marketName"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          placeholder="请输入合约代码或名称"
          v-model="input3"
          class="input-with-search"
        >
          <template #append>
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </template>
    </table-toolbar>
    <page-table :api="ajaxApi" ref="pageRef" :defaultData="defaultData">
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
</template>

<script>
import { ref, reactive } from "vue"
export default {
  components: {},
  setup (props) {
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
    const market = ref(0)
    const marketName = [
      { label: "全部", value: 0 },
      { label: "上证50ETF", value: 1 },
      { label: "上海300ETF", value: 2 },
      { label: "深圳300ETF", value: 3 }
    ]
    const tableHeader = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "合约代码" } },
      { attrs: { prop: "a", label: "合约名称" } },
      { attrs: { prop: "a", label: "合约单位" } },
      { attrs: { prop: "a", label: "交易开始日期", width: "180px" } },
      { attrs: { prop: "a", label: "交易截止日期", width: "180px" } },
      { attrs: { prop: "a", label: "权利仓开仓费用", width: "150px" } },
      { attrs: { prop: "a", label: "权利仓平仓费用", width: "150px" } },
      { attrs: { prop: "a", label: "义务仓平仓费用", width: "150px" } },
      { attrs: { prop: "a", label: "保证金比例", width: "150px" } },
      { attrs: { prop: "a", label: "单位保证金", width: "150px" } },
      { attrs: { prop: "a", label: "规则状态" } }
    ]

    return {
      pageRef,
      defaultData,
      ajaxApi,
      tableHeader,
      market,
      marketName
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1372px;
  max-width: 1372px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 11px;
  margin-top: 20px;
  margin-bottom: 44px;
  padding: 0 24px;
  overflow: hidden;
  .input-with-search {
    width: 240px;
  }
  .input-with-select {
    margin-right: 20px;
    :deep .el-input {
      width: 150px;
    }
  }
  :deep .el-button{
    &:hover{
      color: #222;
    }
  }
}
</style>
