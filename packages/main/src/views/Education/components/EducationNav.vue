<template>
  <div class="education-nav">
    <div class="tab-nav">
      <div class="tab-nav-contain">
        <div class="ql-icon">
          <img src="@/assets/education/ql_icon.png" alt />
          <span>乾隆教育</span>
        </div>
        <div class="tabs">
          <div @click="goPath('system')" :class="{'active-tab':curTab=='system'}">实训系统</div>
          <div
            @click="goPath('productionCoop')"
            :class="{'active-tab':curTab=='productionCoop'}"
          >产学合作</div>
          <div @click="goPath('channelsCoop')" :class="{'active-tab':curTab=='channelsCoop'}">渠道合作</div>
          <div @click="goPath('tryApply')" :class="{'active-tab':curTab=='tryApply'}">产品试用申请</div>
        </div>
        <router-link class="link-to-platform" to="/index">进入智慧云</router-link>
      </div>
    </div>
    <div class="banner">
      <el-carousel ref="carDom" height="475px">
        <el-carousel-item
          v-for="(item, index) in banner"
          :ref="`caritem${index}`"
          :key="index"
          @click="bannerClick(item)"
          :style="{'display':loading?'none':'unset'}"
        >
          <!-- <el-image style="height: 475px" :src="item.imageUrl" fit="fill"></el-image> -->
          <img :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { useRouter, routerKey } from "vue-router"
import { getPublicity } from "@/api/publicity"
import { ref, onMounted, nextTick } from "vue"
export default {
  setup () {
    const router = useRouter()
    const curTab = ref("system")
    const carDom = ref(null)
    const goPath = path => {
      if (curTab.value === path) return
      curTab.value = path
      router.push(path)
    }

    const banner = ref([])
    const loading = ref(true)

    const getBannerList = () => {
      getPublicity("jy_lb").then(res => {
        if (res.code === "000000" && res.data.length !== 0) {
          banner.value = res.data
          loading.value = false
          nextTick(() => {
            carDom.value.setActiveItem(0)
          })
        }
      })
    }

    const bannerClick = item => {
      window.open(item.linkUrl)
    }

    onMounted(() => {
      getBannerList()
    })
    return {
      goPath,
      curTab,
      banner,
      bannerClick,
      carDom,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-nav {
  z-index: 2000;
  width: 100%;
  position: fixed;
  padding: 14px 0;
  background-image: linear-gradient(to right, #1491fe, #4562ee);
  top: 0;
  .tab-nav-contain {
    width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    .ql-icon {
      display: flex;
      align-items: center;
      font-size: 20px;
      span {
        margin-left: 16px;
      }
    }
    .tabs {
      width: 470px;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      align-items: center;
      div {
        padding: 8px 18px;
        cursor: pointer;
      }
    }
    .link-to-platform {
      text-decoration: none;
      width: 120px;
      height: 42px;
      opacity: 1;
      line-height: 42px;
      text-align: center;
      background: #e0585b;
      border-radius: 4px;
      color: #ffffff;
      font-size: 18px;
    }
    .active-tab {
      box-sizing: border-box;
      color: #4361ee;
      background-color: #fff;
      border-radius: 40px;
    }
  }
}

.banner {
  width: 100%;
  height: 475px;
  border-radius: 8px;
  overflow: hidden;
}
.education-nav {
  height: 475px;
  // background-image: linear-gradient(to right, #1491fe, #4562ee);
  padding-top: 70px;
  .nav-main {
    margin-top: 69px;
    font-size: 40px;
    color: #ffffff;
    & > div {
      display: inline-block;
    }
    .left {
      margin-left: 127px;
    }
    .icon-text {
      display: flex;
      align-items: center;
      font-size: 20px;
      margin-bottom: -20px;
      &:first-child {
        margin-top: 21px;
      }
    }
    .right {
      float: right;
    }
  }
}
</style>
