import request from "@/utils/request"
import qs from 'qs'

export function readMsg (data) {
  return request({
    url: `/message/userMessage/readMsg/${data}`,
    method: "post"
  })
}

export function deleteMsg (data) {
  return request({
    url: `/message/userMessage/deleteMsg/${data}`,
    method: "post"
  })
}

export function getUnReadInfo () {
  return request({
    url: "/message/userMessage/getUnReadInfo",
    method: "get"
  })
}

export function getMessage (data) {
  return request({
    url: "/message/userMessage/page",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    method: "get",
    params: data
  })
}

export function deleteAllMsg (data) {
  return request({
    url: "/message/userMessage/deleteAllMsg",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function readAllMsg (data) {
  return request({
    url: "/message/userMessage/readAllMsg",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}
