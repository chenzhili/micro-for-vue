import router, { constantRoutes } from "@/router"
import { getToken } from "@/utils/auth"
import getPageTitle from "@/utils/get-page-title"
import { messTServer } from "@/api/account/login"

import store from "@/store"
import qs from "qs"

// 微前端 项目的 路由 钩子的 处理
import microRoutesConfig, { insIsExist, isLoadMicroApp, setQKState, addQKEvent, configMess } from '@/utils/microUtils'

const whiteList = ["/login"]

async function dealPermission (router, token, next, to, from) {
  const permission = store.getters.permissions
  if (!(permission instanceof Array) || permission.length === 0) return next()
  const { asyncRoutes } = await store.dispatch("permission/generateRoutes", {
    permissions: permission,
    token
  })
  // 操作权限放入 对应的 router,为了 不在 每次都放入 对应的 操作权限，需要做判断
  if (!to.meta || !to.meta.hasBP) {
    to.meta = to.meta || {}
    to.meta.hasBP = true
    // 实际的权限
    // console.log(store.getters.btns)
    // 需要 做操作权限的合并
    const selfCoops = store.getters.btns[to.name] || []
    const parentCoops = store.getters.btns[to.matched[0].name] || []
    to.meta = {
      ...to.meta,
      get btns () {
        return [...selfCoops, ...parentCoops]
      }
    }
  }

  if (asyncRoutes.length > 0) {
    const realRoute = router.options.routes
    asyncRoutes.forEach(route => {
      if (route.parentName) {
        const i = realRoute.findIndex(item => item.name === route.parentName)
        if (i > -1) {
          realRoute[i].children = realRoute[i].children || []
          realRoute[i].children.push(route)

          router.addRoute(route.parentName, route)
        }
      } else {
        realRoute.push(route)
        router.addRoute(route)
      }
    })
    router.options.routes = [...realRoute]
  }
  /* 存储异步路由path */
  if (asyncRoutes.some(item => to.fullPath.indexOf(item.path) > -1)) {
    next({ path: to.fullPath })
  } else {
    next()
  }
}

router.beforeEach(async (to, from, next) => {
  // 为了解决 走入 未知区域 回到首页，现在就有问题了，由于 micro 这层 会有 子项目路由
  /* console.log("to.matched", to.matched)
  if (to.matched.length === 0) {
    return next({ path: "/index" })
  } */
  /*
    这里证明 没有匹配上 当前的 主 项目的 路由
    目前 业务上 只会 是在 以及 路由上 嵌入 自应用
    1、区分 是否 包含 微应用的 name，不包含就返回到 /index；
    2、如果是，查看 是否 加载过微应用，加载过，跳过
    3、未加载，重定向到 微应用 加载 入口
  */
  if (to.matched.length === 0) {
    const routesArr = to.fullPath.split('/')
    const microName = routesArr[1]

    if (microName) {
      // 是否在 微应用中
      if (microRoutesConfig[microName]) {
        if (!isLoadMicroApp(microName)) {
          // 这里有个问题，就是 在得到除了 默认 路由的其他路由，如何处理
          // 在 路由导航 发生的时候，qiankun 应用 并没有 加载 成功，延迟加载
          console.log('是不是 第一次?')
          // 这个 执行 once
          addQKEvent(() => {
            // 20210604 --- 初始化 的 路由 只会 存在一个，这里需要 传入 格式 { initRoute }，加载 微应用的时候 已经 代表 自己是谁了
            setQKState('initRoute', { initRoute: `/${routesArr.slice(2).join('/')}` })
          }, configMess.childInitRoute)
        }
        // 20210604 ======用 loadApp 这种方式 应该也是可以的，后面实现哈
        // 这里 当 证明 是 微应用的 路由的 时候，就 一直 定向到这里
        return next({ path: `/${microName}` })
      } else {
        return next({ path: '/' })
      }
    }
    return
  }

  document.title = getPageTitle(to.meta.title)
  // 微信登录
  const parseUrl = qs.parse(window.location.href.split("?")[1])
  // 首先拿到当前路由地址
  // console.log(parseUrl)
  let rejectWx = false
  // 这一步就是第二步所说的存在本地的验证码的信息，这里的操作就是如果有验证码并且有微信回调的code,那就进入当前的页面，如果没有那就进入正常的路由
  const wxCodeUrl = localStorage.getItem("QRCODEWX")
  if (wxCodeUrl == null) {
    rejectWx = false
  } else {
    if (parseUrl.code && parseUrl.state) {
      rejectWx = true
    } else {
      rejectWx = false
    }
  }
  let token = getToken()
  if (store.getters.token !== token) {
    token = null
  }
  console.log("token", token)
  if (
    (token || store.state.user.visited) &&
    constantRoutes.length === router.options.routes.length
  ) {
    await dealPermission(router, token, next, to, from)
  } else {
    if (!to.meta || !to.meta.hasBP) {
      to.meta = to.meta || {}
      to.meta.hasBP = true
      // 实际的权限
      // console.log(store.getters.btns)
      const selfCoops = store.getters.btns[to.name] || []
      const parentCoops = store.getters.btns[to.matched[0].name] || []
      to.meta = {
        ...to.meta,
        get btns () {
          return [...selfCoops, ...parentCoops]
        }
      }
    }
    next()
  }
})

router.afterEach((to, from, failure) => {
  const token = getToken()
  /* 埋点 */
  token && messTServer({ page: to.fullPath })
})
