<template>
  <div class="app-nav">
    <div class="header-content">
      <div class="app-logo" @click="logoClickHandle">
        <svg-icon icon-class="nav-logo"></svg-icon>
      </div>
      <div class="menu">
        <div
          v-for="(item, index) in navList"
          :key="index"
          class="menu-item"
          :class="{ active: index === activeIndex }"
          @click="
            __custom__coopPer(btns, item.name, [navClickHandle, item, index])
          "
        >{{ item.label }}</div>
      </div>
      <div class="login" v-if="!token">
        <div class="login-btn" @click="toLogin">登录/注册</div>
      </div>
      <div class="account" v-else>
        <div class="message" @click="__custom__coopPer(btns, 'message', [messageClickHandle])">
          <svg-icon icon-class="nav-message"></svg-icon>
          <span
            v-if="unReadCount['0']"
            class="un-read"
          >{{unReadCount['0']>99?'99+':unReadCount['0']}}</span>
        </div>
        <el-dropdown trigger="click">
          <div class="avtar">
            <el-image :src="avatar || headerImage"></el-image>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="avtarClickHandle">个人中心</el-dropdown-item>
              <el-dropdown-item divided @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import headerImage from "@/assets/person/touxiang.png"
import ConfirmDialog from "@/plugins/dialog/ConfirmDialog"
import { buttonAuth } from "@/utils/buttonAuth"
import { ElMessage } from "element-plus"
import { getBasicInfo } from "@/utils/auth"

export default {
  setup (props) {
    const activeIndex = ref(0)
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const navList = ref([
      { label: "首页", path: "/", name: "home_index" },
      { label: "模拟投资", path: "/race", name: "race" },
      { label: "职业教育", path: "/vue", name: "train" },
      { label: "从业认证", path: "", name: "jobcertify" },
      { label: "校园招聘", path: "", name: "campusjob" },
      { label: "乾隆教育", path: "/education", name: "education" }
    ])

    const navClickHandle = (item, index) => {
      // 跳转页面
      console.log(item)
      activeIndex.value = index
      if (item.path) {
        if (item.name === "education") {
          window.open("http://testweb.qlzhy.com/education/system")
        } else if (item.name === 'race') {
          // window.open('/race')
          router.push({
            path: item.path
          })
        } else if (item.name === 'train') {
          router.push({
            path: item.path
          })
        } else {
          router.push({
            path: item.path
          })
        }
      }
    }
    console.log("=============", route)
    const logoClickHandle = () => {
      if (route.fullPath !== "/index") {
        // 在public/static/config/url-config.js里配置
        window.location.href = window.config.webSiteUrl
      }
    }
    const messageClickHandle = () => {
      if (!route.fullPath.includes("message")) {
        router.push({
          name: "message"
        })
      }
    }
    const avtarClickHandle = () => {
      if (!route.fullPath.includes("personalCenter")) {
        router.push({
          path: "/personalCenter"
        })
      }
    }
    const toLogin = () => {
      router.push({
        path: "/login"
      })
    }

    const loginOut = () => {
      ConfirmDialog({
        message: "是否退出登录？",
        showClose: false
      }).then(() => {
        store.dispatch("user/logout").then(res => {
          ElMessage({
            message: "退出登录成功！",
            type: "success"
          })
          router.replace("/")
        })
      })
    }

    return {
      activeIndex,
      navList,
      navClickHandle,
      logoClickHandle,
      messageClickHandle,
      avtarClickHandle,
      toLogin,
      loginOut,
      token: computed(() => store.getters.token),
      userId: computed(() => store.getters.userId),
      avatar: computed(() => getBasicInfo().portrait),
      nickName: computed(() => store.getters.nickName),
      unReadCount: computed(() => store.getters.unReadCount),
      headerImage: headerImage,
      ...buttonAuth()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-nav {
  width: 100%;
  height: $app-nav-height;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  user-select: none;

  .header-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .app-logo {
      height: $app-nav-height;
      display: flex;
      align-items: center;
      cursor: pointer;
      .svg-icon {
        width: 147px;
        height: 37px;
      }
    }
    .menu {
      display: flex;
      &-item {
        height: $app-nav-height;
        line-height: $app-nav-height;
        padding: 0 24px;
        font-size: 18px;
        font-weight: bold;
        background-color: #ffffff;
        color: $primary-text-color;
        cursor: pointer;
        &.active {
          background-color: $primary-light-color;
          color: #ffffff;
          transition: background-color 0.3s;
          &:hover{
            color: #ffffff;
          }
        }
        &:hover{
          color: $primary-light-color;
          transition: color 0.3s;
        }
      }
    }
    .login {
      height: $app-nav-height;
      display: flex;
      align-items: center;
      &-btn {
        width: 76px;
        height: 28px;
        line-height: 28px;
        background: $primary-light-color;
        border-radius: 2px;
        color: #ffffff;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;

        &:hover {
          background: $primary-dark-color;
        }
      }
    }
    .account {
      height: $app-nav-height;
      display: flex;
      align-items: center;
      .message {
        position: relative;
        margin-right: 32px;
        .svg-icon {
          width: 16px;
          height: 20px;
          padding: 5px;
          cursor: pointer;
        }
        .un-read {
          position: absolute;
          width: 23px;
          height: 16px;
          line-height: 16px;
          background-color: #e0585b;
          border-radius: 16px;
          color: #ffffff;
          text-align: center;
          font-size: 10px;
          top: -3px;
          right: -17px;
        }
      }
      .avtar {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        overflow: hidden;
        background-color: #fae6e7;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
