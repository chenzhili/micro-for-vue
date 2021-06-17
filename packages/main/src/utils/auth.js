import Cookies from 'js-cookie'
import { getAesString, getDAesString } from '@/utils'

const TokenKey = 'SET_TOKEN_MANAGE'
/* 权限的所有数据 */
const permission = 'PERMISSION_MANAGE'
const UserIDKey = 'SMS_USER_MANAGE'
const AccountKey = 'ACCOUNT_MANAGE'
const MobileKey = 'MOBILE_MANAGE'
const NicknameKey = 'NICKNAME_MANAGE'
const CertifyKey = 'CERTIFY_MANAGE'
const basicInfoKey = 'BASIC_MANAGE'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token, indate) {
  return Cookies.set(TokenKey, token, { expires: indate })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setPermission (data) {
  return localStorage.setItem(permission, getAesString(JSON.stringify(data)))
}
export function removePermission () {
  return localStorage.removeItem(permission)
}
export function getPermission () {
  const data = localStorage.getItem(permission)
  return data ? JSON.parse(getDAesString(data)) : ''
}
export function getUserId () {
  return Cookies.get(UserIDKey)
}

export function setUserId (data, indate) {
  return Cookies.set(UserIDKey, data, { expires: indate })
}

export function removeUserId () {
  return Cookies.remove(UserIDKey)
}

export function getAccount () {
  return Cookies.get(AccountKey)
}

export function setAccount (data, indate) {
  return Cookies.set(AccountKey, data, { expires: indate })
}

export function removeAccount () {
  return Cookies.remove(AccountKey)
}

export function getMobile () {
  return Cookies.get(MobileKey)
}

export function setMobile (data, indate) {
  return Cookies.set(MobileKey, data, { expires: indate })
}

export function removeMobile () {
  return Cookies.remove(MobileKey)
}

export function getNickname () {
  return Cookies.get(NicknameKey)
}

export function setNickname (data, indate) {
  return Cookies.set(NicknameKey, data, { expires: indate })
}

export function removeNickname () {
  return Cookies.remove(NicknameKey)
}

export function getCertifyFlag () {
  return Cookies.get(CertifyKey)
}

export function setCertifyFlag (data, indate) {
  return Cookies.set(CertifyKey, data, { expires: indate })
}

export function removeCertifyFlag () {
  return Cookies.remove(CertifyKey)
}

export function setBasicInfo (data) {
  return localStorage.setItem(basicInfoKey, JSON.stringify(data))
}
export function removeBasicInfo () {
  return localStorage.removeItem(basicInfoKey)
}
export function getBasicInfo () {
  const data = localStorage.getItem(basicInfoKey)
  return data ? JSON.parse(data) : ''
}
