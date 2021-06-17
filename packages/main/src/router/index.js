import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router"
import constantRoutes from "./syncRoutes"

// 异步加载 路由
import getAR, { dealAsyncRoutes, dDataForApi, getTokenPerRoute } from "./asyncRoutes"

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

const createRouterFac = () =>
  createRouter({
    scrollBehavior: () => ({ top: 0 }),
    history: createWebHistory(),
    routes: constantRoutes
  })

const router = createRouterFac()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouterFac()
  router.matcher = newRouter.matcher // reset router
  router.options = newRouter.options
  return router
}

export { constantRoutes, getAR, dealAsyncRoutes, dDataForApi, getTokenPerRoute }

export default router