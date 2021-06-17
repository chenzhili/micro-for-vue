const state = {
  name: "name"
}

const mutations = {
  SET_NAME: (state, value) => {
    state.name = value
  }
}

const actions = {
  setName (context, value) {
    context.commit("SET_NAME", value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
