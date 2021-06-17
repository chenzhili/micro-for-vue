import router from "@/router"
import { getToken } from "@/utils/auth"

import store from "@/store"

const whiteList = ["/login"]

router.beforeEach(async (to, from, next) => {
  // debugger
  /* 如果 路由 地址 未 匹配上 就 不做 操作 */
  if (to.matched.length === 0) {
    return next({ path: '/' })
  }/*  else { // 由于 子项目中 对于 主项目上 导航守卫的 处理，对于 在 导航不是子路由的情况
    const existItem = to.matched.filter(item => to.fullPath === item.path)[0]
    debugger
    if (existItem && Array.isArray(existItem.children) && existItem.children.length) {
      return next({ path: `${to.fullPath}/aStocksDeal` })
    }
  } */
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" })
    } else {
      const hasRoles = true
      if (hasRoles) {
        next()
      } else {
        // 添加路由
        // router.addRoutes()
        next({ ...to, replace: true })
      }
    }
  } else {
    next()
    /* 没有token */
    // if (whiteList.indexOf(to.path) !== -1) {
    //   next();
    // } else {
    //   next(`/login?redirect=${to.path}`);
    // }
  }
})
// router.beforeResolve(async to => {
//   console.log('===================to', to)
// })
// router.afterEach(() => {})
