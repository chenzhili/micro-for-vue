<template>
  <div>
    <div class="cards">
      <div v-for="(item,index) in cardData" :key="index" class="card contain">
        <div class="title">{{item.title}}</div>
        <div class="line"></div>
        <ul>
          <li>人民币：</li>
          <li>港币：</li>
          <li>美元：</li>
        </ul>
        <ul>
          <li>{{item.property.CNY}}</li>
          <li>{{item.property.HKD}}</li>
          <li>{{item.property.USD}}</li>
        </ul>
      </div>
    </div>

    <div class="table contain">
      <table-com :tableHeader="tableHeader" :tableData="tableData">
        <template #floatingpl="{ scope }">
          <span
            :style="{'color':scope.row.plratio[0]==='-'?'#00C642':'#F33A52'}"
          >{{scope.row.floatingpl}}</span>
        </template>
        <template #plratio="{ scope }">
          <span
            :style="{'color':scope.row.plratio[0]==='-'?'#00C642':'#F33A52'}"
          >{{scope.row.plratio}}</span>
        </template>
      </table-com>
    </div>

    <div class="contain show-charts">
      <div class="charts" id="distributeCharts"></div>
    </div>
  </div>
</template>

<script>
import { DISTRIBUTR_HEADER } from "./scoreConfig"
import { dataDispose } from '@/utils'
import { distribute } from "./fakeData"
import { distributeOption } from "./chartsData"
import { onMounted, ref, inject, watch } from "vue"
export default {
  setup () {
    const echarts = inject("ec")
    const cardData = [
      { title: "初始资金", property: distribute.data.currentassets },
      { title: "当前总资产", property: distribute.data.initialassets }
    ]
    const chartsSet = {
      legendData: distribute.data.picture.map(item => {
        return Object.assign({}, { name: item.marketname })
      }),
      seriesData: distribute.data.picture.map(item => {
        return Object.assign(
          {},
          { name: item.marketname, value: item.stockmoney }
        )
      })
    }
    const tableData = ref([distribute.data.raceInfo])

    const drawLine = () => {
      const myChart = echarts.init(document.getElementById("distributeCharts"))
      myChart.setOption(distributeOption(chartsSet))
      window.onresize = function () {
        myChart.resize()
      }
    }

    onMounted(() => {
      const props = [
        "totalmoney",
        "canusemoney",
        "holdmarketvalue",
        "totaltradeamount",
        "floatingpl"
      ]
      dataDispose(tableData.value, props)
      drawLine()
    })

    return {
      cardData,
      tableHeader: DISTRIBUTR_HEADER,
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
.cards {
  display: flex;
  justify-content: space-between;
  .card {
    padding: 20 24px;
    flex-grow: 1;
    margin-right: 16px;
    text-align: left;
    font-size: 14px;
    &:last-child {
      margin-right: 0;
    }
    .title {
      font-weight: 700;
      color: #222222;
      margin-bottom: 20px;
    }
    .line {
      height: 1px;
      background: #ebebeb;
    }
    ul {
      list-style: none;
      display: inline-block;
      margin: 0;
      padding-left: 0;
      li {
        line-height: 36px;
      }
    }
  }
}
.table {
  padding: 0;
  overflow: hidden;
}
.show-charts {
  display: flex;
  padding: 0;
  .charts {
    width: 100%;
    height: 540px;
  }
}
</style>
