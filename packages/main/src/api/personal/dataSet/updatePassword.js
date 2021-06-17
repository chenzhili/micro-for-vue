import request from "@/utils/request"

export function updatePassword (data) {
  return request({
    url: "/usercenter/profile/modifyPassword",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function passwordStatus () {
  return request({
    url: `/usercenter/profile/passwordStatus`,
    method: "get"
  })
}

export function initPassword (data) {
  return request({
    url: "/usercenter/profile/initPassword",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}
