<template>
  <div>
    <div class="contain time-picker">
      <label>时间选择：</label>
      <div class="septime">
        <el-date-picker
          v-model="timeRange.startDate"
          type="date"
          format="yyyy-MM-dd"
          placeholder="起始时间"
          disabled
        ></el-date-picker>
      </div>
      <label>至</label>
      <div class="septime">
        <el-date-picker
          v-model="timeRange.endDate"
          type="date"
          format="yyyy-MM-dd"
          placeholder="截止时间"
        ></el-date-picker>
      </div>
    </div>
    <div class="contain table">
      <table-toolbar title="超额收益能力" :rStyle="{fontSize:'14px'}">
        <template #subTitle>
          统计盈利性指标，通过对基准收益，衡量获取超额收益的能力
        </template>
        <template #tool>
          <div>统计日期：2021-02-27</div>
        </template>
      </table-toolbar>
      <table-com :tableHeader="tableHeader" :tableData="tableData1">
        <template #instructions="{ scope }">
          <div class="instructions">
            {{scope.$index===0?scope.row.instructions:'信息'}}{{scope.$index===0?'指数':'比率'}}
            <el-tooltip placement="right-end" effect="light">
              <template #content>
                <div class="paraphrase">{{paraphrase[scope.row.instructions]}}</div>
              </template>
              <svg-icon icon-class="risk_ques"></svg-icon>
            </el-tooltip>
          </div>
        </template>
        <template #totalyield>无限制</template>
      </table-com>
    </div>
    <div class="contain table">
      <table-toolbar title="投资性价比" :rStyle="{fontSize:'14px'}">
        <template #subTitle>
          综合统计投资盈利及风险的指标，衡量投资风险所带来的收益性价比。
        </template>
        <template #tool>
          <div>统计日期：2021-02-27</div>
        </template>
      </table-toolbar>
      <table-com :tableHeader="tableHeader" :tableData="tableData2">
        <template #instructions="{ scope }">
          <div class="instructions">
            {{scope.row.instructions}}指数
            <el-tooltip placement="right-end" effect="light">
              <template #content>
                <div class="paraphrase">{{paraphrase[scope.row.instructions]}}</div>
              </template>
              <svg-icon icon-class="risk_ques"></svg-icon>
            </el-tooltip>
          </div>
        </template>
        <template #totalyield>无限制</template>
      </table-com>
    </div>
  </div>
</template>

<script>
import { risk } from "./fakeData"
import { RISK_HEADER } from "./scoreConfig"
import { ref } from 'vue'
export default {
  setup () {
    const tableData = risk.data
    const timeRange = ref({
      startDate: '',
      endDate: ''
    })

    const paraphrase = {
      Jensen:
        "是衡量超额收益大小的一种指标。 \n Jensen指数综合权衡收益与风险因素，通过实际收益率与预期回报率之差，来得到超额收益。 \n Jensen指数>0，表明投资表现优于市场基准，反之亦然。 \n 计算公式：JP=Rp-[rf＋β×(Rm－rf)]",
      Ir:
        "是衡量超额风险所带来的超额收益的一种指标。 \n 即投资组合优于基准的风险调整所带来的超额报酬，它表示主动风险所带来的超额收益。 \n 信息比率>0，表明投资表现优于市场基准，反之亦然。 \n 计算公式：IR=α∕ω",
      Sharpe:
        "是衡量投资收益风险比的一种指标。 \n 可以理解为每承担一份风险，能带来多少收益。不同于Treynor指数，Sharpe比率考虑的是总风险。 \n Sharpe比率越大，表明收益越高于风险。 \n 计算公式：SP=[E(Rp)－Rf]/σp",
      Treynor:
        "是衡量投资收益风险比的一种指标。 \n 同样可以理解为每承担一份风险，能带来多少超额收益。不同于Sharpe比率，Treynor指数考虑的是市场风险。 \n Treynor指数越大，表明投资表现越好。 \n 计算公式：TR=（Rp―Rf）/β"
    }
    const setTableData = matchList => {
      const tableData = matchList.map(item => {
        const dataItem = {
          instructions: "",
          curvalue: "",
          average: ""
        }
        for (const i in risk.data) {
          if (i.indexOf(item) >= 0) {
            dataItem.instructions =
              item.slice(0, 1).toUpperCase() + item.slice(1)
            if (i.indexOf("Average") !== -1) {
              dataItem.average = risk.data[i]
            } else {
              dataItem.curvalue = risk.data[i]
            }
          }
        }
        return dataItem
      })
      return tableData
    }

    const tableData1 = setTableData(["jensen", "ir"])
    const tableData2 = setTableData(["sharpe", "treynor"])

    return {
      tableHeader: RISK_HEADER,
      paraphrase,
      tableData1,
      tableData2,
      timeRange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.contain {
  @include contain()
}
.time-picker{
  display: flex;
  align-items: center;
  label{
    &:nth-of-type(1){
      margin-right: 24px;
    }
    &:nth-of-type(2){
      margin: 0 10px;
    }
  }
}
.table {
  padding-top: 0;
}

.instructions {
  position: relative;
  .svg-icon {
    width: 14px;
    height: 14px;
  }
}
.paraphrase {
  white-space: pre-line;
}
::v-deep {
  .el-popper {
    white-space: pre-line;
  }
}
</style>
