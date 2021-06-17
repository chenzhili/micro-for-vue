<template>
  <formCom ref="formDom" :forms="forms" :rules="rules" :config="config" @confirm="formConfirm"></formCom>
</template>

<script>
import formCom from "@/components/FormCom/index.vue"
import { PHONE_AUTHCODE_LOGIN } from "../formConfig"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { ref } from "vue"
import { loginByCaptcha } from "@/api/account/login"
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
    let loading = false

    const router = useRouter()
    const store = useStore()

    const clearValidate = () => {
      formDom.value.clearValidate()
    }

    const formConfirm = formData => {
      if (loading) return
      loading = true
      const p = { ...formData }
      const params = {
        phone: p.phone,
        captcha: p.authcode,
        autoLogin: props.autoLogin ? 1 : 0
      }
      store
        .dispatch("user/login", { params, api: loginByCaptcha, isDialog: props.isDialog })
        .then(() => {
          loading = false
          props.isDialog
            ? router.go(0)
            : router.push({ path: "/index" })
        })
    }

    return {
      rules: PHONE_AUTHCODE_LOGIN.rules,
      config: PHONE_AUTHCODE_LOGIN.config,
      forms: PHONE_AUTHCODE_LOGIN.forms,
      formDom,
      clearValidate,
      formConfirm
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
