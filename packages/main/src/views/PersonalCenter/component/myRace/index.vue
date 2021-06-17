<template>
  <div class="data-set">
    <h-nav-bar :activeIndex="hNavActiveIndex" :list="hList" @tabChange="hNavChange">
      <template #suffix>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ statusText }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in sList"
                :key="index"
                @click="status = item.value"
              >{{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </h-nav-bar>
    <!-- 竞赛内容 -->
    <div class="myRaceContent">
      <myRaceItem
        class="trainingItem"
        v-for="item in myRaceContentArr"
        :content="item"
        :key="item.title"
      ></myRaceItem>
    </div>
    <!-- 页码 -->
    <pageNo></pageNo>
  </div>
</template>

<script>
import myRaceItem from "./component/myRaceItem"
import pageNo from "../../common/pageNo"
import { ref, watch, computed } from "vue"
export default {
  components: {
    myRaceItem,
    pageNo
  },
  setup (props) {
    const STATUS = {
      0: "全部",
      1: "未读",
      2: "已读"
    }
    // 实训内容的数组
    const myRaceContentArr = [
      {
        title: "乾隆比赛1",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      },
      {
        title: "乾隆比赛2",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      },
      {
        title: "乾隆",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      },
      {
        title: "乾隆",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      },
      {
        title: "乾隆",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      },
      {
        title: "乾隆",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      },
      {
        title: "乾隆",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      },
      {
        title: "乾隆",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      },
      {
        title: "乾隆",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      },
      {
        title: "乾隆",
        applyTime: "2021.01.30-2021.02.28",
        raceTime: "2021.01.30-2021.02.28",
        applyState: 0,
        imgUrl: ""
      }
    ]
    const hList = [
      { label: "进行中" },
      { label: "未开始" },
      { label: "已结束" }
    ]
    const sList = [
      { label: "全部", value: 0 },
      { label: "未读", value: 1 },
      { label: "已读", value: 2 }
    ]
    const isLoading = ref(false)
    const status = ref(0)
    const vNavActiveIndex = ref(0)
    const hNavActiveIndex = ref(0)

    const hNavChange = e => {
      hNavActiveIndex.value = e.index
    }
    const statusChange = e => {
      status.value = e
    }
    return {
      sList,
      hList,
      hNavActiveIndex,
      status,
      statusText: computed(() => STATUS[status.value]),
      hNavChange,
      myRaceContentArr
    }
  }
}
</script>

<style lang="scss" scoped>
.myRaceContent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.myRaceContent:after {
  content: "";
  width: 280px;
}
</style>
