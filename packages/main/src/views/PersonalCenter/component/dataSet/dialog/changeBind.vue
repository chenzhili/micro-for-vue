<template>
  <dialog-com
    title="验证你的手机号，完成手机账号的绑定"
    :visible="visible"
    :coop="{ show: true,confirmTxt:'绑定手机',cancelTxt:'暂不绑定' }"
    :width="380"
    @confrimMethod="coopMethod"
  >
    <div class="container">
      <el-form
        ref="formDom"
        :model="form"
        :rules="rules"
        class="demo-dynamic"
        label-position="left"
      >
        <el-form-item prop="phone" class="FormF">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="numVerify" class="FormT">
          <el-input v-model="form.numVerify" placeholder="请输入验证码">
            <template #append>
              <div class="divIdentifyingCode">
                <img @click="getIdentifyingCode" :src="numVerifyCode" alt="点击更换" title="点击更换" />
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha" class="FormY">
          <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
          <el-button
            :disabled="isSend||!form.phone||!form.numVerify"
            class="no-border"
            type="danger"
            @click="sendMsg"
          >{{isSend?`${countDown}s`:'发送验证码'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </dialog-com>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue"
import { checkMobileLogin } from "@/api/account/proved"
import { bindCaptcha, bindMobile } from "@/api/personal/dataSet/bind"
import { getAesString } from "@/utils/index"
import { PHONE_REG } from "@/utils/validate"
import { ElMessage } from "element-plus"
import { getCertifyFlag, setCertifyFlag } from "@/utils/auth"
import { useStore } from 'vuex'

export default {
  components: {},
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
    onMounted(() => {
      getIdentifyingCode()
    })
    const form = ref({})
    const nowTime = ref(new Date().getTime())
    const formDom = ref(null)
    const numVerifyCode = ref("")
    const sendFlag = ref(false)
    const isSend = ref(false)
    const countDown = ref(0)
    const timer = ref(null)
    const store = useStore()

    const rules = {
      phone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
          message: "请输入正确格式的手机号",
          pattern: PHONE_REG,
          trigger: "blur"
        }
      ],
      numVerify: [
        { required: true, message: "请输入数字验证码", trigger: "blur" },
        { max: 4, min: 4, message: "验证码为4位纯数字", trigger: "blur" }
      ],
      captcha: [
        { required: true, message: "请输入短信验证码", trigger: "blur" },
        { max: 4, min: 4, message: "验证码为4位纯数字", trigger: "blur" }
      ]
    }

    const tipDialog = (message, type) => {
      ElMessage({
        message,
        type
      })
    }

    const sendMsg = async () => {
      // if (!sendFlag.value) return
      if (isSend.value) return
      let validate = true
      await formDom.value.validateField(["phone", "numVerify"], err => {
        if (err) validate = false
      })
      if (!validate) {
        tipDialog("请先正确填写手机号和数字验证码", "success")
        return false
      }
      const params = {
        mobile: form.value.phone,
        eventId: nowTime.value,
        captcha: getAesString(form.value.numVerify)
      }
      const res = await bindCaptcha(params)
      tipDialog("验证码发送成功，请查看手机", "success")
      isSend.value = true
      countDown.value = 60
      timer.value = setInterval(() => {
        if (countDown.value <= 0) {
          isSend.value = false
          tipDialog("手机验证码已过期，请重新获取", "error")
          timer.value && clearInterval(timer.value)
          getIdentifyingCode()
        } else {
          countDown.value--
        }
      }, 1000)
    }

    const getIdentifyingCode = () => {
      if (!nowTime.value) return false
      nowTime.value = new Date().getTime()
      numVerifyCode.value = `/usercenter/profile/bindImg?eventId=${nowTime.value}`
    }

    const coopMethod = async type => {
      if (type === "confirm") {
        const validate = await formDom.value.validate()
        const params = {
          id: props.userId,
          phone: form.value.phone,
          captcha: form.value.captcha
        }
        params.captcha = getAesString(params.captcha)
        const res = await bindMobile(params)
        timer.value && clearInterval(timer.value)
        if (res.data) {
          const api = () => {
            return Promise.resolve({ data: res.data })
          }
          await store.dispatch("user/login", { params: {}, api })
        }
        if (!getCertifyFlag()) {
          setCertifyFlag(1)
        }
        emit("changeVisible", false)
      } else emit("changeVisible", false)
    }
    onUnmounted(() => {
      timer.value && clearInterval(timer.value)
    })
    return {
      coopMethod,
      form,
      numVerifyCode,

      formDom,
      rules,

      getIdentifyingCode,

      sendMsg,

      countDown,
      isSend
    }
  }
}
</script>

<style lang="scss" scoped>
.no-border {
  border: none !important;
}
.container {
  .FormF {
    &::v-deep(.el-input) {
      width: 340px;
    }
    &::v-deep(.el-button) {
      width: 340px;
    }
  }
  .FormT {
    &::v-deep(.el-input) {
      width: 340px;
    }
  }
  .FormY {
    &::v-deep(.el-input) {
      width: 210px;
      margin-right: 10px;
    }
  }
}
</style>
