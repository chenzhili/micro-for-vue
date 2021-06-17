export const PHONE_REG = /^1[3456789]\d{9}$/ // 手机号
export const EMAIL_REG = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} value
 * @returns {Boolean}
 */
export function isMoney (value) {
  return /^(([1-9]\d*)(\.\d{1,2})?)$|^(0\.0?([1-9]\d?))$/.test(value)
}

export function isPhone (value) {
  return PHONE_REG.test(value)
}

export function isEmail (value) {
  return EMAIL_REG.test(value)
}
