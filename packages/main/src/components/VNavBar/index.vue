<template>
  <div class="vertical-nav">
    <div v-for="(item, index) in list" :key="index" class="nav-item" @click="itemClick(item, index)">
      <span class="indicator" :class="{'active': index === activeIndex, 'animation': animation}"></span>
      <div class="label-area">
        <span class="label">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    },
    animation: {
      type: Boolean,
      default: () => true
    }
  },
  emits: ["tabChange"],
  setup (props, { emit }) {
    const itemClick = (child, index) => {
      emit('tabChange', { child, index })
    }

    return {
      itemClick
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical-nav{
  width: 298px;
  background-color: #ffffff;
  border: 1px solid $divide-line-color;
  border-radius: 9px;
  display: flex;
  flex-direction: column;

  .nav-item {
    padding: 17px 0;
    display: flex;
    height: 19px;
    line-height: 19px;
    align-items: center;
    cursor: pointer;
    &:hover{
      background: #EBEBEB;
    }

    .label-area{
      flex: 1;
      display: flex;

      .label{
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: $primary-text-color;
        margin-left: 28px;
      }
    }

    .indicator{
      height: 0;
      width: 2px;
      background-color: $primary-light-color;
      opacity: 0;
      &.animation{
        transition: .2s;
      }
      &.active{
        opacity: 1;
        height: 100%;
      }
    }
  }
}
</style>
