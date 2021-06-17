<template>
  <div class="head">
    <div class="left" :style="fStyle">
      <div class="tabs">
        <div
          class="tab"
          v-for="(item, index) in tabs"
          :key="index"
          :class="{
            active: activeValue === item.value,
            one: tabs.length === 1
          }"
          @click="toggle(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="right" :style="rStyle"><slot name="tool"></slot></div>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  props: {
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    },
    fStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props, { emit }) {
    const activeValue = ref(0)
    const toggle = e => {
      activeValue.value = e.value
      emit("tabChange", e)
    }

    return {
      activeValue,
      toggle
    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  height: 89px;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  .left {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #a8abae;
    .tabs {
      display: flex;
      .tab {
        border-right: 1px solid #a8abae;
        padding-right: 10px;
        margin-right: 10px;
        height: 21px;
        cursor: pointer;
        &:nth-last-child(1) {
          border-right: none;
        }
        &.active {
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          color: #e0585b;
        }
        &.one {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: left;
          color: #222222;
        }
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
