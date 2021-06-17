<template>
  <div>
    <div class="contain my-rank">
      <table-toolbar title="当前排行">
        <template #tool>币种：人民币</template>
      </table-toolbar>
      <div class="cur-rank">
        <div class="th">
          <div style="width:40px">&nbsp;</div>
          <div style="width:60px">收益率</div>
          <div style="width:40px">排名</div>
          <div style="width:370px">所在位置</div>
        </div>
        <div class="tr" v-for="(item,index) in curRank" :key="index">
          <div
            class="icon-td"
            style="width:40px"
            :style="{backgroundImage:`url(${item.bg})`}"
          >{{item.name}}</div>
          <div style="width:60px">{{stu[`${item.prefix}return`]}}</div>
          <div style="width:40px">{{stu[`${item.prefix}rank`]}}</div>
          <div style="width:370px" class="percent">
            <div class="range">
              <span>第1名</span>
              <span>第{{stu[`${item.prefix}rank`]}}名</span>
            </div>
            <div class="scale">
              <div
                class="pos"
                :style="{left: (stu[`${item.prefix}rank`]-1)*360/(stu[`${item.prefix}join`]-1)+2 + 'px'}"
              ></div>
            </div>
            <span class="total-num">{{stu[`${item.prefix}join`]}}人参加排名</span>
          </div>
        </div>
      </div>
    </div>

    <div class="contain rank">
      <table-toolbar title="排行榜">
        <template #tool>
          <el-input placeholder="学生昵称/姓名" v-model="input" clearable>
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
          >
            <template #profitandloss="{ scope }">
              <span
                :style="{'color':scope.row.profitandloss[0]==='-'?'#00C642':'#F33A52'}"
              >{{scope.row.profitandloss}}</span>
            </template>
            <template #totalreturn="{ scope }">
              <span
                :style="{'color':scope.row.totalreturn[0]==='-'?'#00C642':'#F33A52'}"
              >{{scope.row.totalreturn}}</span>
            </template>
          </table-com>
        </template>
      </page-table>
    </div>
  </div>
</template>

<script>
import { rank } from "./fakeData"
import { rankIcon, RANK_HEADER } from "./scoreConfig"
import { dataDispose } from '@/utils'
import { ref, onMounted } from 'vue'
export default {
  setup () {
    const curRank = [
      { prefix: "total", name: "总", bg: rankIcon[0] },
      { prefix: "week", name: "周", bg: rankIcon[1] },
      { prefix: "day", name: "日", bg: rankIcon[2] }
    ]
    const tableData = ref(rank.data.rank)

    onMounted(() => {
      const props = [
        "initialmoney",
        "canusemoney",
        "totalmoney",
        "profitandloss"
      ]
      dataDispose(tableData.value, props)
    })
    return {
      curRank,
      stu: rank.data.stu,
      tableHeader: RANK_HEADER,
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
.my-rank,
.rank {
  padding-top: 0;
}
.cur-rank {
  display: flex;
  flex-direction: column;
  .th,
  .tr {
    display: flex;
    justify-content: space-between;
    padding-left: 45px;
    padding-right: 24px;
  }
  .th {
    margin: 24px 0 17px;
  }
  .tr {
    align-items: center;
    font-size: 14px;
    height: 94px;
    border: 1px solid #dddddd;
    border-radius: 15px;
    margin-bottom: 17px;
    &:last-child {
      margin-bottom: 0;
    }
    .icon-td {
      font-size: 12px;
      height: 37px;
      line-height: 37px;
      text-align: center;
      color: #fff;
    }
    .percent {
      font-size: 12px;
      .range {
        color: #222222;
        display: flex;
        justify-content: space-between;
      }
      .scale {
        width: 371px;
        height: 9px;
        margin: 3px 0 7px;
        background: #ff7070;
        border-radius: 5px;
        position: relative;
        .pos {
          position: absolute;
          width: 7px;
          height: 14px;
          background: #4dacff;
          border-radius: 2px;
          top: -3px;
        }
      }
      .total-num {
        color: #8d8d8d;
        text-align: right;
        display: block;
      }
    }
  }
}
</style>
