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
            <span class="label">
              {{ item.label }}
              <span v-if="needCount&&unReadCount[index]" class="un-read">{{unReadCount[index]>99?'99+':unReadCount[index]}}</span>
            </span>
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
import { ref, computed } from "vue"
import { useStore } from 'vuex'

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
    needCount: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ["tabChange"],
  setup (props, { emit }) {
    const itemClick = (child, index) => {
      emit("tabChange", { child, index })
    }
    const store = useStore()
    return {
      itemClick,
      unReadCount: computed(() => store.getters.unReadCount)
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

        &:hover{
          .indicator{
            opacity: 1;
            width: 100%;
          }
        }

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
            .un-read{
              position: absolute;
              width: 23px;
              height: 16px;
              line-height: 16px;
              background-color: #E0585B;
              border-radius: 16px;
              color: #ffffff;
              text-align: center;
              font-size: 10px;
              top: -10px;
              right: -24px;
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
}
::v-deep {
  .el-badge__content.is-fixed{
    height: 16px;
    line-height: 18px;
    // box-sizing: border-box;
    font-size: 10px;
    top: 2px;
  }
}
</style>
