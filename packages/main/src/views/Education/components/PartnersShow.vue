<template>
  <div class="partners-show">
    <div class="show">
      <img @click="partnersChange(true)" src="@/assets/education/partners/left.png" alt />
      <div class="view">
        <div class="item-box" :style="{left:`${partnersPos}px`}">
          <div class="item" v-for="(boxes,boxesIndex) in partnersList" :key="boxesIndex">
            <img v-for="(item,index) in boxes" :key="index" :src="item.url" alt />
          </div>
        </div>
      </div>
      <img @click="partnersChange(false)" src="@/assets/education/partners/right.png" alt />
    </div>
    <div class="instructions">
      <div
        v-for="(item,index) in partnersList.length"
        :key="index"
        class="instructions-item"
        :class="{'active-item':index==curIndex}"
        @click="curIndex=index"
      ></div>
    </div>
  </div>
</template>

<script>
import { partnersList } from "@/assets/education/partners/partners.js"
import { ref, watch, computed } from "vue"
export default {
  setup (props, content) {
    // const partnersPos = ref(0)
    const boxNum = partnersList.length
    const curIndex = ref(0)
    const partnersChange = fx => {
      curIndex.value = fx ? curIndex.value - 1 : curIndex.value + 1
    }
    const partnersPos = computed(() => {
      return -(curIndex.value * 1014)
    })
    watch(curIndex, () => {
      if (curIndex.value > boxNum - 1) {
        curIndex.value = 0
      }
      if (curIndex.value < 0) {
        curIndex.value = boxNum - 1
      }
    })
    return { partnersPos, partnersChange, partnersList, curIndex }
  }
}
</script>

<style lang="scss" scoped>
.show {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  &>img{
    cursor: pointer;
  }
  .view {
    flex-grow: 1;
    position: relative;
    height: 93px;
    overflow: hidden;
    .item-box {
      position: absolute;
      top: 8px;
      display: flex;
      transition: left 0.6s ease;
      .item {
        width: 1014px;
        display: inline-flex;
        justify-content: space-around;
      }
    }
  }
}
.instructions {
  margin: 32px auto 64px;
  width: 98px;
  height: 17px;
  display: flex;
  justify-content: space-between;
  .instructions-item {
    width: 17px;
    height: 17px;
    background: #ffffff;
    border: 1px solid #bfbfbf;
    border-radius: 50%;
    cursor: pointer;
  }
  .active-item {
    border-color: #4361ee;
  }
}
</style>
