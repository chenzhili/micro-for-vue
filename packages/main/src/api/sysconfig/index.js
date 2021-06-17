import request from "@/utils/request"

// 获取qq/wechat/底部信息
export function getAppConfig (data) {
  return request({
    url: "/platform/config/app",
    method: "get",
    params: data
  })
}
