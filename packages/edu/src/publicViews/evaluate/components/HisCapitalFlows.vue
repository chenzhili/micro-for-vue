<template>
  <div>
    <table-toolbar title="历史资金流水">
      <template #tool>
        <div class="search">
          <div class="time-picker">
            <label>查询日期:</label>
            <div class="septime">
              <el-date-picker
                v-model="timeRange.startDate"
                type="date"
                format="yyyy-MM-dd"
                placeholder="起始时间"
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
          <div class="direction">
            <label>买卖方向:</label>
            <el-select v-model="marketIndex" placeholder="全部">
              <el-option label="买入" value="1"></el-option>
              <el-option label="卖出" value="2"></el-option>
            </el-select>
          </div>
          <div><svg-icon icon-class="search" class-Name="search-icon"></svg-icon>查询</div>
        </div>
      </template>
    </table-toolbar>
    <page-table ref="pageRef" :defaultData="tableData">
      <template #="tableScope">
        <div class="table-contain">
          <table-com
            :tableHeader="tableHeader"
            :tableData="tableScope.datas"
            v-loading="tableScope.loading"
          >
            <template #order="{ scope }">{{ scope.$index + 1 }}</template>
            <template #entrustbs="{ scope }">{{scope.row.entrustbs==='1'?'买入':'卖出'}}</template>
          </table-com>
        </div>
      </template>
    </page-table>
  </div>
</template>

<script>
import { lab } from "../fakeData"
import { HIS_CAPITAL_FLOWS_HEADER } from "../tableConfig"
import { ref } from 'vue'
export default {
  setup () {
    const timeRange = ref({
      startDate: "",
      endDate: ""
    })
    return {
      tableData: lab[2].data,
      tableHeader: HIS_CAPITAL_FLOWS_HEADER,

      timeRange
    }
  }
}
</script>

<style lang="scss" scoped>
.table-contain{
  width: 1280px;
  overflow: hidden;
}
.search {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .time-picker {
    display: flex;
    align-items: center;
    label {
      &:nth-of-type(1) {
        margin-right: 8px;
      }
      &:nth-of-type(2) {
        margin: 0 10px;
      }
    }
  }
  .direction{
    margin: 0 24px;
    label{
      margin-right: 8px;
    }
  }
}
.search-icon{
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
</style>
