<template>
  <div class="container">
    <table-toolbar title="点差参数">
      <template #tool>
        <div class="tool">
          汇率类型：
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
        </div>
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
      { label: "基础汇率", value: 1 },
      { label: "交叉汇率", value: 2 }
    ]
    const tableHeader = [
      { attrs: { prop: "a", label: "代码", width: "120" } },
      { attrs: { prop: "a", label: "币种", width: "120" } },
      { attrs: { prop: "a", label: "零档优惠<$10000" } },
      { attrs: { prop: "a", label: "一档优惠$10000~$30000" } },
      { attrs: { prop: "a", label: "二档优惠$30000~$50000" } },
      { attrs: { prop: "a", label: "三档优惠$50000~$300000" } },
      { attrs: { prop: "a", label: "四档优惠>300000" } }
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
  width: 1352px;
  max-width: 1352px;
  opacity: 1;
  background: #ffffff;
  border-radius: 11px;
  margin-top: 20px;
  margin-bottom: 44px;
  padding: 0 24px;
  overflow: hidden;
  .tool {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #222222;
  }
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
      color: #222222;
    }
  }
}
</style>
