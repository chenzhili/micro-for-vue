// type 0登录 1绑定

export const accredit = (store, typeState, channel) => {
  const sysconfig = store.state.sysconfig[channel]
  const APPID = sysconfig.appId
  const callbackUrl = sysconfig.callbackUrl
  const REDIRECT_URI = encodeURIComponent(channel === 'wechat' ? `${callbackUrl}/thirdLogin` : `${callbackUrl}`)
  let state = Math.random() + typeState
  let winUrl = ''
  if (channel === 'wechat') {
    state = state + 2
    winUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_login&state=${state}#wechat_redirect`
  } else {
    winUrl = `https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=${APPID}&redirect_uri=${REDIRECT_URI}&state=${state}`
  }

  return winUrl
}

export const openWin = (winUrl, back, goBind) => {
  const width = 900
  const height = 540
  const left = (window.screen.width - width) / 2
  const top = (window.screen.height - height) / 2

  // type 0:跳转绑定 1:登录或个人中心绑定
  window.closeThird = (win, type) => {
    win.close()
    type ? back() : goBind()
  }
  window.open(winUrl, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, left=" + left + ", top=" + top + ", width=" + width + ", height=" + height)
}
