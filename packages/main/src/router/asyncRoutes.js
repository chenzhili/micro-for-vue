/**
 * 异步路由的需求，所有的 路由 必须 添加 name 作为 别名，不允许重复
 */
/* 异步 路由 */
import Layout from "@/layout"

/* 将所有的 项目 都按层级 划分为 对象 层级， 也是 强制 不允许 有 name 重复的路由 */
export const dealAsyncRoutes = (routes, result = {}) => {
  if (!Array.isArray(routes) || !routes.length) return {}
  let curRoute, children, other
  for (let i = 0, len = routes.length; i < len; i++) {
    curRoute = routes[i];
    ({ children, ...other } = curRoute)
    result[curRoute.name] = {
      realRoute: other
    }
    // 递归 children
    if (Array.isArray(children) && children.length) {
      dealAsyncRoutes(children, (result[curRoute.name].children = {}))
    }
  }
  return result
}

/* 平台端 需要 特殊处理
  1、默认 自增 index 首页的 权限，并将 一级的 菜单权限 从属于 index 的 按钮权限
  2、区分 从属 关系，目前 除了 乾隆教育意外 都是从属 index
  3、这里对于 index 重复的问题，用 addRoute 的 name 覆盖特性做
  addRoute(parentName: string, route: RouteConfig): () => void
*/
// 首页路由
const getIndexRoute = () => ({
  alias: "layout",
  name: "首页bar",
  type: 1,
  btnsPermission: []
})
// 乾隆教育 默认路由
const getEduRoute = () => ({
  alias: "system",
  name: "实训系统",
  type: 1,
  btnsPermission: []
})
export const dDataForApi = (data, root = true, result = []) => {
  if (!Array.isArray(data) || !data.length) return []
  const indexRoute = getIndexRoute()
  if (root) {
    result.push(indexRoute)
  }
  // 对于平台端的权限，默认 在 首页 绑定以及权限
  let curItem, coopItem, children, other
  for (let i = 0, len = data.length; i < len; i++) {
    curItem = data[i]
    ; ({ children, ...other } = curItem)
    // 如果 是 root
    if (root) {
      indexRoute.btnsPermission.push({ ...other })
    }
    // 路由 有 parentName 的 时候
    coopItem = root ? { parentName: 'layout', ...other } : other
    result.push(coopItem)
    if (children && children.length) { // 不是菜单级
      coopItem.children = []
      /* 如果是 乾隆教育 还要 做 操作权限 */
      if (curItem.alias === 'education') {
        coopItem.btnsPermission = children
        coopItem.children.push(getEduRoute())
      }
      dDataForApi(children, false, coopItem.children)
    }
  }
  return result
}

/* 根据 token 关系 混入的 路由 --- 只需要控制 一层, 用token控制 */
export const getTokenPerRoute = () => ([{
  path: "personalCenter",
  component: () => import("@/views/PersonalCenter/index.vue"),
  name: 'personalCenter',
  parentName: 'layout',
  redirect: "/personalCenter/myPracticalTraining",
  meta: { title: "个人中心" },
  children: [
    {
      path: "myPracticalTraining",
      component: () => import("@/views/PersonalCenter/component/myPracticalTraining/index.vue"),
      name: "myPracticalTraining",
      meta: { title: "个人中心-我的实训" }
    }
  ]
}])

export default () => [
  /* 这是在 首页下的 路由 */
  {
    path: "m-message",
    component: () => import("@/views/Message/index.vue"),
    name: "message",
    parentName: 'layout',
    meta: { title: "消息中心" }
  },
  /* 独立路由 */
  {
    path: "/education",
    component: () => import("@/views/Education/index.vue"),
    name: "education",
    redirect: "/education/system",
    children: [
      // 有 乾隆教育 就有 这个 权限
      {
        path: "system",
        component: () => import("@/views/Education/TrainSystem.vue"),
        name: "system",
        meta: { title: "实训系统" }
      }, {
        path: "productionCoop",
        component: () => import("@/views/Education/ProductionCoop.vue"),
        name: "educationPcc",
        meta: { title: "产学合作" }
      },
      {
        path: "channelsCoop",
        component: () => import("@/views/Education/ChannelsCoop.vue"),
        name: "educationCc",
        meta: { title: "渠道合作" }
      },
      {
        path: "tryApply",
        component: () => import("@/views/Education/TryApply.vue"),
        name: "educationPt",
        meta: { title: "产品试用申请" }
      }
    ]
  }
]
