import request from "@/utils/request"
import { ElLoading } from 'element-plus'
export function hq (data) {
  return request({
    url: "/quotescenter/services",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "post",
    data,
    params: {
      token: data.token
    }
  })
}
export function getJson (url, success, error, params = {}, isShowPop = false, urlParams, method = "post", isFile) {
  if (!url) return
  let loadingInstance
  if (isShowPop) {
    loadingInstance = ElLoading.service({
      fullscreen: true,
      customClass: 'loading page-loading'
    })
  }
  // Utils.ajaxCount++;
  var opts = {
    method,
    url: url,
    timeout: 35000,
    data: params,
    params: urlParams
  }
  if (isFile) {
    opts.headers = {
      'Content-Type': 'multipart/form-data'
    }
  }
  request({
    url: url,
    method,
    timeout: 35000,
    data: params,
    params: urlParams
  }).then((res) => {
    if (isShowPop) {
      loadingInstance.close()
    }
    console.log(res, 'res8888s')
    if (res.succflag === 0 || res.data.status === 0 || res.data.code === 0) {
      if (typeof success === 'function') {
        console.log('成功')
        success(res.data)
      }
    } else if (res.succflag === '2') { // 令牌无效则退出刷新
      // VueCookies.remove(Utils.CONFIG.cookieKey);
      // VueCookies.remove(Utils.CONFIG.cookieKeyApp);
      // Utils.showTip('error', '', '', res.data.message);
      // window.location.reload();
      if (localStorage.getItem('differentDevices')) {
        window.location.href = localStorage.getItem('differentDevices')
      } else {
        window.location.reload()
      }
    } else {
      // Utils.showTip('error', '', '', res.data.message);
      if (typeof error === 'function') error(res.data)
    }
  }, function (err) {
    console.log(err, 'poujmghyu')
    if (isShowPop) {
      loadingInstance.close()
    }
    // Utils.showTip('error', 'error', '-1');
    if (typeof error === 'function') error(err)
  })
}
