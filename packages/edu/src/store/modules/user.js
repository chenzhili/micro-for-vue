// 这里基本都要改
import { login } from '@/api/login'
import router, { resetRouter } from '@/router'

import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    avatar: '',
    permission: [],
    userId: '',
    userName: '',
    userType: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = [...state.permission, ...permission]
  },
  SET_USER_NAME: (state, userName) => {
    state.userName = userName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_ID: (state, id) => {
    state.userId = id
  },
  SET_USER_TYPE: (state, type) => {
    state.userType = type
  }
}

// /* 处理 权限的 配置项 */
// const dealPermission = (permission) => {
//   if (!(permission instanceof Array) || !permission.length) return []
//   permission.forEach(menu => {
//     menu.code = menu.code.slice(2)
//     // 测试代码
//     // menu.isHave = 1;
//     if (menu.children instanceof Array && menu.children.length) {
//       menu.children.forEach(btn => {
//         btn.code = btn.code.slice(2)
//         // btn.isHave = 1;
//       })
//     }
//   })
//   return permission
// }
const actions = {
  login ({ commit, dispatch }, data) {
    const { principal, credentials, captcha, deviceId, bugWorm } = data
    return new Promise((resolve, reject) => {
      const params = {

      }
      login(params).then(async response => {
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        try {
          const menu = []
          if (menu.length) {
            const asyncRoutes = await dispatch('permission/generateRoutes', menu, { root: true })
            const curRoute = (asyncRoutes[0].children instanceof Array) ? asyncRoutes[0].children.filter(route => !route.removeMenu)[0] : []
            if (curRoute) {
              commit('SET_USER_NAME', response.userName)
              /* 存储 权限 */
              commit('SET_PERMISSION', menu)
              commit('SET_USER_TYPE', response.userType)
              /* 动态添加路由 */
              router.addRoutes(asyncRoutes)
              router.options.routes = [
                ...router.options.routes,
                ...asyncRoutes
              ]
              resolve(curRoute)
            } else {
              commit('SET_TOKEN', '')
              removeToken()
              // eslint-disable-next-line prefer-promise-reject-errors
              reject('没有操作的权限')
            }
          }
          resolve()
        } catch (error) {
          console.log(error)
          commit('SET_TOKEN', '')
          removeToken()
          reject(error)
        }
        resolve(response)
      }).catch(error => {
        commit('SET_TOKEN', '')
        removeToken()
        reject(error)
      })
    })
  },

  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      resetRouter()
      // commit('SET_USER_TYPE', '')
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
