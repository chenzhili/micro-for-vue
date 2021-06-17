import request from "@/utils/request"
export function applySubmit (data) {
  return request({
    url: "/platform/apply/submit",
    method: "post",
    data
  })
}
