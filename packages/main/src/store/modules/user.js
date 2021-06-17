// 这里基本都要改
import { login, getMenu, loginOut } from '@/api/account/login'
import router, { resetRouter, dDataForApi } from '@/router'
import { ElMessage } from 'element-plus'

import {
  getToken,
  setToken,
  removeToken,
  setPermission,
  getPermission,
  removePermission,
  getUserId,
  setUserId,
  removeUserId,
  getAccount,
  setAccount,
  removeAccount,
  getMobile,
  setMobile,
  removeMobile,
  getNickname,
  setNickname,
  setCertifyFlag,
  removeCertifyFlag,
  removeNickname,
  setBasicInfo,
  removeBasicInfo
} from "@/utils/auth"

// 测试
import testJSON from '@/JSON'

const getDefaultState = () => {
  return {
    token: getToken(),
    avatar: '',
    permission: getPermission() || [],
    userId: '',
    account: '',
    mobile: '',
    nickName: '',
    certifyFlag: '',
    userType: '',
    visited: false // 当前网站是否是初始化
  }
}

const state = {
  ...getDefaultState(),
  loginModal: false, // 登录 模态的显示
  adDialogVisiable: false
}

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
  SET_USER_ID: (state, id) => {
    state.userId = id
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_NICK_NAME: (state, nickName) => {
    state.nickName = nickName
  },
  SET_CERTIFY_FLAG: (state, certifyFlag) => {
    state.certifyFlag = certifyFlag
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_TYPE: (state, type) => {
    state.userType = type
  },
  SET_USER_VISITED: (state, bool) => {
    state.visited = bool
  },
  SET_USER_LM: (state, bool) => {
    state.loginModal = bool
  },
  SET_AD_DIALOG_VISIABLE: (state, bool) => {
    state.adDialogVisiable = bool
  }
}

const actions = {
  setAdDialogVisiable ({ commit }, bool) {
    commit('SET_AD_DIALOG_VISIABLE', bool)
  },
  changeLoginModal ({ commit }, bool) {
    commit('SET_USER_LM', bool)
  },
  changeVisited ({ commit }, bool) {
    commit('SET_USER_VISITED', bool)
  },
  async login ({ commit, dispatch }, { params, api, isVisitor = false, needBInd, isMessage = true, isDialog } = {}) {
    commit('RESET_STATE')
    if (!isVisitor) {
      removeToken()
      // removeName()
      resetRouter()
      removePermission()
      // removeCurRoute()
      // commit('RESET_STATE')
    }
    try {
      let roleId, certifyFlag, token, id, account, mobile, nickname, portrait, isTenDayLogin
      if (!isVisitor) {
        ({ data: { certifyFlag, token, id, account, mobile, nickname, portrait, isTenDayLogin } } = await api(params))
        // debugger
        if (isDialog) {
          commit('SET_USER_LM', false)
        }
        if (needBInd) {
          if (!certifyFlag) {
            return Promise.resolve({ certifyFlag, token, id, account, mobile, nickname, portrait })
          }
        }
        const indate = isTenDayLogin === "true" ? 10 : 1
        commit('SET_TOKEN', token)
        setToken(token, indate)
        commit('SET_USER_ID', id)
        setUserId(id, indate)
        commit('SET_ACCOUNT', account)
        setAccount(account, indate)
        commit('SET_MOBILE', mobile)
        setMobile(mobile, indate)
        commit('SET_NICK_NAME', nickname)
        setNickname(nickname, indate)
        commit('SET_CERTIFY_FLAG', certifyFlag)
        setCertifyFlag(certifyFlag, indate)
        commit('SET_AVATAR', portrait)
        const basicInfo = {
          portrait,
          nickname
        }
        setBasicInfo(basicInfo)
        dispatch('operation/setCount', null, { root: true })
        roleId = certifyFlag === 0 ? 3 : 2
        // debugger
        // if (isDialog) {
        //   commit('SET_USER_LM', false)
        // }
        if (isMessage) {
          ElMessage({
            message: '登录成功',
            type: 'success',
            duration: 5 * 1000,
            showClose: true
          })
        }
      } else {
        roleId = 1
      }

      // 测试
      // certifyFlag 参数 0 => 2, 1 -> 3
      const { data } = await getMenu({ roleId })
      // console.log('data', data)

      const DP = dDataForApi(data)
      // console.log('DP===============', DP)
      const { asyncRoutes } = await dispatch('permission/generateRoutes', { permissions: DP, token: getToken() }, { root: true })
      // console.log('asyncRoutes', asyncRoutes)

      /* 存储后台权限 */
      commit('SET_PERMISSION', DP)
      setPermission(DP)
      /* 存储 真实 的 options */
      const realRoute = router.options.routes
      asyncRoutes.forEach(route => {
        if (route.parentName) {
          const i = realRoute.findIndex(item => item.name === route.parentName)
          if (i > -1) {
            realRoute[i].children = realRoute[i].children || []
            realRoute[i].children.push(route)

            router.addRoute(route.parentName, route)
          }
        } else {
          realRoute.push(route)
          router.addRoute(route)
        }
      })
      router.options.routes = [...realRoute]

      return Promise.resolve({ certifyFlag })
    } catch (error) {
      /* 清空 */
      commit('SET_TOKEN', '')
      removeToken()
      removeUserId()
      removeAccount()
      removeMobile()
      removeNickname()
      removeCertifyFlag()
      removeBasicInfo()
      console.log(error)
      return Promise.reject(error)
    }
  },
  // 清除 btns 的权限
  resetBtns ({ dispatch }) {
    dispatch('permission/resetBtns', {}, { root: true })
  },
  async logout ({ commit, dispatch }) {
    await loginOut({ token: getToken() })
    return new Promise((resolve, reject) => {
      removeToken()
      removeUserId()
      removeAccount()
      removeMobile()
      removeNickname()
      removeCertifyFlag()
      removeBasicInfo()
      // commit('SET_USER_TYPE', '')
      commit('RESET_STATE')
      resetRouter()
      resolve()
      // commit('resetBtns')
      dispatch('user/resetBtns', {}, { root: true })
    })
  },

  // remove token
  resetToken ({ commit, dispatch }) {
    return new Promise(resolve => {
      removeToken()
      removeUserId()
      removeAccount()
      removeMobile()
      removeNickname()
      removeCertifyFlag()
      removeBasicInfo()
      // commit('SET_USER_TYPE', '')
      commit('RESET_STATE')
      resetRouter()
      resolve()
      // commit('resetBtns')
      dispatch('user/resetBtns', {}, { root: true })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
