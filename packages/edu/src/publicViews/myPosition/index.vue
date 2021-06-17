<template>
  <div>
    <!-- 资金明细 -->
    <div class="contain">
      <funds-positions :positionsHeader="positionHeader" :positionData="positionData"></funds-positions>
    </div>

    <div class="contain table">
      <table-toolbar :title="navItems?'':'持仓明细'" :isNav="!!navItems" :navItems="navItems">
        <template #tool>
          <el-input placeholder="代码/名称" v-model="search">
            <template #suffix>
              <i class="el-input__icon el-icon-search"></i>
            </template>
          </el-input>
        </template>
      </table-toolbar>
      <page-table ref="pageRef" :defaultData="detailsData">
        <template #="tableScope">
          <div class="table-contain">

            <table-com
              v-if="marketId<6||marketId===13"
              :tableHeader="detailsHeader"
              :tableData="tableScope.datas"
              v-loading="tableScope.loading"
            >
              <template #order="{ scope }">{{ scope.$index + 1 }}</template>
              <template #avincomebalance="{ scope }">
                <span
                  :style="{'color':profitAndLossColor(scope.row.avincomebalance)}"
                >{{scope.row.avincomebalance}}</span>
              </template>
              <template #profitratio="{ scope }"><span
                  :style="{'color':profitAndLossColor(scope.row.profitratio)}"
                >{{scope.row.profitratio}}</span>
              </template>
            </table-com>

            <table-com
              v-if="marketId===6||marketId===7"
              :tableHeader="detailsHeader"
              :tableData="tableScope.datas"
              v-loading="tableScope.loading"
            >
              <template #order="{ scope }">{{ scope.$index + 1 }}</template>
              <template #profit="{ scope }">
                <span
                  :style="{'color':profitAndLossColor(scope.row.profit)}"
                >{{scope.row.profit}}</span>
              </template>
              <template #ratio="{ scope }"><span
                  :style="{'color':profitAndLossColor(scope.row.ratio)}"
                >{{(scope.row.ratio*100).toFixed(2)+'%'}}</span>
              </template>
            </table-com>

            <table-com
              v-if="marketId===8"
              :tableHeader="detailsHeader"
              :tableData="tableScope.datas"
              v-loading="tableScope.loading"
            >
              <template #order="{ scope }">{{ scope.$index + 1 }}</template>
            </table-com>

            <table-com
              v-if="marketId===9"
              :tableHeader="detailsHeader"
              :tableData="tableScope.datas"
              v-loading="tableScope.loading"
            >
              <template #order="{ scope }">{{ scope.$index + 1 }}</template>
              <template #entrustbs="{ scope }">{{scope.row.entrustbs==='1'?'买入':'卖出'}}</template>
            </table-com>

             <table-com
              v-if="marketId===11"
              :tableHeader="detailsHeader"
              :tableData="tableScope.datas"
              v-loading="tableScope.loading"
            >
              <template #order="{ scope }">{{ scope.$index + 1 }}</template>
              <template #avincomebalance="{ scope }">
                <span
                  :style="{'color':profitAndLossColor(scope.row.avincomebalance)}"
                >{{scope.row.avincomebalance}}</span>
              </template>
              <template #profitratio="{ scope }"><span
                  :style="{'color':profitAndLossColor(scope.row.profitratio)}"
                >{{(scope.row.profitratio*100).toFixed(2)+'%'}}</span>
              </template>
            </table-com>

            <table-com
              v-if="marketId===12"
              :tableHeader="detailsHeader"
              :tableData="tableScope.datas"
              v-loading="tableScope.loading"
            >
              <template #order="{ scope }">{{ scope.$index + 1 }}</template>
              <template #profit="{ scope }">
                <span
                  :style="{'color':profitAndLossColor(scope.row.profit)}"
                >{{scope.row.profit}}</span>
              </template>
            </table-com>
          </div>
        </template>
      </page-table>
    </div>
  </div>
</template>
<script>
import FundsPositions from "./components/FundsPositions.vue"
import { summarize } from "./headerCfg"
import { getData } from "./fakeData"
import { computed, ref } from "vue"
import { useStore } from "vuex"
import { dataDispose } from "@/utils"
import { getRaceConfig } from "@/utils/auth.js"
// import KLine from "@/components/KLine"
export default {
  components: {
    FundsPositions
    // KLine
  },
  setup () {
    const store = useStore()
    const raceConfig = JSON.parse(getRaceConfig())
    const marketId = raceConfig.markettype
    const tableHeader = summarize(marketId)

    const positionHeader = tableHeader.position
    const detailsHeader = tableHeader.details

    const detailsData = getData(marketId).list
    const positionData = getData(marketId).info

    const profitAndLossColor = num => {
      let color
      if (typeof num === 'string') {
        color = num[0] === "-" ? "#00C642" : "#F33A52"
      } else if (typeof num === 'number') {
        color = num < 0 ? "#00C642" : "#F33A52"
      }
      return color
    }

    const decimal = (type, data) => {
      const decimalCfg = tableHeader.decimal
      dataDispose(data, decimalCfg[type].props, decimalCfg[type].reverse)
    }

    decimal("details", detailsData)
    decimal("position", [positionData])

    const navItems = tableHeader.navList
    const toolBar = { search: true }

    const search = ref("")
    return {
      positionHeader,
      detailsHeader,
      marketId,
      detailsData,
      positionData,
      navItems,
      toolBar,

      search,
      profitAndLossColor
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/common.scss";
.contain {
  @include contain();
  &.table {
    padding-top: 0;
  }
}
</style>
