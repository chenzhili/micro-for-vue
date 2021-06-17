const setupGlobalCom = (app) => {
  const requireComponents = require.context('./', true, /\.vue$/)
  requireComponents.keys().forEach(item => {
    const componentName = item.replace(/\.\//, '').replace(/\/index.vue$/, '')
    // componentName.charAt(0).toLowerCase() + componentName.slice(1).replace(/([A-Z])/g,"-$1").toLowerCase()
    app.component(componentName, requireComponents(item).default)
  })
}

export default setupGlobalCom
