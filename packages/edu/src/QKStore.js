
let setGlobalState

/**
 * events 还是 需要 Map 来 做 对于 type 的 区分
 * ex: {
 *  type: new Set() // 这种方式
 * }
 */
// const events = new Set()
const eventsMap = new Map()

/* 添加 事件 */
const addQKEvent = (e, type) => {
  if (!(e instanceof Function) || !type) { return false }
  let events
  if (!(events = eventsMap.get(type))) {
    eventsMap.set(type, (events = new Set()))
  }
  events.add(e)
  return true
}
/* 删除 事件 */
const delQKEvent = (e, type) => {
  if (!type) return false
  const events = eventsMap.get(type)
  return events.delete(e)
}

export default function initStoreQK (props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (now, prev) => {
        const { type } = now
        // 如果 没有 type 字段 直接 过滤掉
        if (!type) return false
        const events = eventsMap.get(type)
        if (events instanceof Set) {
          events.forEach(e => {
            e instanceof Function && e(now, prev)
          })
        }
      },
      true
    )
  props.setGlobalState && (setGlobalState = props.setGlobalState)
}

/* 统一 setState 的 操作，没有 type 不允许 修改 */
const setQKState = (type, data = {}) => {
  if (!type) { return false }
  setGlobalState({
    type,
    ...data
  })
  return true
}

export { setQKState, addQKEvent, delQKEvent }
