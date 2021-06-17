import request from "@/utils/request"
import qs from 'qs'

export function baseInfo (data) {
  return request({
    url: `/usercenter/profile/baseInfo/${data}`,
    method: "get",
    data
  })
}

export function baseInfoEdit (data) {
  return request({
    url: "/usercenter/profile/baseInfoEdit",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    data
  })
}

export function changeHeadPortrait (data) {
  return request({
    url: '/usercenter/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
