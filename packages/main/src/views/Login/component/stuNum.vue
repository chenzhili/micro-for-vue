<template>
  <formCom
    ref="formDom"
    :forms="forms"
    :rules="rules"
    :config="config"
    :optionList="{school:schoolList}"
    @confirm="formConfirm"
  ></formCom>
</template>

<script>
import formCom from "@/components/FormCom/index.vue"
import { STUNUM_LOGIN } from "../formConfig"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from 'vuex'
import { loginByStuNum } from "@/api/account/login"

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
    const clearValidate = () => {
      formDom.value.clearValidate()
    }

    const router = useRouter()
    const store = useStore()

    let loading = false

    const formConfirm = (formData) => {
      if (loading) return
      loading = true
      const p = { ...formData }
      const params = {
        schoolNo: 9,
        studentNo: p.stuNum,
        password: p.password,
        autoLogin: props.autoLogin ? 1 : 0
      }
      console.log(props.isDialog)
      store.dispatch('user/login', { params, api: loginByStuNum, needBInd: true, isDialog: props.isDialog }).then((data) => {
        if (!data.certifyFlag) {
          localStorage.setItem('GOBIND_DATA', JSON.stringify(data))
          router.push({ name: "bindMobile" })
          return
        }
        loading = false
        props.isDialog
          ? router.go(0)
          : router.push({ path: "/index" })
      })
    }
    return {
      rules: STUNUM_LOGIN.rules,
      config: STUNUM_LOGIN.config,
      forms: STUNUM_LOGIN.forms,
      schoolList: [
        { label: "中国人民解放军95871部队", value: 1 },
        { label: "中国农业大学", value: 2 },
        { label: "中国人民大学", value: 3 },
        { label: "中国工商业大学", value: 4 }
      ],
      formDom,
      clearValidate,
      formConfirm
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
