<template>
  <router-view />
</template>

<script>
import { onMounted, provide } from "vue"
import { useRouter } from "vue-router"
import * as echarts from 'echarts'
import { addEvent, delEvent } from './QKStore'
export default {
  name: "App",
  setup () {
    provide('ec', echarts)
    const router = useRouter()

    onMounted(() => {
      window.addEventListener("offline", () => {
        console.log("已断网")
        this.$closeAllDialog()
        sessionStorage.locationUrl = window.location.href
        router.replace({ name: "networkerror" })
      })
      window.addEventListener("online", () => {
        console.log("网络已连接", sessionStorage.locationUrl)
        window.location.href = sessionStorage.locationUrl
      })
    })
  }
}
</script>
