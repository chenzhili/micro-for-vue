<template>
  <div>
    <table-toolbar title="历史成交记录">
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
          <div class="search-btn"><svg-icon icon-class="search" class-Name="search-icon"></svg-icon>查询</div>
        </div>
      </template>
    </table-toolbar>
    <page-table ref="pageRef" :defaultData="tableData">
      <template #="tableScope">
        <table-com
          :tableHeader="tableHeader"
          :tableData="tableScope.datas"
          v-loading="tableScope.loading"
        >
          <template #order="{ scope }">{{ scope.$index + 1 }}</template>
          <template #entrustbs="{ scope }">{{scope.row.entrustbs==='1'?'买入':'卖出'}}</template>
          <template #reason>
            <but-com style="margin:auto" type="normal" :width="60" content="查看"></but-com>
          </template>
        </table-com>
      </template>
    </page-table>
  </div>
</template>

<script>
import { lab } from "../fakeData"
import { HIS_EXCHANGES_HEADER } from "../tableConfig"
import { ref } from "vue"
export default {
  setup () {
    const timeRange = ref({
      startDate: "",
      endDate: ""
    })
    return {
      tableData: lab[1].data,
      tableHeader: HIS_EXCHANGES_HEADER,

      timeRange
    }
  }
}
</script>

<style lang="scss" scoped>
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
  .search-btn{
    cursor: pointer;
    .search-icon{
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
}

</style>
