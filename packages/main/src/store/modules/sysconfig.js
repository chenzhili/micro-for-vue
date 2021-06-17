import { getAppConfig } from '@/api/sysconfig'

const state = {
  qq: {
    appId: '',
    callbackUrl: ''
  },
  wechat: {
    appId: '',
    callbackUrl: ''
  },
  plat: {}
}

const mutations = {
  SET_QQ: (state, value) => {
    state.qq = value
  },
  SET_WECHAT: (state, value) => {
    state.wechat = value
  },
  SET_PLAT: (state, value) => {
    state.plat = value
  }
}

const actions = {
  getQQ (context) {
    return new Promise((resolve, reject) => {
      getAppConfig({ biz: 'qq' }).then(res => {
        if (res.code === '000000') {
          const qqConfig = {}
          res.data.forEach(item => {
            qqConfig[item.configKey] = item.configValue
          })
          context.commit("SET_QQ", qqConfig)
          resolve(qqConfig)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(res)
        }
      }).catch(e => reject(e))
    })
  },
  getWechat (context) {
    return new Promise((resolve, reject) => {
      getAppConfig({ biz: 'wechat' }).then(res => {
        if (res.code === '000000') {
          const qqConfig = {}
          res.data.forEach(item => {
            qqConfig[item.configKey] = item.configValue
          })
          context.commit("SET_WECHAT", qqConfig)
          resolve(qqConfig)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(res)
        }
      }).catch(e => reject(e))
    })
  },
  getPlat (context) {
    return new Promise((resolve, reject) => {
      getAppConfig({ biz: 'plat' }).then(res => {
        if (res.code === '000000') {
          const qqConfig = {}
          res.data.forEach(item => {
            qqConfig[item.configKey] = item.configValue
          })
          context.commit("SET_PLAT", qqConfig)
          resolve(qqConfig)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(res)
        }
      }).catch(e => reject(e))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
