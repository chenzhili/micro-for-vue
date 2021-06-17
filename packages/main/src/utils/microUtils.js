/**
 * 微前端 相关操作
 */
import { loadMicroApp, start, initGlobalState, registerMicroApps, runAfterFirstMounted } from 'qiankun'
import microConRoutes from '@/router/microConRoutes' // 所有 的 子应用 源信息
import store from '@/store'
import render from '@/render'

const microRoutesConfig = microConRoutes.reduce((prev, next) => {
  prev[next.name] = next.name
  return prev
}, {})

// 注入的 apps 列表 , 这里的 name 跟 microRoutesConfig 要匹配
const apps = [
  {
    name: 'race',
    entry: '//localhost:9520',
    container: '#subapp-viewport', // 尽量保持 每个 container 不一致
    // loader: (loading) => render({ loading, name: 'race' }),
    // 将 加载的 状态 存入 vuex 中控制 subApp, value
    loader: (loading) => {
      // console.log('=]===============loading', loading)
      store.dispatch('microStatus/changeLoading', { subApp: 'race', value: loading })
    },
    activeRule: '/race'
  },
  {
    name: 'vue',
    entry: '//localhost:7101',
    container: '#subapp-viewport-vue',
    // loader: (loading) => render({ loading }),
    loader: (loading) => {
      // console.log('=]===============loading', loading)
      store.dispatch('microStatus/changeLoading', { subApp: 'vue', value: loading })
    },
    activeRule: '/vue'
  }
]

// 20210603 实际 解决方式
/**
 * events 还是 需要 Map 来 做 对于 type 的 区分
 * ex: {
 *  type: new Set() // 这种方式
 * }
 */
const eventsMap = new Map() // 对于 所有的 主应用 和 子应用 通信的数据
const baseConfig = new Map() // 基本 子应用 是否 开启(处理 地址栏的操作的 拦截)以及 qiankun 启动的 状态 的 基础存储

// 初始化 内置 eventsMap, baseConfig
export const configMess = Object.freeze({
  appStart: '___app___start', // baseConfig
  childInitRoute: '___init__route' // eventsMap
})

/* 事件 */
const loadAppEvents = {
  beforeLoad: app => {
    console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
  },
  // 此 声明周期 中 搜集 依赖， 目前不需要
  beforeMount: app => {
    console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
  },
  afterMount (app) {
    // initRoute 应该 只执行 once
    // 处理 对于 输入 url 为 子应用的 某个 url 的 定向
    const initRoute = eventsMap.get(configMess.childInitRoute)
    if (initRoute.size) {
      initRoute.forEach(e => {
        e instanceof Function && e()
        delQKEvent(e, configMess.childInitRoute)
      })
    }
    // setQKState('initRoute', { initRoute: '123232323======initRoute' })
    // console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
  },
  afterUnmount: app => {
    console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
  }
}
const initState = () => ({
  user: 'qiankun'
})
/* setGlobalState 应该是解构 { ...globalState, ...curState} */
/**
 * 规定 设置 globalState 时，需要加入 type
 * onGlobalStateChange 中 获取 type 模式：
 * 1、type 为 实际 修改 的 内容，
 * 2、type 不存在 ，默认 修改 全局值 --- 没必要搞
 */
let setGlobalState, onGlobalStateChange
/* 初始化 乾坤配置 */
const initQiankunApps = () => {
  /* 内置初始化 程序 */
  eventsMap.set(configMess.childInitRoute, new Set())

  registerMicroApps(apps, loadAppEvents)
  ;({ onGlobalStateChange, setGlobalState } = initGlobalState(initState()))
  onGlobalStateChange((now, prev) => {
    const { type } = now
    console.log('=========now, prev', now === prev)
    // 如果 没有 type 字段 直接 过滤掉
    if (!type) return false
    const events = eventsMap.get(type)
    if (events instanceof Set) {
      events.forEach(e => {
        e instanceof Function && e(now, prev)
      })
    }
  })
  runAfterFirstMounted(() => {
    // console.log('[MainApp] first app mounted')
  })
}

/* 启动乾坤 */
const startQiankun = () => {
  try {
    start({ urlRerouteOnly: true })
    baseConfig.set(configMess.appStart, true)
  } catch (error) {
    console.log(error)
  }
}

const isLoadQK = () => {
  return baseConfig.get(configMess.appStart)
}

/* 操作 微应用是否 加载 的问题 */
const loadQKApp = (name) => {
  return baseConfig.set(name, name)
}
const isLoadMicroApp = name => {
  return baseConfig.get(name)
}

/* 添加 事件 */
const addQKEvent = (e, type) => {
  if (!(e instanceof Function) || !type) { return false }
  let events
  if (!(events = eventsMap.get(type))) {
    eventsMap.set(type, (events = new Set()))
  }
  events.add(e)
  return true
}
/* 删除 事件 */
const delQKEvent = (e, type) => {
  if (!type) return false
  const events = eventsMap.get(type)
  return events.delete(e)
}

/* 统一 setState 的 操作，没有 type 不允许 修改 */
const setQKState = (type, data = {}) => {
  if (!type) { return false }
  setGlobalState({
    type,
    ...data
  })
  return true
}

export { loadQKApp, isLoadMicroApp }
export { addQKEvent, delQKEvent }
export { setQKState, initQiankunApps, startQiankun, isLoadQK }

/* 20210603 日之前用  loadMicroApp 方式 有问题的额情况
  20210604 日，发现问题 是在 主应用 中的 路由 定向的问题，需要一直 定向到 return next({ path: `/${microName}` })
*/
// 存储 所有 加载 的 实例
const insConfig = new Map()
/**
 * 手动加载 微应用
 * @param {*} name // name 需要 约定 方式 --- 就是 用 route的 name 或者没有 用 fulpath
 * @param {*} param1
 * @returns
 */
const loadApp = (name, { entry, container, props = {} }) => {
  if (!name || !entry || !container) { return false }
  insConfig.set(name, loadMicroApp({
    entry, container, props
  }))
  return name
}

/* 卸载 微应用 */
const destroyApp = (name) => {
  let ins
  if ((ins = insConfig.get(name))) {
    ins.unmount()
    insConfig.delete(name)
  }
}

/* 是否存在 微应用 */
const insIsExist = (name) => {
  return insConfig.get(name)
}

/* 更新 微应用 */
const updateApp = (name) => {
  const app = insIsExist(name)
  app && (app.update instanceof Function) && app.update()
}

const startApp = () => {
  start({ urlRerouteOnly: true }) // 这里 是 在 single-spa 中 重写了 用户 pushState 和 replaceState 导致 reroute（实际 更新 所有 子应用的 状态 控制地方） 的 执行，reroute 实际 执行的 performAppChanges，会初始化 所有的 子应用 的状态 进行 变更
  insConfig.set('___app___start', true)
}

export { loadApp, destroyApp, insIsExist, updateApp, startApp }

export default microRoutesConfig
