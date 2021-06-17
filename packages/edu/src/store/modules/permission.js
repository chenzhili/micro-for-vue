import { getAR, dDataForApi, constantRoutes, dealAsyncRoutes } from '@/router'

/**
 * 生成 的 异步 路由
 * @param {*} asyncRoutes
 * @param {*} permission
 * @returns
 */
function filterAsyncRoutes (asyncRoutes, permission) {
  // 判断 异步路由 是否 纯在
  if (!Array.isArray(asyncRoutes) || !asyncRoutes.length) return []
  // 判断是否有 权限
  if (!Array.isArray(permission) || !permission.length) return []
  const resultAR = dealAsyncRoutes(asyncRoutes)
  console.log('result', resultAR)

  // 开始 diff
  const result = dealRoutes(resultAR, permission)

  console.log('permission', result)

  return result
}

/**
 * 实际 处理权限
 * @param {*} ARConfig JSON形式的 asyncRouter
 * @param {*} permission
 * @param {*} routesResult 存储菜单 权限
 * @param {*} btnsResult 存储操作 权限
 * @returns
 */
function dealRoutes (ARConfig, permission, routesResult = [], btnsResult = {}) {
  let curPM, curRouteConfig
  for (let i = 0, len = permission.length; i < len; i++) {
    curPM = permission[i]
    if ((curRouteConfig = ARConfig[curPM.alias])) {
      routesResult.push(curRouteConfig.realRoute)
      // 有 操作 权限
      if (curPM.btnsPermission && curPM.btnsPermission.length) {
        btnsResult[curPM.alias] = curPM.btnsPermission
        curRouteConfig.realRoute.btnsPermission = curPM.btnsPermission
      }
      // 有 下级 路由
      if (curPM.children && curPM.children.length) {
        curRouteConfig.realRoute.children = []
        dealRoutes(curRouteConfig.children, curPM.children, curRouteConfig.realRoute.children, btnsResult)
      }
    }
  }
  return { routesResult, btnsResult }
}

const state = {
  routes: [],
  addRoutes: [],
  btns: {}
}

const mutations = {
  SET_ROUTES (state, routes) {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BTNS (state, btns) {
    state.btns = btns
  }
}

const actions = {
  generateRoutes ({ commit }, permissions) {
    return new Promise((resolve, reject) => {
      const AR = getAR()
      const DP = dDataForApi(permissions)
      // 这里 在路由 配置 操作权限，并且单独 也要存一份
      const { routesResult: accessedRoutes, btnsResult } = filterAsyncRoutes(AR, DP)
      if (accessedRoutes.length) {
        commit('SET_ROUTES', accessedRoutes)
        commit('SET_BTNS', btnsResult)
        resolve({ asyncRoutes: accessedRoutes, btnsResult })
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('该用户没有任何权限')
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
