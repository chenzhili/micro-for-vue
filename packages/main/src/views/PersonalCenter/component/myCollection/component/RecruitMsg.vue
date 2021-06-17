<template>
  <div class="recruit-msg">
    <div class="list">
      <div class="section"  v-for="(item,index) in list" :key="index">
        <div class="section-left">
          <div class="l-head">
            <div class="post">银行理财员</div>
            <div class="company">中国建设银行(***支行)</div>
          </div>
          <div class="l-footer">
            <div class="salary">8k-15k</div>
            <div class="edu">经验1-3年/大专</div>
            <div class="live-address"><img src="../../../../../assets/person/address.png" alt="">北京·朝阳区</div>
          </div>
        </div>
        <div class="section-right">
          <span class="but">取消收藏</span>
          <span class="time">2021.03.18</span>
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
import { ref } from "vue"
export default {
  setup (props) {
    const list = [{ label: '1' }, { label: '1' }, { label: '1' }, {}]
    const pageSize = ref(10)
    const currentPage = ref(1)
    return {
      pageSize,
      currentPage,
      list
    }
  }
}
</script>

<style lang="scss" scoped>
.recruit-msg {
  margin-top: 20px;
  .section {
    width: 878px;
    height: 106px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 9px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .section-left {
      margin-left: 30px;
      .l-head{
        display: flex;
        margin-bottom: 20px;
        text-align: left;
        font-size: 18px;
        color: #222222;
        .post{
          margin-right: 64px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
        }
        .company{
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
        }
      }
      .l-footer{
        display: flex;
        height: 24px;
        align-items: baseline;
        font-weight: 400;
        text-align: left;
        color: #8d8d8d;
        .salary{
          font-size: 18px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          color: #e0585b;
          margin-right: 24px;
        }
        .edu{
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          margin-right: 75px;
        }
        .live-address{
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          img{
            margin-right: 5px;
          }
        }
      }
    }
    .section-right {
      display: flex;
      flex-direction: row-reverse;
      flex: 1;
      margin-right: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      .but {
        opacity: 1;
        font-size: 14px;
        color: #222222;
        cursor: pointer;
        &:hover{
          color: $primary-light-color;
        }
      }
      .time {
        opacity: 1;
        font-size: 14px;
        color: #bbbbbb;
        margin-right: 36px;
      }
    }
  }
  .pageSize {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 48px;
  }
}
</style>
