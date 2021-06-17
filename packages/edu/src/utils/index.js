
export function clone (obj) {
  var o
  // 如果  他是对象object的话  , 因为null,object,array  也是'object';
  if (typeof obj === 'object') {
    // 如果  他是空的话
    if (obj === null) {
      o = null
    } else {
      // 如果  他是数组arr的话
      if (obj instanceof Array) {
        o = []
        for (var i = 0, len = obj.length; i < len; i++) {
          o.push(clone(obj[i]))
        }
        // eslint-disable-next-line brace-style
      }
      // 如果  他是对象object的话
      else {
        o = {}
        for (var j in obj) {
          o[j] = clone(obj[j])
        }
      }
    }
  } else {
    o = obj
  }
  return o
}

// 处理列表数据保留小数
// props需要保留小数的字段名
export const dataDispose = (data, props, reverse) => {
  if (reverse) {
    data.map(item => {
      for (const i in item) {
        if (props.indexOf(i) < 0) {
          item[i] = Number(item[i]).toFixed(2)
        }
      }
    })
  } else {
    data.map(item => {
      for (const i in item) {
        if (props.indexOf(i) >= 0) {
          item[i] = Number(item[i]).toFixed(2)
        }
      }
    })
  }
}

const flag = function (m) {
  return m < 10 ? '0' + m : m
}

export const dateChange = function (timeData) {
  const time = new Date(timeData)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  return y + '-' + flag(m) + '-' + flag(d) + ' '
}
