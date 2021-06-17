import request from "@/utils/request"

const PAGE = {
  sy: 1, // 首页
  mn: 2, // 模拟
  sx: 3, // 实训
  cy: 4, // 从业
  jy: 5 // 交易
}

const TYPE = {
  lb: 1, // 轮播图
  tc: 2, // 弹窗
  xf: 3 // 悬浮弹窗
}

// data = 'sy_lb'
export function getPublicity (data) {
  const array = data.split('_')
  const params = {
    page: PAGE[array[0]],
    type: TYPE[array[1]]
  }
  return request({
    url: "/platform/picture/activeByType",
    method: "get",
    params
  })
}
