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
          @mouseenter="navHover(item)"
          @mouseleave="navLeav()"
          @click="navClickHandle(item, index)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="login" v-if="false">
        <div class="login-btn" @click="$router.push('/login')">登录/注册</div>
      </div>
      <div class="account">
        <div class="message" @click="messageClickHandle">
          <svg-icon icon-class="nav-message"></svg-icon>
          <div class="tag"></div>
        </div>
        <div class="avtar" @click="avtarClickHandle"></div>
      </div>
      <div class="edu-modal" :style="aniStyles" @mouseleave="navLeav()" @mouseenter="navHover({value: 'edu'})">
        <div class="edu-modal-menu" v-for="(item, i) in eduNav" :key="i">
          <span class="edu-m-title edu-item">{{item.title}}</span>
          <span class="edu-item" v-for="(cItem, ci) in item.children" :key="ci" :class="`${i}-${ci}` === eduAI ? 'active' : ''" @click="changeEduI(i, ci)">
            {{cItem.title}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue"
import { useRouter, useRoute } from "vue-router"

export default {
  setup (props) {
    const activeIndex = ref(0)
    const route = useRoute()
    const router = useRouter()

    /* 智慧云相关 */
    const eduAI = ref('0-0')
    const eduModal = ref(0)
    const changeEduI = (i, ci) => {
      const result = `${i}-${ci}`
      eduAI.value !== result && (eduAI.value = result)
    }
    const navHover = (item) => {
      const { value } = item
      if (value !== 'edu') return
      eduModal.value = 1
    }
    const navLeav = () => {
      eduModal.value = 0
    }
    const aniStyles = computed(() => {
      const bool = eduModal.value === 1
      return {
        padding: bool ? '10px 24px' : 0,
        opacity: bool ? 1 : 0,
        width: bool ? '100%' : 0,
        height: bool ? 'auto' : 0,
        left: bool ? 0 : '300px',
        position: bool ? 'absolute' : 'fixed'
      }
    })

    /* 菜单 */
    const navList = ref([
      { label: "首页", path: "", value: 'index' },
      { label: "模拟投资", path: "", value: 'edu' },
      { label: "岗位实训", path: "", value: '' },
      { label: "从业认证", path: "", value: '' },
      { label: "校园招聘", path: "", value: '' },
      { label: "乾隆教育", path: "/education" }
    ])
    /* 模拟投资相关 */
    const eduNav = [{
      title: '教育通道',
      children: [{
        title: '我的竞赛',
        value: ''
      }, {
        title: '我的练习',
        value: ''
      }, {
        title: '我的账户',
        value: ''
      }]
    }, {
      title: '业务办理',
      children: []
    }]

    const navClickHandle = (item, index) => {
      // 跳转页面
      activeIndex.value = index
      router.push({
        path: item.path
      })
    }

    const logoClickHandle = () => {
      if (route.fullPath !== "/index") {
        // 在public/static/config/url-config.js里配置
        window.location.href = window.config.webSiteUrl
      }
    }
    const messageClickHandle = () => {
      if (route.fullPath !== "/message") {
        router.push({
          path: "/message"
        })
      }
    }
    const avtarClickHandle = () => {
      if (route.fullPath !== "/personalCenter") {
        router.push({
          path: "/personalCenter"
        })
      }
    }

    const toLogin = () => {
      router.replace({
        path: "/login",
        query: { redirect: encodeURIComponent(route.fullPath) }
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
      // 智慧云相关
      eduNav,
      eduAI,
      changeEduI,
      navHover,
      eduModal,
      navLeav,
      aniStyles
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
    position:relative;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .edu-modal{
      position:fixed;
      bottom:0;
      left: 300px;
      font-size:16px;
      transform: translateY(100%);
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
      background:#fff;
      opacity: 0;
      width: 0;
      height:0;
      transition: all .2s;
      .edu-modal-menu{
        display:flex;
        align-items:center;
        font-size:16px;
        color:rgba(34,34,34,1);
        padding: 23px 0;
        &:not(:last-child){
          border-bottom:1px solid #ebebeb;
        }
        .edu-item{
          cursor: pointer;
          margin-right:24px;
          &.active, &:hover:not(:first-child){
            color:$primary-light-color;
          }
        }
        .edu-m-title{
          color:rgba(141,141,141,1);
        }
      }
    }
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
        font-weight: 400;
        background-color: #ffffff;
        color: $primary-text-color;
        cursor: pointer;
        &.active {
          background-color: $primary-light-color;
          color: #ffffff;
          transition: background-color 0.3s;
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
        .tag {
          position: absolute;
          top: 2px;
          right: 0;
          width: 6px;
          height: 6px;
          background: $primary-light-color;
          border-radius: 50%;
        }
        .svg-icon {
          width: 16px;
          height: 20px;
          padding: 5px;
          cursor: pointer;
        }
      }
      .avtar {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        overflow: hidden;
        background-color: #fae6e7;
        cursor: pointer;
      }
    }
  }
}
</style>
