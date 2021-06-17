import microConRoutes from '@/router/microConRoutes'

const getInitState = () => {
  return microConRoutes.reduce((prev, next) => {
    prev[next.name] = true
    return prev
  }, {})
}

const state = {
  ...getInitState()
}

const mutations = {
  CHANGE_LOADING: (state, { subApp, value }) => {
    console.log('-------------------CHANGE_LOADING')
    state[subApp] = value
  }
}

const actions = {
  changeLoading ({ dispatch, commit, state }, value) {
    commit('CHANGE_LOADING', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
