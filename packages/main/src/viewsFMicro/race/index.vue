<template>
  <div v-if="loading">loading.................</div>
  <div id="subapp-viewport"></div>
</template>
<script>
import { onMounted, onUnmounted, watch, ref, getCurrentInstance } from 'vue'
import { loadApp, destroyApp, insIsExist, updateApp, startApp, startQiankun, isLoadQK, loadQKApp } from '@/utils/microUtils'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'subapp-viewport',
  setup () {
    const route = useRoute()
    const store = useStore()
    const loading = ref(true)
    watch(() => store.state.microStatus.race, (nv) => {
      // console.log('=============args', nv)
      loading.value = nv
    }, {
      immediate: true,
      deep: true
    })
    // console.log(route)
    onMounted(() => {
      // startApp()
      const isStart = isLoadQK()
      loadQKApp(route.name)
      // console.log('================race', isStart)
      if (!isStart) {
        startQiankun()
      }
      /*
      let microApp
      microApp = loadApp(route.name, {
        entry: '//localhost:9520',
        container: '#subapp-viewport',
        props: { brand: 'qiankun' }
      }) */
      /* microApp = insIsExist(route.name)
      if (microApp) {
        updateApp(route.name)
      } else {
        microApp = loadApp(route.name, {
          entry: '//localhost:9520',
          container: '#subapp-viewport',
          props: { brand: 'qiankun' }
        })
        startApp()
      } */
    })
    onUnmounted(() => {
      // destroyApp(microApp)
    })
    return {
      loading
    }
  }
}
</script>
