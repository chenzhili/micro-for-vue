<template>
  <div class="report">
    <div class="icon-nav">
      <div class="icon" v-for="(item,index) in iconList" :key="index" @click="iconActive=index">
        <div class="icon-box" :style="{backgroundColor:iconActive===index?'#E0585B':'unset'}">
          <svg-icon
            :icon-class="iconActive===index?item.icon+'_ac':item.icon"
            :style="{
              width: item.size.split('-')[0]+'px',
              height:item.size.split('-')[1]+'px',
              }"
          ></svg-icon>
        </div>
        <span>{{item.label}}</span>
      </div>
    </div>
    <div class="content">
      <div class="export">
        导出
        <svg-icon icon-class="export" style="width:15px;height:13px"></svg-icon>
      </div>
      <div class="contain profit">
        <b>系统实验报告</b>
        <table-toolbar title="我的收益"></table-toolbar>
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
          <div class="charts" id="reportCharts"></div>
        </div>
      </div>

      <div class="contain">
        <table-toolbar title="账户信息"></table-toolbar>
        <table-com :tableHeader="accountHeader" :tableData="accountData">
          <template #order="{ scope }">{{ scope.$index + 1 }}</template>
        </table-com>
      </div>

      <div class="contain table">
        <HisExchanges></HisExchanges>
      </div>

      <div class="contain table">
        <HisCapitalFlows></HisCapitalFlows>
      </div>
    </div>
  </div>
</template>

<script>
import { lab } from "./fakeData"
import { ACCOUNT_HEADER } from "./tableConfig"
import HisExchanges from "./components/HisExchanges"
import HisCapitalFlows from "./components/HisCapitalFlows"
import { profit } from "../myScore/fakeData"
import { profitOption } from "../myScore/chartsData"
import { dataDispose } from "@/utils"
import { onMounted, ref, inject } from "vue"
export default {
  components: {
    HisExchanges,
    HisCapitalFlows
  },
  setup () {
    const echarts = inject("ec")

    const iconList = [
      { icon: "report_temp", label: "报告模板", size: "26-27" },
      { icon: "sys_temp", label: "系统模板", size: "27-27" },
      { icon: "upload", label: "上传", size: "37-27" }
    ]

    // const reservePros = {
    //   account: []
    // }

    const iconActive = ref(0)

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

    const drawLine = () => {
      const myChart = echarts.init(document.getElementById("reportCharts"))
      myChart.setOption(profitOption(chartsSet))
      window.onresize = function () {
        myChart.resize()
      }
    }

    onMounted(() => {
      drawLine()
    })

    return {
      marketIndex,
      iconList,
      iconActive,

      accountHeader: ACCOUNT_HEADER,

      accountData: lab[0]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.contain {
  @include contain()
}
.report {
  display: flex;
  padding-top: 63px;
  .icon-nav {
    width: 57px;
    margin-right: 24px;
    font-size: 14px;
    flex-shrink: 0;
    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 45px;
      cursor: pointer;
      .icon-box {
        width: 48px;
        height: 45px;
        border-radius: 13px;
        margin-bottom: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .content {
    flex-grow: 1;
  }
}

.content {
  position: relative;
  .export {
    font-size: 14px;
    position: absolute;
    top: -40px;
    right: 0;
    cursor: pointer;
  }
  .profit {
    margin-top: 0;
    text-align: center;
    b {
      font-size: 20px;
    }
  }
}

.table{
  padding-top: 0;
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
