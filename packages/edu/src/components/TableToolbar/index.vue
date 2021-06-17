<template>
  <div class="head">
    <div class="left" :style="fStyle">
      <div class="tabs" v-if="isNav">
        <div
          class="tab"
          v-for="item in navItems"
          :key="item.value"
          @click="toggle(item.value)"
          :class="{active: navValue === item.value}"
        >{{ item.label }}</div>
      </div>
      <div v-else>{{ title }}</div>
      <div v-if="hasSub" class="sub-title">
        <slot name="subTitle"></slot>
      </div>
    </div>
    <div class="right" :style="rStyle" :v-if="hasRight">
      <slot name="tool"></slot>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    fStyle: {
      type: Object,
      default: () => {}
    },
    rStyle: {
      type: Object,
      default: () => {}
    },
    isNav: {
      type: Boolean,
      default: false
    },
    navItems: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { slots }) {
    const hasRight = ref(!!slots.tool)
    const hasSub = ref(!!slots.subTitle)
    const navValue = ref(0)
    const toggle = val => {
      navValue.value = val
    }
    return {
      hasRight,
      hasSub,
      navValue,
      toggle
    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  align-items: center;
  padding: 16px 0 5px;
  position: relative;
  // &::after {
  //   content: "";
  //   position: absolute;
  //   bottom: 0;
  //   width: 100%;
  //   height: 1px;
  //   background-color: $divide-line-color;
  // }
  .left {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: $primary-text-color;
  }
  .sub-title {
    font-size: 14px;
    color: #222222;
    margin-top: 16px;
    font-weight: normal;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
  }
}
.tabs {
  display: flex;
  font-size: 16px;
  color: #a8abae;
  .tab {
    margin-right: 46px;
    position: relative;
    cursor: pointer;
    &.active {
      transition: 0.3s;
      font-weight: 700;
      color: #e0585b;
    }
    &::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 16px;
      background-color: #a8abae;
      top: 3px;
      right: -23px;
    }
    &:last-child{
      &::after{
        content: none;
      }
    }
  }
}
</style>
