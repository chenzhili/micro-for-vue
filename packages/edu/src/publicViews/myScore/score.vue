<template>
  <div>
    <div class="contain">
      <div class="summary">
        <p>{{'小豆子'}}</p>
        <p>
          综合成绩打败了<i>{{scoreData.beatpercent.allbeatper}}</i>的人
          <span>{{scoreData.createtime}}入营 &nbsp;操作<i>{{scoreData.tradenum}}</i>次 &nbsp;累计收益率<i>{{scoreData.ratioprofit.profitreturn}}</i></span>
        </p>
      </div>
      <div class="my-score">
        <div class="card" v-for="(item,index) in cardList" :key="index">
          <div class="title">
            <b>{{item.title}}</b>
            <span>打败了{{scoreData.beatpercent[`${item.prefix}beatper`]}}的人</span>
          </div>
          <div class="card-data">
            <div class="card-top">
              <template v-if="index===0||index==1">
                <ul>
                  <li>您的分数:</li>
                  <li>{{index===0?"您的累计收益率:":"您的单股最大浮亏:"}}</li>
                  <li>市场平均分:</li>
                </ul>
                <ul>
                  <li class="red">{{scoreData.score[`${item.prefix}score`]}}</li>
                  <li>{{index===0?scoreData.ratioprofit.profitreturn:scoreData.ratioprofit.socketbigfloat}}</li>
                  <li class="blue">{{scoreData.avgmaxmin[`${item.prefix}avg`]}}</li>
                </ul>
              </template>
              <template v-else>
                <ul>
                  <li>您的分数:</li>
                </ul>
                <ul>
                  <li class="red">{{scoreData.score[`${item.prefix}score`]}}</li>
                </ul>
                <div style="marginTop:10px">您的{{'?%'}}的买入股票出现较大上涨</div>
              </template>
            </div>

            <div class="card-bottom">
              <template v-if="index===0||index==1">
                <table cellpadding="0" cellspacing="10px">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>最高分:</td>
                      <td>{{scoreData.avgmaxmin[`${item.prefix}high`]}}</td>
                      <td></td>
                      <td>{{index===0?'收益率':'最低分'}}</td>
                      <td>{{index===0?scoreData.ratioprofit.profithighreturn:scoreData.avgmaxmin.risklow}}</td>
                    </tr>
                    <tr v-if="index===0">
                      <td>最低分:</td>
                      <td>{{scoreData.avgmaxmin.profitlow}}</td>
                      <td></td>
                      <td>收益率:</td>
                      <td>{{scoreData.ratioprofit.profitlowreturn}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else>
                <table cellpadding="0" cellspacing="10px">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>市场平均分:</td>
                      <td class="blue">0</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>最高分:</td>
                      <td>0</td>
                      <td></td>
                      <td>最低分:</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </div>
          </div>
        </div>

        <div class="charts-area">
          <div class="charts" id="scoreCharts"></div>
        </div>
      </div>
    </div>
    <div class="contain tabs">
      <HNavBarNew :height="64" :list="hNavList" :activeIndex="tabIndex" @tabChange="changeTab"></HNavBarNew>
    </div>
    <div class="contain rank">
      <table-toolbar title="评分排名">
        <template #tool>
          <el-input placeholder="学生昵称/姓名" v-model="searchKey" clearable>
            <template #suffix>
              <i class="el-input__icon el-icon-search"></i>
            </template>
          </el-input>
        </template>
      </table-toolbar>
      <page-table ref="pageRef" :defaultData="tableData">
        <template #="tableScope">
          <table-com
            :tableHeader="tableHeader"
            :tableData="tableScope.datas"
            v-loading="tableScope.loading"
          ></table-com>
        </template>
      </page-table>
    </div>
  </div>
</template>

<script>
import HNavBarNew from "@/components/HNavBarNew"
import { score } from "./fakeData"
import { SCORE_HEADER, SCORE_CARD } from "./scoreConfig"
import { dataDispose } from '@/utils'
import { scoreOption } from "./chartsData"
import { ref, onMounted, inject } from "vue"
export default {
  components: {
    HNavBarNew
  },
  setup () {
    const echarts = inject("ec")

    const hNavList = [
      { label: "综合评分", value: 'all' },
      { label: "盈利能力", value: 'profit' },
      { label: "风控能力", value: 'risk' },
      { label: "选股水平", value: 'select' },
      { label: "出场水平", value: 'sell' }
    ]

    const tabIndex = ref(0)
    const tableData = ref(score.data.scorerank)
    const tableHeader = ref(SCORE_HEADER)
    const scoreData = score.data

    const changeTab = mes => {
      tabIndex.value = mes.index
      tableHeader.value[2].attrs.prop = hNavList[mes.index].value + "score"
    }

    const searchKey = ref("")

    onMounted(() => {
      const props = ["allscore"]
      dataDispose(tableData.value, props)

      const myChart = echarts.init(document.getElementById("scoreCharts"))
      myChart.setOption(scoreOption())
      window.onresize = function () {
        myChart.resize()
      }
    })

    return {
      hNavList,
      tabIndex,
      changeTab,
      searchKey,
      scoreData,

      tableHeader,
      tableData: score.data.scorerank,
      cardList: SCORE_CARD
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.contain {
  @include contain()
}
.tabs {
  padding: 0 24px;
}
.rank {
  padding-top: 0;
}
.summary {
  text-align: left;
  padding: 12px 24px;
  height: 82px;
  opacity: 1;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 3px 15px 0px rgba(224, 88, 91, 0.2);
  i{
    color: #E0585B;
    font-style: normal;
  }
  p {
    margin: 0;
    &:first-child {
      margin-bottom: 16px;
    }
  }
  span {
    margin-left: 36px;
    font-size: 12px;
  }
}
.my-score {
  padding: 0 64px;
  margin-top: 39px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  .card {
    width: 391px;
    height: 196px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 9px;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 16px;
    text-align: left;
    font-size: 12px;
    color: #222222;
    &:nth-child(2) {
      margin-left: 50px;
    }
    .title {
      margin-bottom: 17px;
      b {
        font-size: 14px;
        margin-right: 16px;
      }
    }
    .gray-font {
      color: #8d8d8d;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 190px;
      div {
        margin-bottom: 10px;
      }
    }
    .card-data {
      .red {
        color: #f33a52;
      }
      .blue {
        color: #3a6fd9;
      }
      .card-top {
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: inline-block;
          &:first-child {
            margin-right: 10px;
          }
          li {
            margin-bottom: 10px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .card-bottom {
        color: #8D8D8D;
        table {
          position: relative;
          left: -10px;
        }
      }
    }
  }
  .charts-area {
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .charts {
      width: 350px;
      height: 424px;
    }
  }
}
</style>
