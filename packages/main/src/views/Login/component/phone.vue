<template>
  <div>
    <formCom ref="formDom" :forms="forms" :rules="rules" :config="config" @confirm="formConfirm"></formCom>
  </div>
</template>

<script>
import formCom from "@/components/FormCom/index.vue"
import { PHONE_PWD_LOGIN, PHONE_AUTHCODE_LOGIN } from "../formConfig"
import { loginByPhone } from "@/api/account/login"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
export default {
  components: {
    formCom
  },
  props: {
    autoLogin: {
      type: Boolean
    },
    isDialog: {
      type: Boolean,
      require: true
    }
  },
  setup (props) {
    const formDom = ref(null)
    const rules = ref(PHONE_PWD_LOGIN.rules)
    const forms = ref(PHONE_PWD_LOGIN.forms)
    const config = PHONE_PWD_LOGIN.config
    let isNumVerify = false
    let loading = false

    const router = useRouter()
    const store = useStore()

    const clearValidate = () => {
      formDom.value.clearValidate()
    }

    const addNumVerify = () => {
      forms.value = forms.value.concat([
        {
          item: { prop: "numVerify" },
          type: "numVerify",
          attrs: { placeholder: "请输入图形验证码" },
          encrypt: true
        }
      ])
      rules.value.numVerify = [
        { required: true, message: "请输入图形验证码", trigger: "blur" },
        { max: 4, min: 4, message: "验证码为4位纯数字", trigger: "blur" }
      ]
    }

    const formConfirm = async formData => {
      if (loading) return
      loading = true
      const p = { ...formData }
      const params = {
        phone: p.phone,
        password: p.password,
        verifyImg: 0,
        autoLogin: props.autoLogin ? 1 : 0
      }
      if (isNumVerify) {
        params.verifyImg = 1
        params.captcha = p.numVerify
        params.eventId = formDom.value.nowTime
      }
      try {
        await store.dispatch("user/login", { params, api: loginByPhone, isDialog: props.isDialog })
        loading = false
        props.isDialog
          ? router.go(0)
          : router.push({ path: "/index" })
      } catch (error) {
        loading = false
        if (!isNumVerify) {
          addNumVerify()
          isNumVerify = true
        }
        formDom.value.getIdentifyingCode()
      }
    }

    const echoPhone = phone => {
      formDom.value.form.phone = phone
    }

    return {
      forms,
      rules,
      config,
      clearValidate,
      formDom,
      formConfirm,
      echoPhone
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
