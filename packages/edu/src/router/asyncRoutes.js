/**
 * 异步路由
 */
/* 将所有的 项目 都按层级 划分为 对象 层级， 也是 强制 不允许 有 name 重复的路由 */
export const dealAsyncRoutes = (routes, result = {}) => {
  if (!Array.isArray(routes) || !routes.length) return {}
  let curRoute, children, other
  for (let i = 0, len = routes.length; i < len; i++) {
    curRoute = routes[i];
    ({ children, ...other } = curRoute)
    result[curRoute.name] = {
      realRoute: other
    }
    // 递归 children
    if (Array.isArray(children) && children.length) {
      dealAsyncRoutes(children, (result[curRoute.name].children = {}))
    }
  }
  return result
}

/* 处理后台的 权限 */
export const dDataForApi = (data, result = []) => {
  if (!Array.isArray(data) || !data.length) return []
  let curItem, coopItem, children, other
  for (let i = 0, len = data.length; i < len; i++) {
    curItem = data[i]
    ;({ children, ...other } = curItem)
    coopItem = other
    result.push(coopItem)
    if (curItem.type === 0 && children.length) { // 不是菜单级
      dDataForApi(children, (coopItem.children = []))
    } else if (curItem.type === 1 && children.length) { // 到菜单级 // 操作权限放入
      coopItem.btnsPermission = children
    }
  }
  return result
}

/* 由于 动态路由 的 重定向不定 */
export const redirectRoute = (route, redURL = []) => {
  if (!route) return '/'
  redURL.push(route.path)
  if (route.children && route.children.length) {
    return redirectRoute(route.children[0], redURL)
  } else {
    return redURL.join('/')
  }
}
export default {}
