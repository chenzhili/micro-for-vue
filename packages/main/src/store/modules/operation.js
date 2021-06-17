import { getUnReadInfo } from "@/api/message"

const state = {
  unReadCount: {}
}

const mutations = {
  SET_COUNT: (state, value) => {
    state.unReadCount = value
  },
  READ_MESSAGE: (state, type) => {
    --state.unReadCount[type]
  }
}

const actions = {
  async setCount ({ commit }, bool) {
    const unReadCount = {}
    const res = await getUnReadInfo()
    unReadCount["0"] = res.data.num
    commit('SET_COUNT', unReadCount)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
