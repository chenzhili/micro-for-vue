<template>
  <div class="contain">
    <div class="dataShow">
      <div class="marketIndex">
        <label>叠加指数</label>
        <el-select v-model="marketIndex" placeholder="上证指数">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </div>
      <div class="data">
        <label>20210329</label>
        <label>
          竞赛收益率：
          <span class="negative">-1.98%</span>
        </label>
        <label>
          上证指数涨幅：
          <span class="positive">1.98%</span>
        </label>
        <label>
          币种：
          <span>{{'人民币'}}</span>
        </label>
      </div>
    </div>
    <div class="show-charts">
      <div class="charts" id="profitCharts"></div>
    </div>
  </div>
</template>

<script>
// import VeLine from 'v-charts/lib/line.common'
import { profit } from "./fakeData"
import { profitOption } from "./chartsData"
import { ref, onMounted, inject, onUpdated } from "vue"
export default {
  setup () {
    const echarts = inject("ec")

    const marketIndex = ref("")
    const chartsSet = {
      indexsData: profit.data.indexs.map(item =>
        (item.income * 100).toFixed(2)
      ),
      listData: profit.data.list.map(item =>
        (item.racereturn * 100).toFixed(2)
      ),
      dateList: profit.data.list.map(item => {
        const date = item.dateday
        return `${date.substring(0, 4)}-${date.substring(
          4,
          6
        )}-${date.substring(6, 8)}`
      })
    }
    onMounted(() => {
      const myChart = echarts.init(document.getElementById("profitCharts"))
      myChart.setOption(profitOption(chartsSet))
      window.onresize = function () {
        myChart.resize()
      }
    })

    return {
      marketIndex
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.contain {
  @include contain()
}
$boder-color: #ebebeb;
.dataShow {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 27px 0 24px;
  .marketIndex {
    label {
      margin-right: 10px;
    }
  }
  .data {
    label {
      margin-right: 24px;
      .positive {
        color: #e0585b;
      }
      .negative {
        color: #07c180;
      }
    }
  }
}
.show-charts {
  display: flex;
  .charts {
    width: 100%;
    height: 350px;
  }
}
</style>
