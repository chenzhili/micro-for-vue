<template>
  <div class="error-record">
    <div class="list">
      <div class="head">
        <span class="section">章节</span>
        <span class="title">错题数</span>
      </div>
      <div class="modal" v-for="(item, index) in list" :key="index">
        <div class="topic">金融市场、资产管理与投资基金</div>
        <div class="quantity">5题</div>
        <div class="but">
          <div class="but-1 but-row">
            <!-- <el-button type="danger">错题重做</el-button> -->
            <div class="but-item reform">错题重做</div>
          </div>
          <div class="but-2 but-row">
            <div class="but-item check">查看</div>
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
    const list = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
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
.error-record {
  margin-top: 20px;
  .list {
    width: 878px;
    max-height: 813px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 9px;
    margin-bottom: 24px;
    .head {
      height: 44px;
      background: #2e3139;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      align-items: center;
      position: relative;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
      .section {
        margin-left: 30px;
      }
      .title {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
      }
    }
    .modal {
      height: 76px;
      border-bottom: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      .topic {
        font-size: 16px;
        color: #222222;
        margin-left: 30px;
        width: 385px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .quantity {
        font-size: 14px;
        color: #e0585b;
      }
      .but {
        flex: 1;
        display: flex;
        flex-direction: row-reverse;
        font-size: 14px;
        .but-row {
          margin-right: 24px;
          .but-item{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 36px;
            border-radius: 4px;
            cursor: pointer;
            &:hover{
              &.reform{
                background-color: #D9464A;
              }
              &.check{
                border: 1px solid #505050;
                color: #505050;
              }
            }
          }
        }
      }
    }
    .modal:nth-child(10n) {
      border-bottom: none;
    }
  }
  .pageSize {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 48px;
  }
}

.reform {
  background: #e0585b;
  color: #fff;
}
//完成按钮样式
.check {
  border: 1px solid #8d8d8d;
  color: #8d8d8d;
  background: #fff;
}
</style>
