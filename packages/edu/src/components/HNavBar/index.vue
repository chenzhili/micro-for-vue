<template>
  <div class="horizontal-nav">
    <div class="top">
      <div class="left">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="nav-item"
          @click="itemClick(item, index)"
        >
          <div class="label-area">
            <span class="label">{{ item.label }}<span class="tag" v-if="hintIndex.includes(index)"></span></span>
          </div>
          <span
            class="indicator"
            v-if="indicator"
            :class="{ active: index === activeIndex, animation: animation }"
          ></span>
        </div>
      </div>
      <div class="right">
        <slot name="suffix"></slot>
      </div>
    </div>
    <div class="bottom">
      <slot name="subNav"></slot>
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
    hintIndex: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    indicator: {
      type: Boolean,
      default: () => true
    },
    animation: {
      type: Boolean,
      default: () => true
    }
  },
  setup (props, { emit }) {
    const itemClick = (child, index) => {
      emit("tabChange", index)
    }

    return {
      itemClick
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal-nav {
  display: flex;
  flex-direction: column;
  width: 878px;
  background-color: #ffffff;
  border: 1px solid $divide-line-color;
  border-radius: 9px;

  .top {
    display: flex;
    height: 62px;
    align-items: center;
    justify-content: space-between;
    .left {
      flex: 1;
      display: flex;
      .nav-item {
        height: 62px;
        padding: 0 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        user-select: none;

        .label-area {
          flex: 1;
          display: flex;
          align-items: center;

          .label {
            font-size: 16px;
            font-weight: 400;
            text-align: left;
            color: $primary-text-color;
            position: relative;
            .tag {
              position: absolute;
              top: -2px;
              right: -6px;
              width: 6px;
              height: 6px;
              background: $primary-light-color;
              border-radius: 50%;
            }
          }
        }
        .indicator {
          height: 2px;
          width: 0;
          background-color: $primary-light-color;
          opacity: 0;
          &.animation {
            transition: 0.2s;
          }
          &.active {
            opacity: 1;
            width: 100%;
          }
        }
      }
    }

    .right {
      margin: 0 24px;
      cursor: pointer;
    }
  }

  .bottom {
    // border-top: 1px solid $divide-line-color;
  }
}
</style>
