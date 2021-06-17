import { createApp } from 'vue'

import App from './App.vue'

import 'element-plus/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import '@/styles/element-variables.scss'

import router from '@/router'

import store from '@/store'

import '@/icons'

import '@/permission'

import setupGlobalFun from '@/utils/calculate'

import setupGlobalCom from '@/components'

import setupElementPlus from '@/plugins/element-plus'

import setupGlobalDialog from '@/plugins/dialog'

/* 指令引入 */
import { installLoadmore, installPullmore } from '@/directives/index'

// 全局混入 mixins
import { coopPer } from '@/utils'

const vueRender = async ({ loading }) => {
  console.log('loading', loading)
  const app = createApp(App, { loading })

  installLoadmore(app)
  installPullmore(app)

  /*
 * 全局注册组件、属性
 * vue3 移除了filter
 * 也可以使用Provide / Inject
 * app.provide("test1", "Vue 3 test1")
 * app.provide("test2", (a, b) => a + b)
 */
  app.provide("test1", "Vue 3 test1")
  app.provide("test2", (a, b) => a + b)

  setupGlobalFun(app) // 挂载全局运算方法 加dcmAdd 减dcmSub 乘accMul 除accDiv

  setupElementPlus(app) // 注册ElementPlus组件

  setupGlobalDialog(app) // 注册自定义弹窗

  setupGlobalCom(app) // 注册全局公用组件

  app
    .mixin({
      methods: {
        __custom__coopPer: coopPer
      }
    })
    .use(router)
    .use(store)

  await router.isReady()
  app.mount('#app')
  return app
  // router.isReady().then(() => app.mount('#app'))
}

let app = null

export default function render ({ loading }) {
  console.log('loading', loading)

  if (!app) {
    app = vueRender({ loading })
  } else {
    app.loading = loading
  }
}
