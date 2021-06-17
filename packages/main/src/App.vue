<template>
  <router-view />
  <loginDialog :visible="loginModal" @changeVisible="closeLoginDig"></loginDialog>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import loginDialog from "@/views/Login/component/loginDialog"

export default {
  name: 'App',
  components: {
    loginDialog
  },
  setup () {
    /* 游客 的 初始化 */
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const customVisit = async () => {
      await store.dispatch('user/login', { isVisitor: true })
      await store.dispatch('user/changeVisited', true)
      router.replace(route.fullPath)
    }
    onMounted(() => {
      if (!store.getters.visited && !store.getters.token) {
        console.log('======游客进来了')
        customVisit()
      }
    })
    const closeLoginDig = () => {
      store.dispatch('user/changeLoginModal', false)
    }
    const loginModal = computed(() => store.getters.loginModal)
    return {
      loginModal,
      closeLoginDig
    }
  },
  mounted () {
    const router = useRouter()
    window.addEventListener('offline', () => {
      console.log('已断网')
      this.$closeAllDialog()
      sessionStorage.locationUrl = window.location.href
      router.replace({ name: 'networkerror' })
    })
    window.addEventListener('online', () => {
      console.log('网络已连接', sessionStorage.locationUrl)
      window.location.href = sessionStorage.locationUrl
    })
  }
}
</script>
