import request from "@/utils/request"

// 获取市场
export function queryMarket (data) {
  return request({
    url: "/trade-web/race/queryMarket",
    method: "get",
    params: data
  })
}

// 获取竞赛
export function queryRaces (data) {
  return request({
    url: "/trade-web/race/queryRaces",
    method: "get",
    params: data
  })
}

// 报名参加
export function signUp (data) {
  return request({
    url: "/trade-web/race/signUp",
    method: "post",
    data
  })
}

// 提交审核
export function sumCheck (data) {
  return request({
    url: "/trade-web/race/sumCheck",
    method: "post",
    data
  })
}

// 查询比赛规则
export function queryMatchrule (data) {
  return request({
    url: "/trade-web/race/queryMatchrule",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data
  })
}
