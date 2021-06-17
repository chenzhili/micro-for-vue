<template>
  <div class="contain">
    <page-table ref="pageRef" :defaultData="tableData">
      <template #="tableScope">
        <table-com
          :tableHeader="tableHeader"
          :tableData="tableScope.datas"
          v-loading="tableScope.loading"
        >
          <template #order="{ scope }">{{ scope.$index + 1 }}</template>
          <template #profitandloss="{ scope }">
            <span
              :style="{'color':scope.row.plratio[0]==='-'?'#00C642':'#F33A52'}"
            >{{scope.row.profitandloss}}</span>
          </template>
          <template #plratio="{ scope }">
            <span
              :style="{'color':scope.row.plratio[0]==='-'?'#00C642':'#F33A52'}"
            >{{scope.row.plratio}}</span>
          </template>
        </table-com>
      </template>
    </page-table>
  </div>
</template>

<script>
// import TableCom from "@/components/TableCom"
import { holding } from "./fakeData"
import { HOLDING_HEADER } from './scoreConfig'
import { dataDispose } from '@/utils'
import { onMounted, ref } from "vue"
export default {
  setup () {
    const tableData = ref(holding.data.list)
    onMounted(() => {
      const disposeList = [
        "newvalue",
        "costprice",
        "marketvalue",
        "profitandloss"
      ]
      dataDispose(tableData.value, disposeList)
      console.log(tableData.value)
    })
    return {
      tableHeader: HOLDING_HEADER,
      tableData
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.contain {
  @include contain()
}
</style>
