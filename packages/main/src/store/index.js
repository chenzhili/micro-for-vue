import { createStore } from "vuex"
import getters from "./getters"
import createPersistedState from "vuex-persistedstate"

const modulesFiles = require.context("./modules", true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1")
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  getters,
  modules,
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
