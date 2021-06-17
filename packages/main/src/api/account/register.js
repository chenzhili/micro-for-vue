import request from "@/utils/request"

export function register (data) {
  return request({
    url: "/usercenter/custom/register",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data
  })
}
