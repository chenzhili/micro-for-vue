<template>
  <div class="container">
    <t-head :tabs="tabs" @tabChange="tabChange">
      <template #tool>
        <div class="btn"><svg-icon icon-class="update"></svg-icon>刷新</div>
        <div class="btn">查询F10</div>
        <div class="btn add"><img src="@/assets/toolsImg/add.png" /></div>
        <div class="btn" :style="{'margin-right' : '10px'}">
          <el-input placeholder="代码/名称" v-model="code" clearable>
          <template #suffix>
            <i class="el-icon-search"></i>
          </template>
        </el-input>
        </div>
      </template>
    </t-head>
    <div class="table">
      <page-table :api="ajaxApi" ref="pageRef" :defaultData="defaultData">
        <template #="tableScope">
          <table-com
            :tableData="tableScope.datas"
            :tableHeader="tableHeader"
            v-loading="tableScope.loading"
          >
            <template #zd="{ scope }">
              <span :style="{'color':scope.row.zd[0]==='-'?'#00C642':'#F33A52'}">{{scope.row.zd}}</span>
            </template>
            <template #zf="{ scope }">
              <span :style="{'color':scope.row.zf[0]==='-'?'#00C642':'#F33A52'}">{{scope.row.zf}}</span>
            </template>
            <template #coop>
              <div  class="delete"><i class="el-icon-delete"></i></div>
            </template>
            <template #coopHeader>
              <div><i class="el-icon-delete"></i></div>
            </template>
          </table-com>
        </template>
      </page-table>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue"
export default {
  components: {},
  setup () {
    const tabs = [{ label: "自选商品", value: 0 }]
    const value = ref(0)
    const time = ref("")
    const code = ref('')
    const options = [
      { label: "全部", value: 0 },
      { label: "买入", value: 1 },
      { label: "卖出", value: 2 }
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
    const baseItem = {
      stockcode: '600036',
      stockname: "招商银行",
      last: "53.90",
      zd: "0.12",
      zf: "-0.22%",
      volume: "9747527",
      average: "53.88",
      close: "53.78",
      open: "53.89",
      high: "54.18",
      low: "53.46"
    }
    const defaultData = []

    for (let i = 0; i < 10; i++) {
      defaultData.push(baseItem)
    }
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const tableHeader = [
      { attrs: { type: 'selection', width: '50' } },
      { attrs: { prop: "stockcode", label: "商品代码" } },
      { attrs: { prop: "stockname", label: "商品名称" } },
      { attrs: { prop: "last", label: "最新" } },
      { attrs: { prop: "zd", label: "涨跌" }, custom: true },
      { attrs: { prop: "zf", label: "涨幅" }, custom: true },
      { attrs: { prop: "volume", label: "成交量" } },
      { attrs: { prop: "average", label: "均价" } },
      { attrs: { prop: "close", label: "昨收" } },
      { attrs: { prop: "open", label: "今开" } },
      { attrs: { prop: "high", label: "最高" } },
      { attrs: { prop: "low", label: "最低" } },
      { attrs: { prop: 'coop', label: '' }, custom: true, customHeader: true }
    ]
    const tabChange = e => {
      tabValue.value = e.value
    }
    return {
      tabs,
      options,
      status,
      value,
      time,
      tabChange,
      pageRef,
      defaultData,
      ajaxApi,
      tableHeader,
      code
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1350px;
  opacity: 1;
  background: #ffffff;
  border-radius: 8px;
  margin: 20px 0 20px;
  padding: 0 24px 24px;
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
    &:hover{
      color: #e0585b;
    }
    .svg-icon {
      width: 15px;
      height: 15px;
      margin-right: 4px;
    }
    &:nth-child(1) {
      margin-right: 0;
    }
    i{
      &:hover{
        color: #222222;
      }
    }
  }
  .add {
    width: 40px;
    height: 40px;
    opacity: 1;
    background: #f4f4f4;
    border: 1px solid #dddddd;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 0;
    }
  }
  :deep .el-input--suffix .el-input__inner{
    background-color: $input-bg-gray;
  }
  .table {
    max-width: 1350px;
    overflow: hidden;
  }
  .delete{
  cursor: pointer;
  &:hover{
    color: #e0585b;
  }
}
}

</style>
