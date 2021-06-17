<template>
  <div class="third">{{loading?'请稍后....':tipText}}</div>
</template>

<script>
import qs from "qs"
import { ref, onMounted } from "vue"
import { wxLogin, qqLogin } from '@/api/account/thirdChannel'
import { bindQQ, bindWechat } from '@/api/personal/dataSet/bind'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getUserId } from "@/utils/auth"
export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const loading = ref(true)
    const userId = getUserId()
    const tipText = ref('')
    const getInformation = async (parseUrl, api, type) => {
      // 首先拿到当前路由地址
      // 因为这里的需求绑定账号时需要发送验证码，所以暂存本地
      const saveCode = JSON.parse(localStorage.getItem("QRCODEWX"))
      // 当有验证码并且微信回调了code的时候再去做绑定操作。
      if (parseUrl.code && saveCode == null) {
        if (type === 'login') {
          store.dispatch('user/login', { params: parseUrl, api, needBInd: true, isDialog: true }).then((data) => {
            if (!data.certifyFlag) {
              localStorage.setItem('GOBIND_DATA', JSON.stringify(data))
              window.opener.closeThird(window, 0)
              return
            }
            loading.value = false
            tipText.value = '登录成功，2秒后自动关闭窗口'
            setTimeout(() => {
              window.opener.closeThird(window, 1)
            }, 2000)
          }).catch((err) => {
            loading.value = false
            tipText.value = err.message
          })
        } else {
          const params = { ...parseUrl, id: userId }
          const res = await api(params)
          loading.value = false
          tipText.value = '绑定成功，2秒后自动关闭窗口'
          setTimeout(() => {
            window.opener.closeThird(window, 1)
          }, 2000)
        }
      }
    }
    onMounted(() => {
      // console.log(window.opener.filter)
      const parseUrl = qs.parse(window.location.href.split('?')[1]) || {}
      const urlState = Number(parseUrl.state)
      if (urlState < 1) {
        getInformation(parseUrl, qqLogin, 'login')
      } else if (urlState < 2) {
        getInformation(parseUrl, bindQQ, 'bind')
      } else if (urlState < 3) {
        getInformation(parseUrl, wxLogin, 'login')
      } else {
        getInformation(parseUrl, bindWechat, 'bind')
      }
    })
    return { loading, tipText }
  }
}
</script>

<style lang="scss" scoped>
.third{
  z-index: 2050;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #FFFFFF;
}
</style>
