<template>
  <div class="change-psw" v-loading="loading">
    <el-form
      v-if="formType"
      :rules="rules"
      :model="formData"
      status-icon
      ref="formDom"
      class="demo-ruleForm"
    >
      <el-form-item prop="oldPass" v-if="formType===2">
        <el-input
          type="password"
          v-model="formData.oldPass"
          autocomplete="off"
          placeholder="原密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="newPass">
        <el-input
          type="password"
          v-model="formData.newPass"
          autocomplete="off"
          :placeholder="formType===2?'新密码':'设置密码'"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="affirmPass">
        <el-input
          type="password"
          v-model="formData.affirmPass"
          autocomplete="off"
          placeholder="确认密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存修改</el-button>
      </el-form-item>
    </el-form>
    <div v-else-if="formType===0">
      第三方渠道登录用户，请在认证后设置密码
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import { updatePassword, passwordStatus, initPassword } from "@/api/personal/dataSet/updatePassword"
import { ElMessage } from "element-plus"
import { getUserId, getCertifyFlag } from "@/utils/auth"
import { getAesString } from "@/utils/index"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  setup () {
    onMounted(() => {
      confirmType()
    })

    const store = useStore()
    const router = useRouter()
    const userId = getUserId()

    const formDom = ref(null)
    const formData = ref({})
    const loading = ref(true)

    const formType = ref(0)
    const PWD_REG = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/g

    const rules = ref({
      newPass: [
        { required: true, message: "请设置新密码", trigger: "blur" },
        { message: "密码不符合规则，6-12位密码，字母/数字/符号至少2种", pattern: PWD_REG, trigger: "blur" }
      ],
      affirmPass: [
        { required: true, message: "请再次确认密码", trigger: "blur" },
        { message: "密码不符合规则，6-12位密码，字母/数字/符号至少2种", pattern: PWD_REG, trigger: "blur" }
      ]
    })

    const confirmType = async () => {
      const res = await passwordStatus()
      const isCertify = getCertifyFlag()
      // 0 三方未认证（无密码） 1 三方已认证（无密码） 2 有密码
      formType.value = res.data ? 2 : isCertify === '1' ? 1 : 0
      formData.value = formType.value === 1
        ? {
          newPass: "",
          affirmPass: ""
        } : {
          oldPass: "",
          newPass: "",
          affirmPass: ""
        }
      if (formType.value === 2) {
        rules.value.oldPass = [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { message: "密码不符合规定，6-12位密码，英文（大小写）+数字格式", pattern: PWD_REG, trigger: "blur" }
        ]
      }
    }

    const submitForm = async () => {
      const validate = await formDom.value.validate()
      if (formData.value.newPass !== formData.value.affirmPass) {
        ElMessage({
          message: "两次输入的密码不相同",
          type: "error"
        })
        return
      }
      if (formType.value === 2) {
        const params = {
          id: userId,
          newPassword: getAesString(formData.value.newPass),
          oldPassword: getAesString(formData.value.oldPass)
        }
        const res = await updatePassword(params)
        ElMessage({
          message: "系统检测你的密码已被修改，请重新登录",
          type: "success"
        })
        setTimeout(() => {
          store.dispatch("user/logout").then(res => {
            router.replace("/login")
          })
        }, 1000)
      } else {
        const params = { password: getAesString(formData.value.newPass) }
        const res = await initPassword(params)
        ElMessage({
          message: "系统检测你的密码已被修改，请重新登录",
          type: "success"
        })
        setTimeout(() => {
          store.dispatch("user/logout").then(res => {
            router.replace("/login")
          })
        }, 1000)
      }
    }

    return {
      formData,
      formDom,
      rules,
      loading,

      submitForm,
      formType
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input {
  opacity: 1;
  width: 322px;
  height: 40px;
  border-radius: 5px;
}
::v-deep .el-input__inner {
  color: #222;
  background: #f4f4f4;
}
::v-deep .el-button--primary {
  width: 322px;
  border-radius: 4px;
}
.change-psw {
  width: 878px;
  height: 322px;
  background: #ffffff;
  border-radius: 9px;
  margin: 20px 0 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ebebeb;
}
</style>
