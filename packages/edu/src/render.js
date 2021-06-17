import { createApp } from 'vue'

import App from './App.vue'

import 'element-plus/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import '@/styles/element-variables.scss'

import router, { history } from '@/router'

import store from '@/store'

import StockForVue from 'stock-for-vue'
import 'stock-for-vue/lib/index.css'

import '@/icons'

import '@/permission'

import setupGlobalFun from '@/utils/calculate'

import setupGlobalCom from '@/components'

import setupElementPlus from '@/plugins/element-plus'

import TsTable from 'vue3-t-style-table'

export default async function render (props = {}) {
  const { container } = props
  const app = createApp(App)

  /*
 * 全局注册组件、属性
 * vue3 移除了filter
 * 也可以使用Provide / Inject
 * app.provide("test1", "Vue 3 test1")
 * app.provide("test2", (a, b) => a + b)
 */

  setupGlobalFun(app) // 挂载全局运算方法 加dcmAdd 减dcmSub 乘accMul 除accDiv

  setupElementPlus(app) // 注册ElementPlus组件

  // setupVcharts(app) // 注册v-charts组件

  setupGlobalCom(app) // 注册全局公用组件

  app
    .use(router)
    .use(store)
    .use(StockForVue)
    .use(TsTable)
  await router.isReady()
  app.mount(container ? container.querySelector('#app') : '#app')
  return app
}

export { history }
