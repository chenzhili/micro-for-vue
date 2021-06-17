<template>
<div class="focus-firm">
  <div class="list">
    <div class="modal" v-for="(item,index) in list" :key="index">
      <div class="firm-name">成都乾隆科技有限公司</div>
      <div class="firm-img">
        <!-- <div class="img"><img src="../../../../../assets/person/qxgz.png" alt=""></div> -->
        <div class="img"></div>
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
    const list = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
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
.focus-firm{
  margin-top: 20px;
  .list{
    display: flex;
    flex-wrap: wrap;
    width: 880px;
    max-height: 995px;
    margin-bottom: 24px;
    overflow: hidden;
    .modal{
      width: 203px;
      height: 229px;
      opacity: 1;
      background: #ffffff;
      border: 1px solid #ebebeb;
      border-radius: 9px;
      margin:0 20px 20px 0;
      display: flex;
      flex-direction: column-reverse;
      .firm-name{
        width: 203px;
        height: 51px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: center;
        color: #222222;
      }
      .firm-img{
        flex: 1;
        background: #ebebeb;
        position: relative;
        &:hover{
          .img{
            opacity: 1;
          }
        }
        .img{
          width: 45px;
          height: 45px;
          position: absolute;
          background: url('@/assets/person/qxgz.png');
          top: 0;
          right: 0;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s;
          &:active{
            background: url('@/assets/person/qxgz_active.png');
          }
        }
      }
    }
    .modal:nth-child(4n){
      margin-right: 0;
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
