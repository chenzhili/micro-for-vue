import request from "@/utils/request"
export function competitionResults (data) {
  return request({
    url: "/trade-web/statistics/record.do",
    method: "post",
    data
  })
}
