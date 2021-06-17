<template>
  <div class="race-contain">
    <div class="race">
      <div class="race-name">{{raceConfig.racename}}</div>
      <div class="choose-race">
        <el-select v-model="value" placeholder="其他比赛" filterable>
          <el-option
            v-for="item in raceList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <my-race-nav></my-race-nav>
    <div class="com-contain">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import myRaceNav from "./MyRaceNav/index"
import { ref, computed, onMounted } from "vue"
import { useStore } from "vuex"
import { getRaceConfig } from '@/utils/auth.js'
import { queryRaces } from "@/api/myRace/raceEnter"
export default {
  components: {
    myRaceNav
  },
  setup () {
    const store = useStore()
    const raceList = ref([])
    const value = ref("")
    const raceConfig = JSON.parse(getRaceConfig())
    const getRaceList = async () => {
      const params = {
        current: 1,
        size: 10,
        type: raceConfig.marketId,
        signupstatus: false
      }
      const res = await queryRaces(params)
      raceList.value = res.data.records.map(item => {
        return {
          label: item.racename,
          value: item.raceid
        }
      })
    }
    onMounted(() => {
      getRaceList()
    })
    return {
      raceList,
      value,
      raceConfig
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/interaction.scss";
.com-contain {
  padding-bottom: 20px;
}
.race-contain {
  padding-top: 23px;
  // text-align: center;
}
.race {
  position: relative;
  .race-name {
    color: #222222;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 23px;
  }
  .choose-race {
    position: absolute;
    right: 0;
    top: -5px;
    &::v-deep(.el-select) {
      @include select-icon();
    }
  }
}

.nav {
  width: 1350px;
  height: 125px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 9px;
  padding: 0 24px;
  .nav-row {
    display: flex;
    height: 62px;
    border-bottom: 1px dashed #ebebeb;
    .nav-item {
      width: 64px;
      margin-right: 56px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      @include tabs-interaction("true");
    }
  }
  .tab-row {
    display: flex;
    align-items: center;
    height: 62px;
    .tab-item {
      height: 19px;
      opacity: 1;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #222222;
      margin-right: 56px;
      cursor: pointer;
      &.active {
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 9px;
        opacity: 1;
        background: #e0585b;
        border-radius: 4px;
        color: #fff;
      }
    }
  }
}
::v-deep {
  .el-dropdown {
    color: rgba(34, 34, 34, 1);
    font-size: 16px;
    @include sub-select-icon();
  }
  .el-dropdown-menu__item {
    width: 320px;
    height: 40px;
    padding: 0 16px;
  }
  .el-input {
    width: 192px;
    height: 40px;
    border-radius: 5px;
  }
  .el-popper__arrow::before {
    content: none;
  }
}
</style>
