<template>
  <div>
    <app-nav></app-nav>
    <div class="main">
      <app-main></app-main>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppMain from "./components/AppMain.vue"
import AppNav from "./components/AppNav.vue"
import AppFooter from "./components/AppFooter.vue"

import { onMounted } from 'vue'
import { getToken } from "@/utils/auth"
import { useStore } from "vuex"

export default {
  name: "Layout",
  components: {
    AppMain,
    AppNav,
    AppFooter
  },
  setup (props) {
    const getSysConfig = () => {
      const store = useStore()
      // 获取qq，wechat，底部信息配置
      store.dispatch("sysconfig/getQQ")
      store.dispatch("sysconfig/getWechat")
      store.dispatch("sysconfig/getPlat")
      getToken() && store.dispatch('operation/setCount')
    }

    onMounted(() => {
      getSysConfig()
      document.getElementsByClassName('main')[0].style.minHeight = (window.innerHeight - 64 - 230) + 'px'
    })
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #fafafa;
  margin-top: $app-nav-height;
}
</style>
