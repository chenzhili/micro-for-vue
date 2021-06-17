<template>
  <div class="login-contain">
    <svg-icon icon-class="login_title"></svg-icon>
    <formContent :isDialog="false" :regPhone="regPhone"></formContent>
    <div class="report">
      <span class="line">蜀公网安备 33010002000124号</span>
      <span class="line">蜀ICP备09109183号-25</span>
      <span>©CDQL QLZHY,powered by cdql.</span>
    </div>
  </div>
</template>

<script>
import formContent from "./component/formContent"
import { ref } from "vue"
import { useRoute } from "vue-router"
export default {
  components: {
    formContent
  },
  name: "login",
  setup () {
    const route = useRoute()
    const regPhone = route.params.regPhone
    return { regPhone }
  }
}
</script>

<style lang="scss" scoped>
.login-contain {
  width: 100%;
  background: url("@/assets/login/login_bg.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  padding-top: 80px;
}
.svg-icon {
  width: 156px;
  height: 45px;
  display: block;
  margin: 0 auto 40px;
}
.report {
  font-size: 12px;
  color: #ffffff;
  position: fixed;
  bottom: 77px;
  left: 50%;
  transform: translateX(-50%);
  span {
    margin-right: 33px;
  }
  .line {
    position: relative;
    &::after {
      content: "";
      height: 11px;
      border-left: 1px solid #ffffff;
      position: absolute;
      right: -16px;
      top: 3px;
    }
  }
}
</style>
