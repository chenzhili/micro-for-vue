import request from "@/utils/request"
import qs from 'qs'

export function login (data) {
  return request({
    url: "/login",
    method: "post",
    data
  })
}

export function loginOut (data) {
  return request({
    url: "/usercenter/profile/loginOut",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

/* 获取 权限 */
export function getMenu (data) {
  return request({
    url: "/platform/role/menu",
    method: "get",
    params: data
  })
}

/* 埋点 */
export function messTServer (data) {
  return request({
    url: "/platform/pageEvent",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data
  })
}

export function loginByPhone (data) {
  return request({
    url: "/usercenter/login/phone",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function loginByCaptcha (data) {
  return request({
    url: "/usercenter/login/captcha",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function loginByStuNum (data) {
  return request({
    url: "/usercenter/login/school",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function wxLogin (data) {
  return request({
    url: "/usercenter/login/wechat",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function qqLogin (data) {
  return request({
    url: "/usercenter/login/qq",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}
