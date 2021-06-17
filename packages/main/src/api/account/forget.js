import request from "@/utils/request"
import qs from 'qs'

export function forgetByPhone (data) {
  return request({
    url: "/usercenter/custom/forgetPassword",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function forgetVerifyEmail (data) {
  return request({
    url: "/usercenter/custom/forgetVerifyEmail",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function forgetByEmail (data) {
  return request({
    url: "/usercenter/custom/forgetPasswordEmail",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}
