import request from "@/utils/request"

// 委托

// 查询当日
export function queryNowOrders (data) {
  return request({
    url: "/trade-web/race/queryNowOrders",
    method: "get",
    params: data
  })
}

// 查询历史
export function queryHisOrders (data) {
  return request({
    url: "/trade-web/race/queryHisOrders",
    method: "get",
    params: data
  })
}

// 导出当日
export function exportNowOrders (data) {
  return request({
    url: "/trade-web/race/exportNowOrders",
    method: "get",
    params: data
  })
}

// 导出历史
export function exportHisOrders (data) {
  return request({
    url: "/trade-web/race/exportHisOrders",
    method: "get",
    params: data
  })
}

// 成交

// 查询当日
export function queryNowDeal (data) {
  return request({
    url: "/trade-web/race/queryNowDeal",
    method: "get",
    params: data
  })
}

// 查询历史
export function queryHisDeal (data) {
  return request({
    url: "/trade-web/race/queryHisDeal",
    method: "get",
    params: data
  })
}

// 导出当日
export function exportNowDeal (data) {
  return request({
    url: "/trade-web/race/exportNowDeal",
    method: "get",
    params: data
  })
}

// 导出历史
export function exportHisDeal (data) {
  return request({
    url: "/trade-web/race/exportHisDeal",
    method: "get",
    params: data
  })
}

// 资金流水

// 查询当日
export function queryNowCapitalFlows (data) {
  return request({
    url: "/trade-web/race/queryNowCapitalFlows",
    method: "get",
    params: data
  })
}

// 查询历史
export function queryHisCapitalFlows (data) {
  return request({
    url: "/trade-web/race/queryHisCapitalFlows",
    method: "get",
    params: data
  })
}

// 导出历史
export function exportHisCapitalFlows (data) {
  return request({
    url: "/trade-web/race/exportHisCapitalFlows",
    method: "get",
    params: data
  })
}

// 交割单

// 查询
export function queryDeliveryOrders (data) {
  return request({
    url: "/trade-web/race/queryDeliveryOrders",
    method: "get",
    params: data
  })
}

// 导出
export function exportDeliveryOrders (data) {
  return request({
    url: "/trade-web/race/exportDeliveryOrders",
    method: "get",
    params: data
  })
}
