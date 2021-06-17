import request from "@/utils/request"

export function getChannelList (id) {
  return request({
    url: `/usercenter/profile/channelList/${id}`,
    method: "get"
  })
}

export function removeThird (data) {
  return request({
    url: "/usercenter/profile/removeThird",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function removeEmail (data) {
  return request({
    url: "/usercenter/profile/removeEmailBind",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function bindQQ (data) {
  return request({
    url: "/usercenter/profile/bindQQ",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function bindWechat (data) {
  return request({
    url: "/usercenter/profile/bindWechat",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function bindEmailReq (data) {
  return request({
    url: "/usercenter/profile/bindEmail",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function bindMobile (data, token) {
  return request({
    url: "/usercenter/profile/bindMobile",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: 'Bearer ' + token
    },
    method: "post",
    data
  })
}

export function bindCaptchaEmail (data) {
  return request({
    url: "/usercenter/profile/bindCaptchaEmail",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}

export function bindCaptcha (data, token) {
  return request({
    url: "/usercenter/profile/bindCaptcha",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: 'Bearer ' + token
    },
    method: "post",
    data
  })
}
