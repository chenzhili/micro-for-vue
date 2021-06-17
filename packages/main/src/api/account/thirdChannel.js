import request from "@/utils/request"
import qs from 'qs'

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
