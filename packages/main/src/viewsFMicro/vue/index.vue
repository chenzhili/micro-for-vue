<template>
  <div id="subapp-viewport-vue"></div>
</template>
<script>
import { onMounted, onUnmounted } from 'vue'
import { loadApp, destroyApp, insIsExist, updateApp, startApp, startQiankun, isLoadQK, loadQKApp } from '@/utils/microUtils'
import { useRoute } from 'vue-router'
export default {
  name: 'subapp-viewport',
  setup () {
    const route = useRoute()
    // console.log(route)
    onMounted(() => {
      // startApp()
      const isStart = isLoadQK()
      loadQKApp(route.name)
      console.log('================vue', isStart)
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
  }
}
</script>
