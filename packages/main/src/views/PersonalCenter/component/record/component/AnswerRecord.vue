<template>
  <div class="answer-record">
    <div class="answer">
      <div class="list" v-for="(item, index) in list" :key="index">
        <div class="list-left">
          <div class="left-head">
            [章节练习]第一节 金融市场、资产管理与投资基金
          </div>
          <div class="left-footer">
            <div class="time">2021.02.14</div>
            <div class="a-time"><span>11</span>/56</div>
          </div>
        </div>
        <div class="list-right">
          <div
            class="but"
            :class="{ unFinish: item.flag === '0', finish: item.flag === '1' }"
          >
            {{ item.flag === "0" ? "继续做题" : "再做一次" }}
          </div>
          <div
            class="r-status"
            :style="{ color: item.flag === '0' ? '#e0585b' : '#222222' }"
          >
            {{ item.flag === "0" ? "未完成" : "86分" }}
          </div>
        </div>
      </div>
    </div>
    <div class="pageSize">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="list.length"
        :page-size="pageSize"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  setup (props) {
    const list = [
      { flag: "0" },
      { flag: "1" },
      { flag: "0" },
      { flag: "1" },
      { flag: "0" },
      { flag: "1" },
      { flag: "0" },
      { flag: "1" },
      { flag: "0" },
      { flag: "1" }
    ]
    const pageSize = ref(10)
    const currentPage = ref(1)
    return {
      list,
      pageSize,
      currentPage
    }
  }
}
</script>

<style lang="scss" scoped>
.answer-record {
  .answer {
    width: 878px;
    height: 888px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 9px;
    margin-top: 20px;
    margin-bottom: 24px;
    .list {
      height: 88px;
      border-bottom: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      .list-left {
        margin-left: 30px;
        .left-head {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #222222;
          margin-bottom: 8px;
        }
        .left-footer {
          display: flex;
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #bbbbbb;
          .time {
            margin-right: 36px;
          }
          .a-time {
            color: #222222;
            span{
              color: #1ac52b;
            }
          }
        }
      }
      .list-right {
        flex: 1;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        .but {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 24px;
          width: 110px;
          height: 36px;
          border-radius: 4px;
          cursor: pointer;
          &:hover{
            // background-color: #D9464A;
            &.unFinish{
              background-color: #D9464A;
            }
            &.finish{
              border: 1px solid #505050;
              color: #505050;
            }
          }
        }
        .r-status {
          text-align: left;
          margin-right: 100px;
        }
      }
    }
    .list:nth-child(10n) {
      border: none;
    }
  }
  .pageSize {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 48px;
  }
}

//未完成按钮样式
.unFinish {
  background: #e0585b;
  color: #fff;
}
//完成按钮样式
.finish {
  border: 1px solid #8d8d8d;
  color: #8d8d8d;
  background: #fff;
}
</style>
