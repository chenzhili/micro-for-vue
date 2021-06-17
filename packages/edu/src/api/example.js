import request from "@/utils/request"

export function exampleGetRequest (data) {
  return request({
    url: "/example",
    method: "get",
    params: data
  })
}

export function examplePostRequest (data) {
  return request({
    url: "/example",
    method: "post",
    data
  })
}
