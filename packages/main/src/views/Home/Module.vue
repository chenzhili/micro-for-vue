<template>
  <div
    class="module"
    :class="{ 'no-tab': tab.length === 0 }"
  >
    <div class="name">
      <div class="title">{{ zh }}</div>
      <div class="sub">{{ en }}</div>
      <img
        class="icon"
        v-if="show"
        src="@/assets/home/module-icon.png"
      />
      <img
        :class="'img-' + en.toLowerCase()"
        :src="img"
      />
    </div>
    <div class="content">
      <div
        class="header"
        v-if="tab.length !== 0"
      >
        <div class="nav-tab">
          <div
            class="nav-tab-item"
            :class="{ active: index === tabActiveIndex, animation: animation }"
            v-for="(item, index) in tab"
            :key="index"
            @click="itemClick(item, index)"
          >
            <div class="label">{{ item.label }}</div>
            <div class="indicator"></div>
          </div>
        </div>
        <div
          class="more"
          v-if="type === 'ACTIVITIES'"
          @click="$emit('moreCallback')"
        >
          <span>MORE</span>
          <div class="icon-group">
            <svg-icon
              class-name="more-right"
              icon-class="more-right"
            ></svg-icon>
            <svg-icon
              class-name="more-right"
              icon-class="more-right"
            ></svg-icon>
            <svg-icon
              class-name="more-right"
              icon-class="more-right"
            ></svg-icon>
          </div>
        </div>
      </div>
      <div class="grid">
        <div
          class="grid-item"
          :class="{
            'none-right-border': (index + 1) % 3 === 0,
            'none-bottom-border': index > 2,
          }"
          v-for="(item, index) in data"
          :key="index"
        >
          <slot
            name="grid"
            :item="item"
            :$index="index"
          ></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moduleImg1 from "@/assets/home/module-img-1.png"
import moduleImg2 from "@/assets/home/module-img-2.png"
import moduleImg3 from "@/assets/home/module-img-3.png"
import { ref, computed } from "vue"

const TYPE = {
  ACTIVITIES: { zh: "活动", en: "ACTIVITIES", show: false, img: moduleImg1 },
  ABILITIES: { zh: "岗位能力", en: "ABILITIES", show: true, img: moduleImg2 },
  PROFESSIONAL: {
    zh: "从业考证",
    en: "PROFESSIONAL",
    show: true,
    img: moduleImg3
  }
}

export default {
  props: {
    // 这个暂时没有用到
    alias: {
      type: String,
      default: "race"
    },
    type: {
      type: String,
      default: "ACTIVITIES"
    },
    tab: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    animation: {
      type: Boolean,
      default: () => true
    }
  },
  setup (props, { emit }) {
    const tabActiveIndex = ref(0)

    const itemClick = (child, index) => {
      tabActiveIndex.value = index
      emit("tabChange", index)
    }

    return {
      tabActiveIndex,
      itemClick,
      zh: computed(() => TYPE[props.type].zh),
      en: computed(() => TYPE[props.type].en),
      show: computed(() => TYPE[props.type].show),
      img: computed(() => TYPE[props.type].img)
    }
  }
}
</script>

<style scoped lang="scss">
.module {
  width: 880px;
  height: 376px;
  background-color: #ffffff;
  display: flex;
  border-radius: 9px;
  overflow: hidden;

  &.no-tab {
    height: 341px;
  }

  .name {
    width: 130px;
    height: 100%;
    background-color: #edeef2;
    border-radius: 9px 0 0 9px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    user-select: none;

    .title {
      font-size: 20px;
      font-weight: 500;
      text-align: center;
      color: $primary-text-color;
    }

    .sub {
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: $gray-text-color;
      margin-top: 8px;
    }
    .icon {
      margin-top: 33px;
      width: 90px;
      height: 26px;
    }
    .img-activities {
      width: 130px;
      height: 197px;
      margin-top: 9px;
    }
    .img-abilities {
      width: 130px;
      height: 180px;
      margin-top: 6px;
    }
    .img-professional {
      width: 130px;
      height: 199px;
      margin-top: 22px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    border-radius: 0 9px 9px 0;
    overflow: hidden;
    border: 1px solid $divide-line-color;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px 0 20px;
      height: 56px;
      border-bottom: 1px solid #f1f1f1;
      .nav-tab {
        display: flex;
        height: 100%;
        &-item {
          padding: 18px 18px 0 18px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;

          .label {
            font-size: 16px;
            font-weight: 400;
            color: $primary-text-color;
          }

          .indicator {
            width: 0;
            height: 2px;
            margin-top: 7px;
            opacity: 0;
            background-color: $primary-light-color;
          }

          &:hover {
            .label {
              color: $primary-light-color;
            }
          }

          &.active {
            .label {
              color: $primary-light-color;
            }
            .indicator {
              width: 24px;
              opacity: 1;
            }
          }

          &.animation {
            .label,
            .indicator {
              transition: 0.2s;
            }
          }
        }
      }
      .more {
        font-size: 12px;
        font-weight: 400;
        color: $gray-text-color;
        padding: 16px 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        overflow: hidden;

        &:hover {
          .icon-group {
            transition: 0.6s;
            transform: translateX(40px);
            .more-right {
              opacity: 1;
              transition-delay: 0.1s;
              &:first-child {
                opacity: 1;
                transition-delay: 0.3s;
              }
              &:last-child {
                opacity: 0;
                transition-delay: 0.1s;
              }
            }
          }
        }
        .icon-group {
          width: 20px;
          height: 20px;
          position: relative;
          .more-right {
            width: 20px;
            height: 20px;
            opacity: 0;
            position: absolute;
            left: -20px;
            &:first-child {
              position: absolute;
              left: -40px;
              top: 0;
              opacity: 0;
            }
            &:last-child {
              position: absolute;
              left: 0;
              top: 0;
              opacity: 1;
            }
          }
        }
      }
    }
    .grid {
      display: grid;
      flex: 1;
      grid-template-columns: 33.33% 33.33% 33.33%;
      grid-template-rows: 50% 50%;
      &-item {
        border-bottom: 1px solid #f1f1f1;
        border-right: 1px solid #f1f1f1;
        cursor: pointer;
        // &:hover {
        //   box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
        // }
        &:active {
          background: linear-gradient(180deg, #ffffff, #fafafa);
        }
        &.none-right-border {
          border-right: none;
        }
        &.none-bottom-border {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
