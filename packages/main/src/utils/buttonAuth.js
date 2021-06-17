import { ref, watch } from "vue"
import { useStore } from 'vuex'
import { useRoute } from "vue-router"

export const buttonAuth = () => {
  const store = useStore()
  const route = useRoute()

  const curRouteBtns = typeof route.meta.btns === 'object' ? route.meta.btns : {}
  const btns = ref(curRouteBtns)

  // 修正 btns 不是 及时性的 问题
  watch(store.state.permission.btns, v => {
    console.log('store.permission.btns', v)
    const newBtns = v[route.matched[0].name] || []
    const routeKeys = Array.isArray(route.meta.btns) ? route.meta.btns : []
    if (newBtns.length !== routeKeys.length) {
      btns.value = newBtns
    }
  }, {
    deep: true,
    immediate: true
  })

  return {
    btns
  }
}
