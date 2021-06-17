<template>
  <div>
    <div v-if="config.title" class="title">{{config.title}}</div>
    <div class="tips">
      <div v-if="sucTip" class="success tip">
        <img src="@/assets/form/right.png" alt />
        <span>{{sucTip}}</span>
      </div>
      <div v-if="errTip" class="error tip">
        <img src="@/assets/form/error.png" alt />
        <span>{{errTip}}</span>
      </div>
    </div>
    <el-form :model="form" :rules="rules" ref="formDom" @keypress.enter="submit">
      <el-form-item v-for="(item,i) in forms" :key="i" v-bind="item.item">
        <template v-if="item.type=='select'">
          <el-select
            v-model="form[item.item.prop]"
            v-bind="item.attrs"
            clearable
          >
            <el-option
              v-for="(opt,index) in optionList[item.item.prop]||[]"
              :key="index"
              :label="opt.label"
              :value="opt.value"
            ></el-option>
          </el-select>
        </template>
        <template v-else-if="item.type=='password'">
          <el-input
            v-model="form[item.item.prop]"
            v-bind="item.attrs"
            :type="pwFlag[item.item.prop]?'text':'password'"
            @input="pwdInt(item.item.prop)"
          >
            <template #suffix>
              <div class="pw-icon">
                <img
                  src="@/assets/form/xsmm.png"
                  alt
                  v-if="pwFlag[item.item.prop]"
                  @click="changeFlag(item.item.prop)"
                />
                <img src="@/assets/form/ycmm.png" alt v-else @click="changeFlag(item.item.prop)" />
              </div>
            </template>
          </el-input>
        </template>
        <template v-else-if="item.type=='authcode'">
          <div class="authcode">
            <el-input
              v-model="form[item.item.prop]"
              v-bind="item.attrs"
              @input="onlyNumInt(item.item.prop)"
              clearable
            ></el-input>
            <el-button
              :disabled="!form[verifyPhoneProp]||!form[verifyNumProp]||!checkFlag"
              type="danger"
              @click="sendMsg"
            >{{sending?phoneCount+'s':'获取验证码'}}</el-button>
          </div>
        </template>
        <template v-else-if="item.type=='numVerify'">
          <div class="num-verify">
            <el-input
              v-model="form[item.item.prop]"
              v-bind="item.attrs"
              @input="onlyNumInt(item.item.prop)"
              clearable
            ></el-input>
            <img @click="getIdentifyingCode" :src="numVerifyCode" alt="点击更换" title="点击更换" />
          </div>
        </template>
        <template v-else-if="item.type=='phone'">
          <el-input
            @input="phoneInt(item.item.prop)"
            v-model="form[item.item.prop]"
            v-bind="item.attrs"
            @blur="checkTel(item.item.prop)"
            clearable
          ></el-input>
        </template>
        <template v-else-if="item.type=='mailCaptcha'">
          <div class="authcode">
            <el-input
              v-model="form[item.item.prop]"
              v-bind="item.attrs"
              @input="onlyNumInt(item.item.prop)"
              clearable
            ></el-input>
            <el-button
              :disabled="!form[verifyPhoneProp]||!form[verifyNumProp]||!checkFlag"
              type="danger"
              @click="sendMsg"
            >{{mailLoading?emailCount:'获取验证码'}}</el-button>
          </div>
        </template>
        <template v-else>
          <el-input v-model="form[item.item.prop]" v-bind="item.attrs" ></el-input>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submit"
          :type="canSubmit||config.type===4?'danger':'info'"
          class="submit-btn"
          :disabled="!canSubmit&&config.type!==4"
        >{{config.submitText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue"
import {
  regVerifySms,
  loginVerifySms,
  forgetVerifySms,
  checkMobileReg,
  checkMobileLogin
} from "@/api/account/proved"
import { bindCaptcha } from '@/api/personal/dataSet/bind'
import { forgetVerifyEmail } from "@/api/account/forget"
import { getAesString, deepClone } from "@/utils/index"
export default {
  props: {
    forms: {
      type: Array,
      require: true,
      default () {
        return []
      }
    },
    rules: {
      type: Object,
      require: true,
      default () {
        return {}
      }
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    optionList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: ['confirm', 'notBind'],
  setup (props, { emit }) {
    const form = ref({})
    const pwFlag = ref({})
    const sending = ref(false)
    const sucTip = ref("")
    const errTip = ref("")
    const verifyPhoneProp = ref("")
    const verifyNumProp = ref("")
    const pwdConfirmProp = ref({})
    const nowTime = ref(new Date().getTime())
    const numVerifyCode = ref("")
    const mailLoading = ref(false)
    const checkFlag = ref(false)
    const countSet = { m: 5, s: 0 }
    const emailCount = ref('05:00')
    const phoneCount = ref(0)
    let startSending
    let timer
    // 初始
    const init = () => {
      // 设置数据对象属性
      props.forms.map(item => {
        form.value[item.item.prop] = ""
      })

      // 设置各密码项的显示和隐藏Flag
      const pwdItems = props.forms.filter(item => item.type === "password")
      pwdItems.map(item => {
        pwFlag.value[item.item.prop] = false
      })

      // 是否有密码确认
      const pwdConfirm = pwdItems.find(item => item.pwdConfirm === "confirm")
      const pwdTarget = pwdItems.find(item => item.pwdConfirm === "target")
      if (pwdConfirm && pwdTarget) {
        pwdConfirmProp.value = {
          confirm: pwdConfirm.item.prop,
          target: pwdTarget.item.prop,
          isConfirm: true
        }
      }
      const verifyItem = props.forms.find(item => item.verify)
      if (verifyItem) verifyPhoneProp.value = verifyItem.item.prop

      haveIdentifyingCode()
    }

    // 邮箱验证码倒计时
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

    // 限制输入方法
    const phoneInt = prop => {
      form.value[prop] = form.value[prop].replace(/\D/g, "")
    }
    const pwdInt = prop => {
      form.value[prop] = form.value[prop].replace(/[^\w./]/gi, "")
    }
    const onlyNumInt = prop => {
      form.value[prop] = form.value[prop].replace(/[^\d]/g, "")
    }

    // 表单顶部提示方法
    const showTip = (type, text) => {
      clearTip()
      if (type === "sucTip") sucTip.value = text
      if (type === "errTip") errTip.value = text
    }

    // 清空
    const clearTip = () => {
      sucTip.value = ""
      errTip.value = ""
    }

    // 表单选择验证
    const singleValidate = async propNames => {
      let validate = true
      if (propNames.length) {
        await formDom.value.validateField(propNames, err => {
          if (err) validate = false
        })
      }
      return validate
    }

    // 密码显示隐藏
    const changeFlag = prop => {
      pwFlag.value[prop] = !pwFlag.value[prop]
    }

    // 表单组件自带方法  重置和清空验证
    const formDom = ref(null)

    const reset = () => {
      formDom.value.resetFields()
    }
    const clearValidate = () => {
      formDom.value.clearValidate()
    }

    // 验证手机号
    const checkTel = async prop => {
      if (props.config.type === 4) {
        checkFlag.value = true
        return
      }
      if (await singleValidate([prop])) {
        if (!props.config.type) {
          console.error(
            "请在传入的config中带入type参数【1：注册2：登录3：忘记密码】"
          )
          return
        }
        const api = props.config.type === 1 || props.config.type === 4 ? checkMobileReg : checkMobileLogin
        const res = await api({ mobile: form.value[prop] })
        if (!res.data) {
          checkFlag.value = false
          props.config.type === 1 || props.config.type === 4
            ? showTip("errTip", "该手机号已被注册或绑定")
            : showTip("errTip", "该手机号未绑定账号")
        } else {
          clearTip()
          checkFlag.value = true
        }
      }
    }

    // 获取图形验证码
    const haveIdentifyingCode = () => {
      const numVerifyItems = props.forms.filter(
        item => item.type === "numVerify"
      )
      if (numVerifyItems.length) {
        verifyNumProp.value = numVerifyItems[0].item.prop
        getIdentifyingCode()
      }
    }
    // 获取图形验证码
    const getIdentifyingCode = () => {
      if (!nowTime.value) return false
      nowTime.value = new Date().getTime()
      switch (props.config.type) {
        case 1:
          numVerifyCode.value = `/usercenter/custom/regVerifyImg?eventId=${nowTime.value}`
          break
        case 2:
          numVerifyCode.value = `/usercenter/login/captchaImg?eventId=${nowTime.value}`
          break
        case 3:
          numVerifyCode.value = `/usercenter/custom/forgetVerifyImg?eventId=${nowTime.value}`
          break
        case 4:
          numVerifyCode.value = `/usercenter/profile/bindImg?eventId=${nowTime.value}`
          break
      }
    }

    // 获取邮箱验证码
    const sendMailMsg = async (email) => {
      if (mailLoading.value) return
      const res = await forgetVerifyEmail({ email })
      if (res.code !== '000000') return
      mailLoading.value = true
      showTip("sucTip", '已发送邮箱验证码，请查看邮箱')
      countDown(countSet, () => {
        mailLoading.value = false
        showTip("errTip", "邮箱验证码已过期，请重新获取")
      })
    }

    // 获取短信验证码
    const sendMsg = async () => {
      if (!(await singleValidate([verifyPhoneProp.value, verifyNumProp.value]))) {
        showTip("errTip", "请先正确填写手机号和数字验证码")
        return
      }
      if (sending.value) return
      if (!checkFlag.value) return
      // 发送短信请求
      if (!props.config.type) {
        console.error(
          "请在传入的config中带入type参数【1：注册2：登录3：忘记密码】"
        )
        return false
      }
      let api
      const params = {
        mobile: form.value[verifyPhoneProp.value],
        eventId: nowTime.value,
        captcha: getAesString(form.value[verifyNumProp.value])
      }
      let token
      switch (props.config.type) {
        case 1:
          api = regVerifySms
          break
        case 2:
          api = loginVerifySms
          break
        case 3:
          api = forgetVerifySms
          break
        case 4:
          api = bindCaptcha
          token = props.config.token
          break
      }
      api(params, token)
        .then(res => {
          sending.value = true
          showTip("sucTip", '已发送手机验证码，请查看手机')
          phoneCount.value = 60
          startSending = setInterval(() => {
            if (phoneCount.value <= 0) {
              sending.value = false
              showTip("errTip", "短信验证码已过期，请重新获取")
              form.value[verifyNumProp.value] = ''
              getIdentifyingCode()
              clearInterval(startSending)
            } else {
              phoneCount.value--
            }
          }, 1000)
        })
        .catch(() => {
          getIdentifyingCode()
          form.value[verifyNumProp.value] = ''
          sending.value = false
        })
    }

    // 提交表单
    const submit = async () => {
      let validate = true
      await formDom.value.validate().catch(() => {
        validate = false
      })
      if (!validate) {
        const haveInt = Object.values(form.value).some(item => item !== "")
        if (props.config.type === 4 && !haveInt) {
          formDom.value.clearValidate()
          emit("notBind")
        }
        return
      }
      if (pwdConfirmProp.value.isConfirm) {
        if (
          form.value[pwdConfirmProp.value.confirm] !==
          form.value[pwdConfirmProp.value.target]
        ) {
          showTip("errTip", "两次输入的密码不相同")
          return
        }
      }

      // 验证码密码加密
      const encryptItems = props.forms.filter(item => item.encrypt === true)
      const formData = deepClone(form.value)
      encryptItems.map(item => {
        for (const i in formData) {
          if (i === item.item.prop) {
            formData[i] = getAesString(formData[i])
          }
        }
      })
      emit("confirm", formData)
    }

    onMounted(() => {
      init()
    })
    onUnmounted(() => {
      startSending && clearInterval(startSending)
      timer && clearInterval(timer)
    })
    return {
      form,
      pwFlag,
      sending,
      sucTip,
      errTip,
      verifyPhoneProp,
      verifyNumProp,
      numVerifyCode,
      nowTime,
      mailLoading,
      checkFlag,
      emailCount,
      phoneCount,

      init,
      showTip,
      clearTip,
      changeFlag,
      reset,
      clearValidate,
      sendMsg,
      submit,
      getIdentifyingCode,
      sendMailMsg,

      phoneInt,
      pwdInt,
      onlyNumInt,
      checkTel,

      formDom,

      canSubmit: computed(() => {
        const values = Object.values(form.value)
        const res = values.every(item => item !== "")
        return res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 20px;
  color: #e0585b;
  padding: 32px 0;
}
.tips {
  text-align: left;
  font-size: 14px;
  color: $primary-text-color;
  img {
    margin-right: 8px;
    vertical-align: text-bottom;
  }
  .tip {
    margin-bottom: 20px;
  }
  .error {
    height: 42px;
    background-color: #ffeeee;
    border: 1px solid #e0585b;
    border-radius: 4px;
    padding: 0 18px;
    span {
      line-height: 42px;
    }
  }
}
.el-select {
  width: 100%;
}
.el-input-number {
  width: 100%;
  .el-input__inner {
    text-align: left !important;
  }
}
.pw-icon {
  position: absolute;
  cursor: pointer;
  right: 3px;
}
.authcode {
  display: flex;
  justify-content: space-between;
  .el-input {
    width: 60%;
  }
  .el-button {
    width: 32%;
    padding: 12px 12px;
  }
}
.num-verify {
  display: flex;
  justify-content: space-between;
  .el-input {
    width: 60%;
  }
  img {
    cursor: pointer;
    width: 32%;
  }
}
.submit-btn {
  width: 100%;
}
</style>
