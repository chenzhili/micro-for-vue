import request from "@/utils/request"
import qs from 'qs'

export function checkMobileLogin (data) {
  return request({
    url: "/usercenter/login/checkMobile",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function checkMobileReg (data) {
  return request({
    url: "/usercenter/custom/checkMobile",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function checkEmail (data) {
  return request({
    url: "/usercenter/custom/checkEmail",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function regVerifySms (data) {
  return request({
    url: "/usercenter/custom/regVerifySms",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function loginVerifySms (data) {
  return request({
    url: "/usercenter/login/loginCaptcha",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function forgetVerifySms (data) {
  return request({
    url: "/usercenter/custom/forgetVerifySms",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}
