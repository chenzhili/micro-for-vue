<template>
  <div class="menu">
    <div
      class="menu-item"
      v-for="(item, index) in menu"
      :key="index"
      @click="__custom__coopPer(btns, item.alias, [menuClickHandle, item])"
    >
      <img :src="item.bg" class="item-bg" />
      <div class="item-content">
        <div class="title">{{ item.title }}</div>
        <div class="sub-title">{{ item.subTitle }}</div>
        <svg-icon
          :icon-class="item.icon"
          :class-name="item.className"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import menuBg1 from "@/assets/home/menu-bg-1.png"
import menuBg2 from "@/assets/home/menu-bg-2.png"
import menuBg3 from "@/assets/home/menu-bg-3.png"
import { useRouter, useRoute } from "vue-router"
import { buttonAuth } from '@/utils/buttonAuth'

export default {
  setup (props) {
    const router = useRouter()

    const menu = [
      {
        title: "SIMULATE",
        subTitle: "模拟投资",
        bg: menuBg1,
        icon: "simulate",
        className: "icon-simulate",
        alias: "race",
        path: ""
      },
      {
        title: "TRAINING",
        subTitle: "岗位实训",
        bg: menuBg2,
        icon: "training",
        className: "icon-training",
        alias: "train",
        path: ""
      },
      {
        title: "PROFESSIONAL",
        subTitle: "从业认证",
        bg: menuBg3,
        icon: "professional",
        className: "icon-professional",
        alias: "jobcertify",
        path: ""
      }
    ]

    const menuClickHandle = item => {
      console.log(item.title)
      router.push({
        path: item.path
      })
    }

    return {
      menu,
      menuClickHandle,
      ...buttonAuth()
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  width: 880px;
  display: flex;
  justify-content: space-between;
  user-select: none;

  &-item {
    width: 280px;
    height: 150px;
    position: relative;
    cursor: pointer;
    border-radius: 9px;
    overflow: hidden;
    transition: 0.3s;

    &:hover {
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
      margin-top: -4px;
    }

    .item-bg {
      position: absolute;
      top: 0;
      left: 0;
    }

    .item-content {
      width: 100%;
      height: 100%;
      position: absolute;
      .title {
        margin: 36px 0 0 36px;
        font-size: 24px;
        font-family: Bahnschrift, Bahnschrift-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        height: 24px;
        line-height: 24px;
        letter-spacing: 1px;
      }

      .sub-title {
        margin: 12px 0 0 36px;
        font-size: 18px;
        font-family: $zh-bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        height: 24px;
        line-height: 24px;
        letter-spacing: 2px;
      }

      .svg-icon {
        position: absolute;
        right: 24px;
        bottom: 24px;

        &.icon-simulate {
          width: 61px;
          height: 47px;
        }
        &.icon-training {
          width: 32px;
          height: 53px;
        }
        &.icon-professional {
          width: 42px;
          height: 47px;
        }
      }
    }
  }
}
</style>
