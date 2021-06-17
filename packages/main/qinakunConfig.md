# 基本的 qiankun 背景 [官网地址](https://qiankun.umijs.org/zh)

>## qiankun 主要 集成 了 single-spa 和 import-html-entry，在此 基础上 进行了二次封装
---
>## 分别地作用
1. single-spa 主要 负责 子应用的 加载 以及 状态管理
2. import-html-entry 主要是 对于在 html 中 抽出 对应的 document 文档 引入的 css 和 js 的 提取相关
---
>## 对比 single-spa的 优势
* ### 1. 样式隔离问题
* ### 2. JS 隔离
* ### 3. 资源预加载
* ### 4. 应用间通信

> ## qiankun 的 配置步骤

* ### 主应用配置
* ### 1. 注册 子应用 列表
```js

import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:3000',
    container: '#container',
    activeRule: '/app-react',
  },
  {
    name: 'vueApp',
    entry: '//localhost:8080',
    container: '#container',
    activeRule: '/app-vue',
  },
  {
    name: 'angularApp',
    entry: '//localhost:4200',
    container: '#container',
    activeRule: '/app-angular',
  },
]);

```
* ### 2. 在 准备好 挂载 根节点后，可以 挂载，挂载 使用 start
```js

import { registerMicroApps, start } from 'qiankun';
start({ urlRerouteOnly: true }) // 注意 这里的 urlRerouteOnly，这是 single-spa中 为了 不走 reroute 方法 而 设置的

```
* ### 3. 配置 主子 应用 通信
----
> * ### 子应用配置
* ### 1. 新增 public-path.js 文件，用于修改运行时的 publicPath
* #### 注意：注意：运行时的 publicPath 和构建时的 publicPath 是不同的，两者不能等价替代
```js

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

```

* ### 2. 微应用建议使用 history 模式的路由，需要设置路由 base，值和它的 activeRule 是一样的。
```js

createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/race' : '/')),
// 这里的 /race 配置，可以 根据 env 文件 进行 打包时的 注入

```

* ### 3. 在入口文件最顶部引入 public-path.js，修改并导出三个生命周期函数。
> * #### 注意： 这里 暴露的 三个生命周期是 single-spa 在内部状态生命周期需要的

* ### 4. 修改 webpack 打包，允许开发环境跨域和 umd 打包。
```js

const { name } = require('./package');
module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`, // 在 webpack5.0 后 不需要 此 配置项，内部 会 默认 查找 package.json 配置
    },
  },
};

```
> ## 项目实战中 要解决的问题

* ### 1. 在 vue 中的 导航守卫  需要 对于 路由进行 对应的 配置

* ### 2. 在配置 主应用的 路由中 ，需要去除 
```js
{
    path: "/:any(.*)*",
    component: () => import("@/views/404.vue")
}
```
来 匹配 未 匹配的 路由，在 导航首位中 做 对应的 404 跳转

* ### 3. 需要注意 导航 初始化 如果是 子应用 路由的 初始化

> ## 高校中的 通信 方式；
```js

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

```



