import { setNavStatus } from "@/utils/auth.js"
const getDefaultState = () => {
  return {
    raceConfig: {},
    navStatus: {
      first: "",
      second: ""
    }
  }
}

const state = getDefaultState()

const mutations = {
  CHANGE_RACE_CONFIG: (state, config) => {
    state.raceConfig = config
  },
  // CHANGE_NAV_STATUS: (state, { first, second, isMargin }) => {
  //   first !== undefined && (state.navStatus.first = first)
  //   second !== undefined && (state.navStatus.second = second)
  //   setNavStatus(state.navStatus)
  // },
  CHANGE_NAV_STATUS: (state, status) => {
    state.navStatus = status
    setNavStatus(state.navStatus)
  }
}

const actions = {
  changeRaceConfig ({ commit, dispatch }, config) {
    commit('CHANGE_RACE_CONFIG', config)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
