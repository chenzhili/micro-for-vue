<template>
  <div class="form-content">
    <div class="tabs" v-if="curTab!=='register'">
      <div class="tab" @click="curTab='phone'">
        <div>手机号登录</div>
        <span class="indicator animation" :class="{active: curTab=='phone'||curTab=='authcode'}"></span>
      </div>
      <div class="tab" @click="curTab='stuNum'">
        <div>学号登录</div>
        <span class="indicator animation" :class="{active: curTab=='stuNum'}"></span>
      </div>
    </div>
    <div class="form">
      <phone ref="phoneDom" v-show="curTab=='phone'" :isDialog="isDialog" :autoLogin="autoLogin"></phone>
      <authcode
        ref="authcodeDom"
        v-show="curTab=='authcode'"
        :isDialog="isDialog"
        :autoLogin="autoLogin"
      ></authcode>
      <stuNum ref="stuNumDom" v-show="curTab=='stuNum'" :isDialog="isDialog" :autoLogin="autoLogin"></stuNum>
      <register
        ref="registerDom"
        v-show="curTab=='register'"
        :isDialog="isDialog"
        @regSuccess="regSuccess"
      ></register>
    </div>
    <div class="setting" v-if="curTab!=='register'">
      <el-checkbox v-model="autoLogin">十天内免登录</el-checkbox>
      <span
        class="c-span"
        @click="()=>{
          $router.replace({name:'forget',params:{type:'forget'}})
          $emit('closeDialog')
        }"
      >忘记密码?</span>
      <div class="setting-login" v-if="curTab!=='stuNum'">
        <span v-if="curTab=='phone'" class="sp-span c-span" @click="curTab='authcode'">验证码登录</span>
        <span v-if="curTab=='authcode'" class="sp-span c-span" @click="curTab='phone'">密码登录</span>
        <!-- <span class="sp-span c-span" @click="curTab='authcode'">{{curTab=='authcode'?'密码登录':'验证码登录'}}</span> -->
        <span
          class="c-span"
          @click="isDialog?curTab='register':$router.replace({name:'register'})"
        >立即注册</span>
      </div>
    </div>
    <div class="setting" v-if="curTab=='register'">
      <div class="setting-register">
        <span>
          已有帐号，
          <span class="c-span" @click="curTab='phone'">立即登录</span>
        </span>
      </div>
    </div>
    <div class="other">
      <div class="oth-top">其它登录方式</div>
      <div class="oth-icon">
        <img @click="thirdLogin('qq')" src="@/assets/login/qq.png" alt />
        <img @click="thirdLogin('wechat')" src="@/assets/login/wechat.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import stuNum from "./stuNum"
import phone from "./phone"
import register from "./register"
import authcode from "./authcode"
import { ref, watch, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { accredit, openWin } from "../thirdMethods"
export default {
  name: "formContent",
  components: {
    stuNum,
    phone,
    register,
    authcode
  },
  props: {
    isDialog: {
      type: Boolean,
      require: true
    },
    regPhone: {
      type: String
    }
  },
  emits: ["closeDialog"],
  setup (props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const isRegister = ref(false)
    const curTab = ref("phone")
    const autoLogin = ref(false)

    const phoneDom = ref(null)
    const stuNumDom = ref(null)
    const registerDom = ref(null)
    const authcodeDom = ref(null)

    const thirdLogin = channel => {
      const url = accredit(store, 0, channel)
      openWin(
        url,
        async () => {
          if (props.isDialog) {
            router.go(0)
            store.commit("user/SET_USER_LM", false)
          } else {
            router.replace("/index")
          }
        },
        () => {
          props.isDialog && store.commit("user/SET_USER_LM", false)
          router.replace({ name: "bindMobile" })
        }
      )
    }

    const regSuccess = phone => {
      curTab.value = "phone"
      phoneDom.value.echoPhone(phone)
    }

    const AllDom = {
      phoneDom,
      stuNumDom,
      registerDom,
      authcodeDom
    }

    watch(curTab, () => {
      AllDom[`${curTab.value}Dom`].value.clearValidate()
    })

    onMounted(() => {
      // console.log(props.regPhone)
      if (props.regPhone) regSuccess(props.regPhone)
    })
    return {
      curTab,
      autoLogin,
      isRegister,
      phoneDom,
      stuNumDom,
      registerDom,
      authcodeDom,

      regSuccess,

      thirdLogin
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
.tabs {
  font-size: 16px;
  height: 77px;
  border-bottom: 1px solid #ebebeb;
  text-align: left;
  .tab {
    color: #222222;
    margin-right: 36px;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    line-height: 75px;
    cursor: pointer;
    .indicator {
      height: 2px;
      width: 0;
      background-color: $primary-light-color;
      opacity: 0;
      &.animation {
        transition: 0.2s;
      }
      &.active {
        opacity: 1;
        width: 100%;
      }
    }
  }
}
.form {
  margin: 40px 0 24px;
  // padding-top: 20px;
  // margin-bottom: 24px;
}
.setting {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 24px 0 36px;
  .setting-register {
    text-align: center;
    width: 100%;
    .c-span {
      color: #1d64f2;
    }
  }
  .c-span {
    cursor: pointer;
  }
  .setting-login {
    width: 100%;
    color: #1d64f2;
    margin-top: 32px;
    text-align: center;
    .sp-span {
      margin-right: 25px;
      position: relative;
      &::after {
        content: "";
        width: 1px;
        height: 14px;
        background-color: #ebebeb;
        position: absolute;
        right: -12px;
        top: 1px;
      }
    }
  }
}
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
