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
            <span class="c-span" @click="$router.replace('/login')">立即登录</span>
          </span>
          <span class="c-span" @click="$router.replace('/index')">返回首页</span>
        </div>
      </div>
      <div class="contain">
        <div class="contain-top">注册帐号</div>
        <div class="contain-form m40">
          <register :isDialog="false"></register>
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
import register from "./component/register"
export default {
  components: {
    register
  },
  setup () {
    return {
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
