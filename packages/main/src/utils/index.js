import CryptoJS from 'crypto-js'
import { useStore } from 'vuex'

const key = CryptoJS.enc.Utf8.parse('0123456789abcdef') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量
export function getAesString (word) { // 加密
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(encrypted)).toUpperCase()
}
export function getDAesString (word) { // 解密
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Utf8.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  // eslint-disable-next-line camelcase
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  // eslint-disable-next-line camelcase
  return time_str
}

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

/* 深拷贝 */
export function deepClone (obj) {
  var objClone = Array.isArray(obj) ? [] : {}
  let key
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

/**
 * 对于 操作 权限的 统一处理
 * @param {*} btns 实际的 操作权限
 * @param {*} type 当前权限
 * @param {*} callback 回调的方法
 */
export const coopPer = async (btns, type, [callback, ...args]) => {
  console.log(btns, type)
  // 测试 用的
  if (type === 'race' || type === 'train') {
    // eslint-disable-next-line standard/no-callback-literal
    return (callback instanceof Function && callback(...args))
  }
  if (type === 'home_index') {
    // eslint-disable-next-line standard/no-callback-literal
    callback instanceof Function && callback(...args)
    return
  }
  const res = await (() => import('@/store'))()
  const store = res.default
  const token = store.getters.token

  if (!Array.isArray(btns) || !btns.length || !type) {
    !token && store.dispatch('user/changeLoginModal', true)
    return
  }
  const i = btns.findIndex(b => b.alias === type)
  if (i > -1) {
    args = Array.isArray(args) ? args : []
    // eslint-disable-next-line standard/no-callback-literal
    callback instanceof Function && callback(...args)
  } else {
    !token && store.dispatch('user/changeLoginModal', true)
  }
}
