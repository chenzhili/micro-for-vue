<template>
  <div class="horizontal-nav" :style="{height:height+'px',lineHeight:height+'px'}">
    <div class="top">
      <div class="left">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="nav-item"
          @click="itemClick(item, index)"
        >
          <div class="label-area">
            <span
              class="label"
              :class="{ active: index === activeIndex, animation: animation }"
              >{{ item.label
              }}<span class="tag" v-if="hintIndex.includes(index)"></span
            ></span>
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
    },
    height: {
      type: Number,
      default: 40
    }
  },
  setup (props, { emit }) {
    const itemClick = (child, index) => {
      emit("tabChange", { child, index })
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
  width: 100%;
  background-color: #ffffff;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      flex: 1;
      display: flex;
      .nav-item {
        padding: 0 60px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        user-select: none;
        position: relative;

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
            &.animation {
              transition: 0.2s;
            }
            &.active {
              color: $primary-light-color;
            }
            &:hover{
              color: $primary-light-color;
            }
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
          margin-top: -2px;
          height: 2px;
          width: 100%;
          bottom: 0;
          background-color: $primary-light-color;
          opacity: 0;
          &.animation {
            transition: 0.2s;
          }
          &.active {
            opacity: 1;
          }
        }
      }
    }

    .right {
      cursor: pointer;
    }
  }
}
</style>
