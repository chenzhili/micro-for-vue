<template>
  <div class="practice-contain">
    <div class="title">我的练习</div>
    <page-table ref="pageRef" :defaultData="list" :pageSize="6" @pageChange="pageChange">
      <template #="tableScope">
        <transition-group class="practice-list" name="bounce" tag="div">
          <div
            class="practice-item"
            :class="{'list-in':show}"
            v-for="(item,index) in tableScope.datas"
            :key="index"
          >
            <div class="item-title">{{item.name}}</div>
            <div class="content">
              <div>
                初始资金：
                <span>{{item.init.toFixed(2)}}</span>
              </div>
              <div>
                当前状态：
                <span>
                  <i class="status" :style="{backgroundColor:'#00C642'}"></i>
                  练习中
                </span>
              </div>
              <div class="but-group">
                <but-com content="弱化按钮" type="normal"></but-com>
                <but-com content="重要按钮"></but-com>
              </div>
            </div>
          </div>
        </transition-group>
      </template>
    </page-table>
  </div>
</template>

<script>
import { practiceData } from "./fakedata"
import { ref, onMounted, nextTick } from "vue"
export default {
  setup () {
    const list = practiceData.data
    const show = ref(true)
    const pageChange = () => {
      show.value = false
      nextTick(() => {
        show.value = true
      })
    }
    return {
      pageChange,
      show,
      list
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/interaction.scss";
@include list-in(6);
.practice-contain {
  padding-top: 20px;
}
.title {
  color: #222222;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.practice-list {
  height: 550px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .practice-item {
    font-size: 14px;
    width: 404px;
    height: 251px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 11px;
    overflow: hidden;
    margin-bottom: 20px;
    .item-title {
      padding: 9px 20px;
      background: #e9e9e9;
      border-radius: 10px 10px 0px 0px;
    }
    .content {
      padding: 30px 24px;
      color: #18191c;
      & > div {
        margin-bottom: 30px;
      }
      span {
        color: #949494;
        i {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 1px;
        }
      }
      .but-group {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 0 9px 0;
        margin: 0;
        .but {
          &:first-child {
            margin-right: 60px;
          }
        }
      }
    }
  }
}
</style>
