<template>
  <div class="float">
    <div class="btn box-shadow" v-for="(item, index) in floatAd" :key="index">
      <el-image :src="item.imageUrl" @click="floatAdClick(item)"></el-image>
    </div>
    <div class="btn-group box-shadow">
      <el-popover placement="left" :width="100" trigger="hover">
        <template #reference>
          <div class="btn-group-item">
            <svg-icon class-name="group" icon-class="group"></svg-icon>
            <div class="group-text">交流群组</div>
          </div>
        </template>
        <img src="@/assets/home/test.png" />
      </el-popover>

      <div
        class="btn-group-item"
        v-for="(item,index) in iconList"
        :key="index"
        @mouseover="iconChange('in',index)"
        @mouseout="iconChange('out',index)"
      >
        <svg-icon :class-name="item" :icon-class="activeIcon===index?item+'_active':item"></svg-icon>
      </div>
    </div>
    <transition name="fade-in-linear">
      <div class="top box-shadow" @click="toTop" v-show="show" @mouseover="upIcon='chevron-up_active'"
        @mouseout="upIcon='chevron-up'">
        <svg-icon :icon-class="upIcon"></svg-icon>
        <span class="text">顶部</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { getPublicity } from "@/api/publicity"

export default {
  setup (props) {
    const show = ref(false)

    const floatAd = ref([])

    const scroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > 200) {
        show.value = true
      } else {
        show.value = false
      }
    }

    const toTop = () => {
      const timer = setInterval(() => {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        const speed = Math.ceil(scrollTop / 5)
        document.documentElement.scrollTop = scrollTop - speed
        if (scrollTop === 0) {
          clearInterval(timer)
        }
      }, 20)
    }

    // 获取插屏广告
    const getFloatAd = () => {
      getPublicity("sy_xf").then(res => {
        if (res.code === "000000" && res.data.length !== 0) {
          floatAd.value = res.data
        }
      })
    }

    const floatAdClick = item => {
      if (item.linkUrl) {
        window.open(item.linkUrl)
      }
    }

    const resizeHandler = () => {
      document.getElementsByClassName("float")[0].style.right =
        (window.innerWidth - 1200) / 2 - 94 + "px"
    }

    const iconList = ref(["phone", "wechat", "message"])
    const activeIcon = ref()

    const iconChange = (type, index) => {
      if (type === "in") {
        activeIcon.value = index
      } else {
        activeIcon.value = ""
      }
    }

    onMounted(() => {
      getFloatAd()
      document.getElementsByClassName("float")[0].style.right =
        (window.innerWidth - 1200) / 2 - 94 + "px"
      window.addEventListener("scroll", scroll)
      window.addEventListener("resize", resizeHandler)
    })

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", scroll)
      window.removeEventListener("resize", resizeHandler)
    })

    return {
      show,
      toTop,
      floatAd,
      floatAdClick,
      iconList,
      iconChange,
      activeIcon,
      upIcon: ref('chevron-up')
    }
  }
}
</script>

<style scoped lang="scss">
$com_width: 58px;

.float {
  position: fixed;
  top: 242px;
  right: 0;
  width: $com_width;
  user-select: none;

  .box-shadow {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
  }

  .btn {
    width: $com_width;
    height: 100px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 6px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .btn-group {
    margin-bottom: 6px;
    background-color: #ffffff;
    border-radius: 6px;

    &-item {
      width: $com_width;
      height: 52px;
      border-bottom: 1px solid $divide-line-color;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        .svg-icon use svg .a {
          fill: red;
        }
      }

      &:first-child {
        height: 80px;
        flex-direction: column;

        .group {
          width: 38px;
          height: 26px;
        }
        .group-text {
          font-size: 12px;
          font-weight: 400;
          color: $primary-text-color;
          height: 16px;
          line-height: 16px;
          margin-top: 6px;
        }
      }

      &:last-child {
        border-bottom: none;
      }

      .phone {
        width: 19px;
        height: 27px;
      }
      .wechat {
        width: 24px;
        height: 19px;
      }
      .message {
        width: 21px;
        height: 21px;
      }
    }
  }

  .top {
    width: $com_width;
    height: $com_width;
    background: #ffffff;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover{
      .text{
        color: #E0585B;
      }
    }
    .svg-icon {
      width: 18px;
      height: 10px;
      margin-top: 13px;
    }
    .text {
      font-size: 12px;
      font-weight: 400;
      color: $deputy-text-color;
      margin-top: 6px;
    }
  }
}
</style>
