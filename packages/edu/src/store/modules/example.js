const state = {
  info: 1,
  infoCustom: 1
}

const mutations = {
  SET_INFOL_CUSTOM: (state, value) => {
    state.infoCustom = value
  },
  SET_INFO: (state, value) => {
    state.info = value
  }
}

const actions = {
  setInfo (context, value) {
    console.log("update info by setInfo action", value)
    context.commit("SET_INFO", value)
  },
  setInfoCustom ({ dispatch, commit, state }, value) {
    console.log("update infoCustom by setInfoCustom action", value)
    commit("SET_INFOL_CUSTOM", value)
  },
  setAllInfo (context, value) {
    console.log("update state by setAllInfo action", value)
    context.dispatch("setInfo", value)
    context.dispatch("setInfoCustom", value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
