<template>
  <div class="bindMobile-contain">
    <img class="title" src="@/assets/login/title.png" alt="">
    <!-- <formContent :isDialog="false"></formContent> -->
    <div class="form-content">
      <formCom
        ref="formDom"
        :forms="forms"
        :rules="rules"
        :config="config"
        @confirm="formConfirm"
        @notBind="notBind"
      ></formCom>
    </div>

    <div class="report">
      <span class="line">蜀公网安备 33010002000124号</span>
      <span class="line">蜀ICP备09109183号-25</span>
      <span>©CDQL QLZHY,powered by cdql.</span>
    </div>
  </div>
</template>

<script>
// import formContent from "./component/formContent"
import { ref } from "vue"
import formCom from "@/components/FormCom/index.vue"
import { bindMobile } from '@/api/personal/dataSet/bind'
import { BIND_MOBILE } from "./formConfig"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import ConfirmDialog from "@/plugins/dialog/ConfirmDialog"
import { ElMessage } from 'element-plus'
export default {
  components: {
    formCom
  },
  name: "bindMobile",
  setup () {
    const router = useRouter()
    const store = useStore()
    const loginData = JSON.parse(localStorage.getItem('GOBIND_DATA'))
    localStorage.removeItem('GOBIND_DATA')

    const config = ref(BIND_MOBILE.config)
    const token = loginData.token
    config.value.token = token

    const formConfirm = async formData => {
      const params = {
        id: loginData.id,
        phone: formData.phone,
        captcha: formData.authcode
      }
      const res = await bindMobile(params, token)
      loginData.certifyFlag = 1
      const api = () => {
        return Promise.resolve({ data: res.data || loginData })
      }
      store.dispatch("user/login", { params: {}, api, isMessage: false }).then(data => {
        ElMessage({
          message: '绑定并登录成功',
          type: 'success',
          duration: 5 * 1000,
          showClose: true
        })
        router.replace({ path: "/index" })
      })
    }

    const notBind = () => {
      const api = () => {
        return Promise.resolve({ data: loginData })
      }
      ConfirmDialog({
        message: "确认以后再绑定手机？",
        maskClose: true,
        sub: "绑定手机号后成为认证用户"
      }).then(() => {
        store.dispatch("user/login", { params: {}, api }).then(data => {
          router.replace({ path: "/index" })
        })
      })
    }
    return {
      forms: BIND_MOBILE.forms,
      config,
      rules: BIND_MOBILE.rules,

      formConfirm,
      notBind
    }
  }
}
</script>

<style lang="scss" scoped>
.form-content {
  width: 420px;
  background-color: #ffffff;
  padding: 0 50px 32px;
  border-radius: 8px;
  margin: auto;
  box-sizing: border-box;
}
.bindMobile-contain {
  width: 100%;
  background: url("@/assets/login/login_bg.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  padding-top: 80px;
}
.title {
  display: block;
  text-align: center;
  margin: 0 auto 50px;
}
.report {
  font-size: 12px;
  color: #ffffff;
  position: fixed;
  bottom: 77px;
  left: 50%;
  transform: translateX(-50%);
  span {
    margin-right: 33px;
  }
  .line {
    position: relative;
    &::after {
      content: "";
      height: 11px;
      border-left: 1px solid #ffffff;
      position: absolute;
      right: -16px;
      top: 3px;
    }
  }
}
</style>
