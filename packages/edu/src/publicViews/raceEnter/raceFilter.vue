<template>
  <div class="tabs">
    <div class="market_tabs">
      <div
        class="market_tab"
        :class="{ active: filterStatus.type === null }"
        @click="toggleMarket(null)"
      >全部</div>
      <div
        class="market_tab"
        v-for="item in marketList"
        :key="item.id"
        :class="{ active: filterStatus.type === item.id }"
        @click="toggleMarket(item.id)"
      >{{ item.market }}</div>
    </div>
    <div class="status_tabs">
      <div class="status_head">比赛状态</div>
      <div
        class="status_tab"
        :class="{ active: filterStatus.racestatus === null }"
        @click="toggleStatus(null)"
      >全部</div>
      <div
        class="status_tab"
        v-for="tab in statusList"
        :key="tab.value"
        :class="{ active: filterStatus.racestatus === tab.value }"
        @click="toggleStatus(tab.value)"
      >{{ tab.label }}</div>
      <div class="status_tab">
        <el-checkbox v-model="filterStatus.signupstatus">已报名</el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import { queryMarket } from "@/api/myRace/raceEnter"
import { TAB_STATUS } from "./raceEnter"
import { ref, onMounted, reactive, watch } from "vue"
export default {
  setup (props, { emit }) {
    const filterStatus = reactive({
      type: null,
      signupstatus: false,
      racestatus: null
    })

    const marketList = ref([])

    const toggleMarket = e => {
      filterStatus.type = e
    }

    const toggleStatus = e => {
      filterStatus.racestatus = e
    }
    const getMarketList = async () => {
      const res = await queryMarket()
      marketList.value = res.data
    }

    watch(filterStatus, nv => {
      // console.log('改变状态', nv)
      emit('changeFilter', nv)
    })

    onMounted(() => {
      getMarketList()
    })
    return {
      marketList,
      statusList: TAB_STATUS,
      toggleStatus,
      toggleMarket,
      filterStatus
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 1398px;
  height: 129px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 9px;
  font-size: 16px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  color: #222222;
  .market_tabs {
    height: 61px;
    width: 1342px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e1d9d9;
    .market_tab {
      margin-right: 45px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &.active,
      &:hover {
        color: #e0585b;
      }
    }
  }
  .status_tabs {
    display: flex;
    align-items: center;
    height: 67px;
    width: 1342px;
    margin: 0 auto;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #222222;
    .status_head {
      width: 82px;
      height: 34px;
      opacity: 1;
      background: linear-gradient(
        50deg,
        rgba(248, 70, 70, 0.99) 4%,
        #ff8672 93%
      );
      border-radius: 17px 0 17px 0;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 48px;
    }
    .status_tab {
      margin-right: 48px;
      cursor: pointer;
      height: 65px;
      display: flex;
      align-items: center;
      &.active {
        color: #e0585b;
        border-bottom: 2px solid #e0585b;
      }
      &:hover {
        color: #e0585b;
      }
    }
  }
}
::v-deep {
  .el-checkbox {
    display: flex;
    align-items: center;
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
    &::after {
      left: 5px;
      top: 2px;
    }
  }
  .el-checkbox__label {
    font-size: 16px;
  }
}
</style>
