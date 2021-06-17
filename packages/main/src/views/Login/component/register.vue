<template>
  <div>
    <formCom ref="formDom" :forms="forms" :rules="rules" :config="config" @confirm="formConfirm"></formCom>
    <div class="other" v-if="!isDialog">
      <div class="oth-top">社交帐号注册</div>
      <div class="oth-icon">
        <img @click="thirdLogin('qq')" src="@/assets/login/qq.png" alt />
        <img @click="thirdLogin('wechat')" src="@/assets/login/wechat.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import formCom from "@/components/FormCom/index.vue"
import { REGISTER } from "../formConfig"
import { ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { register } from "@/api/account/register"
import { accredit, openWin } from "../thirdMethods"
import { ElMessage } from "element-plus"

export default {
  components: {
    formCom
  },
  props: {
    isDialog: {
      type: Boolean,
      require: true
    }
  },
  setup (props, { emit }) {
    const router = useRouter()
    const store = useStore()
    const rules = REGISTER.rules
    const config = props.isDialog
      ? REGISTER.config
      : { type: 1, submitText: "立即注册" }
    const forms = REGISTER.forms
    const formDom = ref(null)
    const clearValidate = () => {
      formDom.value.clearValidate()
    }

    let loading = false

    const thirdLogin = (channel) => {
      const url = accredit(store, 0, channel)
      openWin(url,
        async () => {
          router.replace('/index')
        },
        () => {
          props.isDialog && store.commit("user/SET_USER_LM", false)
          router.replace({ name: "bindMobile" })
        }
      )
    }

    const formConfirm = async formdata => {
      if (loading) return
      loading = true
      const p = { ...formdata }
      const params = {
        password: p.pwd,
        captcha: p.authcode,
        mobile: p.phone
      }
      register(params).then(res => {
        loading = false
        ElMessage({
          message: "注册成功！",
          type: "success"
        })
        props.isDialog
          ? emit("regSuccess", p.phone)
          : router.replace({ name: "login", params: { regPhone: p.phone } })
      }).catch(() => {
        loading = false
      })
    }

    return {
      rules,
      config,
      forms,
      formDom,
      clearValidate,
      formConfirm,

      thirdLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.other {
  position: relative;
  text-align: center;
  &::before {
    content: "";
    border-top: 1px dashed #222222;
    position: absolute;
    width: 100%;
    left: 0;
    top: 13px;
  }
  .oth-top {
    margin-bottom: 24px;
    border: 1px solid #222222;
    padding: 3px 8px 2px;
    font-size: 14px;
    display: inline-block;
    position: relative;
    top: 1px;
    background-color: #ffffff;
  }
  .oth-icon {
    img {
      cursor: pointer;
      &:first-child {
        margin-right: 56px;
      }
    }
  }
}
</style>
