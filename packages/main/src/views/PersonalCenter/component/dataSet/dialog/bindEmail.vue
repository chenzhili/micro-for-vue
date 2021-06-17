<template>
  <dialog-com
    title="绑定邮箱账号"
    :visible="visible"
    :coop="{ show: true,confirmTxt:'绑定邮箱',cancelTxt:'暂不绑定' }"
    :width="365"
    @confrimMethod="coopMethod"
  >
    <div class="container">
      <el-form
        ref="formDom"
        :model="formData"
        :rules="rules"
        class="demo-dynamic"
        label-width="70px"
        label-position="left"
      >
        <el-form-item prop="email" label="邮箱账号" class="FormF">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item prop="captcha" label="验证码" class="FormT">
          <el-input v-model="formData.captcha"></el-input>
          <el-button
            :disabled="isSend||!formData.email"
            class="no-border"
            type="danger"
            @click="sendCaptcha"
          >{{isSend?emailCount:'获取验证码'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </dialog-com>
</template>

<script>
import { bindEmailReq, bindCaptchaEmail } from "@/api/personal/dataSet/bind"
import { checkEmail } from "@/api/account/proved"
import { EMAIL_REG } from "@/utils/validate"
import { getAesString } from "@/utils/index"
import { ref, onUnmounted } from "vue"
import { ElMessage } from "element-plus"

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  emits: ["changeVisible"],
  setup (props, { emit }) {
    const formData = ref({})
    const formDom = ref(null)
    const sendFlag = ref(false)
    const isSend = ref(false)
    const countSet = { m: 5, s: 0 }
    const emailCount = ref('05:00')
    let timer

    const rules = {
      email: [
        { required: true, message: "请输入绑定的邮箱地址", trigger: "blur" },
        {
          message: "请输入正确格式的邮箱地址",
          pattern: EMAIL_REG,
          trigger: "blur"
        }
      ],
      captcha: [
        { required: true, message: "请输入邮箱验证码", trigger: "blur" },
        { max: 4, min: 4, message: "验证码为4位纯数字", trigger: "blur" }
      ]
    }
    const tipDialog = (message, type) => {
      ElMessage({
        message,
        type
      })
    }

    const checkMail = async () => {
      let validate = true
      await formDom.value.validateField("email", err => {
        if (err) validate = false
      })
      if (!validate) {
        sendFlag.value = false
        return
      }
      const res = await checkEmail({ email: formData.value.email })
      if (res.data === "0") {
        sendFlag.value = true
      } else {
        tipDialog("该邮箱已被绑定", "error")
        sendFlag.value = false
      }
    }

    const countDown = (countSet, call) => {
      timer = setInterval(() => {
        if (countSet.m <= 0 && countSet.s <= 0) {
          clearInterval(timer)
          call()
        } else {
          if (countSet.s <= 0) {
            countSet.s = 59
            countSet.m--
          } else {
            countSet.s--
          }
          countSet.s >= 10 ? emailCount.value = `0${countSet.m}:${countSet.s}` : emailCount.value = `0${countSet.m}:0${countSet.s}`
        }
      }, 1000)
    }

    const sendCaptcha = async () => {
      await checkMail()
      if (!sendFlag.value) return
      if (isSend.value) return
      const res = await bindCaptchaEmail({ email: formData.value.email })
      tipDialog("验证邮件已发送，请查看邮箱", "success")
      isSend.value = true
      countDown(countSet, () => {
        isSend.value = false
        tipDialog("邮箱验证码已过期，请重新获取", "error")
      })
    }

    const coopMethod = async type => {
      if (type === "confirm") {
        const validate = await formDom.value.validate()
        const params = { ...formData.value, id: props.userId }
        params.captcha = getAesString(params.captcha)
        const res = await bindEmailReq(params)
        tipDialog("绑定成功", "success")
        formData.value = {}
        emit("changeVisible", false)
      } else emit("changeVisible", false)
    }
    onUnmounted(() => {
      timer && clearInterval(timer)
    })

    return {
      coopMethod,
      checkMail,
      sendCaptcha,

      rules,
      formData,
      formDom,

      isSend,
      emailCount
    }
  }
}
</script>

<style lang="scss" scoped>
.no-border {
  width: 110px;
  border: none !important;
}
.container {
  .FormF {
    &::v-deep(.el-input) {
      width: 250px;
    }
  }
  .FormT {
    &::v-deep(.el-input) {
      width: 120px;
      margin-right: 10px;
    }
  }
}
</style>
