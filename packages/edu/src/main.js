import './public-path'
import render, { history } from './render'
import initStoreQK, { addQKEvent, delQKEvent } from './QKStore'
import router from '@/router'

/* 此项目不在 微应用中的 时候 */
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('===============bootstartp')
}

let app

// 测试 test，实际 业务 放入 统一 的 js 文件 进行 统一 管理，根据 业务来吧，暂不处理
const test = (now, prev) => {
  console.log('测试 test 获取到的值', now, prev)
  setTimeout(() => {
    router.replace({ path: now.initRoute })
  })
}
export async function mount (props) {
  console.log('==============mount')
  // 初始化 微应用的 store 操作
  initStoreQK(props)
  // 对于 路由 初始化的 操作
  addQKEvent(test, 'initRoute')
  app = await render(props)
  // app.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange
  // app.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount () {
  console.log('==============unmount')
  delQKEvent(test, 'initRoute')
  if (app) {
    app.unmount()
    app._container.innerHTML = ''
    app = null
  }
  history && history.destroy()
}
