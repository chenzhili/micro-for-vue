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
    <!-- 实训内容 -->
    <div class="trainingContent">
      <trainingItem
        class="trainingItem"
        v-for="item in trainingContentArr"
        :content="item"
        :key="item.title"
      ></trainingItem>
    </div>
    <!-- 页码 -->
    <pageNo></pageNo>
  </div>
</template>

<script>
import trainingItem from "./component/trainingItem"
import pageNo from "../../common/pageNo"
import { ref, computed } from "vue"
export default {
  components: {
    trainingItem,
    pageNo
  },
  setup (props) {
    const STATUS = {
      3: "全部",
      0: "未读",
      1: "已读"
    }
    // 实训内容的数组
    const trainingContentArr = [
      { title: "乾隆1", explain: "说明1", schedule: "0", imgUrl: "" },
      { title: "乾隆2", explain: "说明2", schedule: "1", imgUrl: "" },
      { title: "乾隆3", explain: "说明3", schedule: "2", imgUrl: "" },
      { title: "乾隆4", explain: "说明4", schedule: "3", imgUrl: "" },
      { title: "乾隆5", explain: "说明5", schedule: "4", imgUrl: "" },
      { title: "乾隆6", explain: "说明6", schedule: "5", imgUrl: "" },
      { title: "乾隆7", explain: "说明7", schedule: "6", imgUrl: "" },
      { title: "乾隆8", explain: "说明8", schedule: "7", imgUrl: "" },
      { title: "乾隆8", explain: "说明8", schedule: "7", imgUrl: "" }
    ]
    const status = ref(3)
    const sList = [
      { label: "全部", value: 3 },
      { label: "未读", value: 0 },
      { label: "已读", value: 1 }
    ]
    const hList = [
      { label: "进行中" },
      { label: "未开始" },
      { label: "已结束" }
    ]
    const hNavActiveIndex = ref(0)
    const hNavChange = e => {
      console.log(e)
      hNavActiveIndex.value = e.index
    }
    return {
      status,
      statusText: computed(() => STATUS[status.value]),
      sList,
      hList,
      hNavActiveIndex,
      hNavChange,
      trainingContentArr
    }
  }
}
</script>

<style lang="scss" scoped>
.trainingContent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.trainingContent:after {
  content: "";
  width: 280px;
}
</style>
