<template>
  <div class="test-questions">
    <div class="section-list">
      <div class="section" v-for="(item, index) in sectionList" :key="index">
        <div class="section-title">
          {{ item.label }}
        </div>
        <div class="section-time">
          <span class="but">取消收藏</span>
          <span class="time">{{ item.time }}</span>
        </div>
      </div>
    </div>
    <div class="pageSize">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      :page-size="pageSize"
      :current-page="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup (props) {
    const sectionList = [
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      },
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      },
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      },
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      },
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      },
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      },
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      },
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      },
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      },
      {
        label: "[章节练习]第一节 金融市场、资产管理与投资基金",
        time: "2021.0.18"
      }
    ]
    const pageSize = ref(10)
    const currentPage = ref(1)
    return {
      sectionList,
      pageSize,
      currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
.test-questions {
  margin-top: 20px;
  .section-list {
    width: 878px;
    max-height: 618px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 9px;
    margin-bottom: 24px;
    .section {
      height: 60px;
      border-bottom: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      .section-title {
        width: 450px;
        opacity: 1;
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #222222;
        margin-left: 20px;
      }
      .section-time {
        display: flex;
        flex-direction: row-reverse;
        flex: 1;
        margin-right: 24px;
        .but {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #222222;
          cursor: pointer;
          &:hover{
            color: $primary-light-color;
          }
        }
        .time {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #bbbbbb;
          margin-right: 36px;
        }
      }
    }
  }
  .pageSize{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 48px;
  }
}
</style>
