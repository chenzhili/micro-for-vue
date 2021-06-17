<template>
  <div class="forget-contain">
    <div class="content">
      <div class="top">
        <div class="mark">
          <svg-icon
            style="width:30px;height:30px"
            icon-class="operate_icon"
            class-name="operate_icon"
          ></svg-icon>
          <span>乾隆智慧云</span>
        </div>
        <div class="return">
          <span class="line">
            已有帐号，
            <span class="c-span" @click="$router.push('/login')">立即登录</span>
          </span>
          <span class="c-span" @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
      <div class="contain">
        <div class="contain-top">
          忘记密码
          <span
            @click="changeFindType(findType=='mail'?'phone':'mail')"
            class="c-span"
          >{{findType=='mail'?'通过手机号找回':'通过邮箱找回'}}</span>
        </div>
        <div class="contain-form">
          <div style="width:320px">
            <formCom
              v-if="findType=='mail'&&!hasInputMail"
              ref="formDom1"
              :forms="forms1"
              :rules="rules1"
              :config="config1"
              @confirm="getMailAdd"
            ></formCom>
            <formCom
              v-if="findType=='mail'&&hasInputMail"
              ref="formDom2"
              :forms="forms2"
              :rules="rules2"
              :config="config2"
              @confirm="findByEmail"
              @getEmailCaptcha="sendAgain"
            ></formCom>
            <formCom
              v-if="findType=='phone'"
              ref="formDom3"
              :forms="forms3"
              :rules="rules3"
              :config="config3"
              @confirm="findByPhone"
            ></formCom>
          </div>
        </div>
      </div>
      <div class="report">
        <span class="line">蜀公网安备 33010002000124号</span>
        <span class="line">蜀ICP备09109183号-25</span>
        <span>©CDQL QLZHY,powered by cdql.</span>
      </div>
    </div>
  </div>
</template>

<script>
import formCom from "@/components/FormCom/index.vue"
import { ElMessage } from "element-plus"
import { FINDBYMAIL, INPUT_MAIL, FINDBYPHONE } from "./formConfig"
import { ref, onMounted, nextTick } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import {
  forgetByPhone,
  forgetVerifyEmail,
  forgetByEmail
} from "@/api/account/forget"
import { checkEmail } from "@/api/account/proved"
export default {
  components: {
    formCom
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const findType = ref("phone")
    const hasInputMail = ref(false)
    const changeFindType = type => {
      findType.value = type
    }

    let email = ""
    // 输入邮箱地址表单
    const formDom1 = ref(null)

    const getMailAdd = async data => {
      const res = await checkEmail({ email: data.mail })
      if (res.data === "3") {
        email = data.mail
        hasInputMail.value = true
        nextTick(() => {
          formDom2.value.sendMailMsg(email)
        })
      } else if (res.data === "1") {
        ElMessage({
          message: "该邮箱未设置密码",
          type: "error"
        })
      } else {
        ElMessage({
          message: "邮箱未绑定",
          type: "error"
        })
      }
    }
    // 通过邮箱找回表单
    const formDom2 = ref(null)

    const findByEmail = formData => {
      const p = { ...formData }
      const params = {
        email,
        captcha: p.authcode,
        password: p.pwd
      }
      store
        .dispatch("user/login", {
          params,
          api: forgetByEmail,
          isMessage: false
        })
        .then(() => {
          ElMessage({
            message: "重置登录成功！",
            type: "success"
          })
          router.replace({ path: "/index" })
        })
    }

    const sendAgain = () => {
      formDom2.value.sendMailMsg(email)
    }

    // 通过手机找回表单
    const formDom3 = ref(null)

    const findByPhone = formData => {
      const p = { ...formData }
      const params = {
        mobile: p.phone,
        captcha: p.authcode,
        password: p.pwd
      }
      store
        .dispatch("user/login", {
          params,
          api: forgetByPhone,
          isMessage: false
        })
        .then(() => {
          ElMessage({
            message: "重置登录成功！",
            type: "success"
          })
          router.push({ path: "/index" })
        })
    }

    return {
      rules1: INPUT_MAIL.rules,
      config1: INPUT_MAIL.config,
      forms1: INPUT_MAIL.forms,
      rules2: FINDBYMAIL.rules,
      config2: FINDBYMAIL.config,
      forms2: FINDBYMAIL.forms,
      rules3: FINDBYPHONE.rules,
      config3: FINDBYPHONE.config,
      forms3: FINDBYPHONE.forms,

      getMailAdd,
      findType,
      hasInputMail,
      changeFindType,

      findByPhone,
      findByEmail,
      sendAgain,

      formDom1,
      formDom2,
      formDom3
    }
  }
}
</script>

<style lang="scss" scoped>
.m40 {
  margin-top: 40px;
}
.c-span {
  cursor: pointer;
}
.forget-contain {
  background-color: #fafafa;
  width: 100%;
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  .content {
    width: 900px;
    margin: 83px auto;
  }
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
    .mark {
      .svg-icon {
        margin-right: 9px;
        vertical-align: bottom;
      }
      span {
        font-size: 24px;
        color: #e0585b;
      }
    }
    .return {
      font-size: 14px;
      line-height: 31px;
      .c-span {
        color: #e0585b;
      }
    }
  }
}
.contain {
  border-radius: 0 0 8px 8px;
  background-color: #ffffff;
  .contain-top {
    border-radius: 8px 8px 0 0;
    height: 76px;
    line-height: 76px;
    font-size: 24px;
    background-color: #e0585b;
    color: #ffffff;
    position: relative;
    text-align: center;
    span {
      position: absolute;
      font-size: 14px;
      right: 24px;
    }
  }
  .contain-form {
    // margin: 32px auto;
    padding-bottom: 32px;
    display: flex;
    justify-content: center;
  }
}
.report {
  text-align: center;
  font-size: 12px;
  color: #8d8d8d;
  margin-top: 146px;
  span {
    margin-right: 33px;
  }
  .line {
    &::after {
      border-left: 1px solid #8d8d8d;
      top: 3px;
    }
  }
}
.line {
  margin-right: 25px;
  position: relative;
  &::after {
    content: "";
    height: 11px;
    border-left: 1px solid #ebebeb;
    position: absolute;
    right: -12px;
    top: 4px;
  }
}
</style>
