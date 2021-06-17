import { getAR, getTokenPerRoute, constantRoutes, dealAsyncRoutes } from '@/router'

/**
 * 生成 的 异步 路由
 * @param {*} asyncRoutes
 * @param {*} permission
 * @param {*} token
 * @returns
 */
function filterAsyncRoutes (asyncRoutes, permission, token) {
  // 判断 异步路由 是否 纯在
  if (!Array.isArray(asyncRoutes) || !asyncRoutes.length) return []
  // 判断是否有 权限
  if (!Array.isArray(permission) || !permission.length) return []
  console.log('asyncRoutes', asyncRoutes)
  const resultAR = dealAsyncRoutes(asyncRoutes)
  console.log('result', resultAR)

  // 开始 diff
  const result = dealRoutes(resultAR, permission, token)

  // console.log('permission', result)

  return result
}

/**
 * 实际 处理权限
 * @param {*} ARConfig JSON形式的 asyncRouter
 * @param {*} permission
 * @param {*} token
 * @param {*} routesResult 存储菜单 权限
 * @param {*} btnsResult 存储操作 权限
 * @returns
 */
function dealRoutes (ARConfig, permission, token, root = true, routesResult = [], btnsResult = {}) {
  let curPM, curRouteConfig
  /* 对于 个人中心 默认 有 token 就 进入 */
  if (token && root) {
    routesResult.push(...getTokenPerRoute())
  }
  for (let i = 0, len = permission.length; i < len; i++) {
    curPM = permission[i]
    /* 对于 特殊 首页 的 操作 权限处理 */
    if (curPM.alias === 'layout') {
      /* 对于 token 存在的时候，注意 权限 个人中心是否存在了 */
      if (token) {
        const i = curPM.btnsPermission.findIndex(b => b.alias === 'personalCenter')
        if (i === -1) {
          curPM.btnsPermission.push({
            alias: "personalCenter",
            name: "个人中心"
          })
        }
      }
      btnsResult[curPM.alias] = curPM.btnsPermission
    }
    /* 处理 有路由的情况 */
    if (ARConfig && (curRouteConfig = ARConfig[curPM.alias])) {
      routesResult.push(curRouteConfig.realRoute)
      // 有 操作 权限
      if (curPM.btnsPermission && curPM.btnsPermission.length) {
        btnsResult[curPM.alias] = curPM.btnsPermission
        curRouteConfig.realRoute.btnsPermission = curPM.btnsPermission
      }
      // 有 下级 路由
      if (curPM.children && curPM.children.length) {
        curRouteConfig.realRoute.children = []
        dealRoutes(curRouteConfig.children, curPM.children, token, false, curRouteConfig.realRoute.children, btnsResult)
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
    // 为了 在外层 watch到  btns
    Object.entries(btns).forEach(([k, v]) => {
      state.btns[k] = v
    })
  },
  REST_BTNS (state) {
    // state.btns = {}
    Object.keys(state.btns).forEach((k) => {
      delete state.btns[k]
    })
  }
}

const actions = {
  resetBtns ({ commit }) {
    commit('REST_BTNS')
  },
  generateRoutes ({ commit }, { permissions, token }) {
    return new Promise((resolve, reject) => {
      const AR = getAR()
      // 这里 在路由 配置 操作权限，并且单独 也要存一份
      const { routesResult: accessedRoutes, btnsResult } = filterAsyncRoutes(AR, permissions, token)
      const isBtns = Object.keys(btnsResult).length
      if ((accessedRoutes && accessedRoutes.length) || (btnsResult && isBtns)) {
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
