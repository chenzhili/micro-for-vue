<template>
  <transition name="fade-in-linear" @after-leave="$emit('vanish')">
    <div v-show="visible">
      <div class="ql-dialog-modal"></div>
      <div class="ql-dialog-overlay" @click="closeByOverlay">
        <div id="ql-apply-dialog-conten">
          <div class="header">
            <img
              class="close"
              src="@/assets/dialog/delete.png"
              @click="close"
            />
          </div>
          <img class="right" src="@/assets/dialog/right.png" />
          <div class="message">报名成功</div>
          <div class="link">
            <span class="link-text" @click="confirm">进入比赛</span>
          </div>
          <img class="ad-img" src="@/assets/dialog/ad.png" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    image: {
      type: String,
      defalut: ""
    },
    maskClose: {
      type: Boolean,
      default: () => false
    }
  },
  setup (props, { emit }) {
    const visible = ref(false)

    const close = () => {
      visible.value = false
      emit("action", "close")
    }

    const confirm = () => {
      visible.value = false
      emit("action", "confirm")
    }

    const closeByOverlay = e => {
      if (!props.maskClose) return
      const dialogElement = document.getElementById("ql-apply-dialog-conten")
      if (!dialogElement.contains(e.target)) {
        visible.value = false
        emit("action", "close")
      }
    }

    return {
      visible,
      close,
      confirm,
      closeByOverlay
    }
  }
}
</script>

<style lang="scss" scoped>
.ql-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  z-index: 2001;

  #ql-apply-dialog-conten {
    display: inline-block;
    width: 300px;
    vertical-align: middle;
    background-color: #ffffff;
    border-radius: 8px;
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    user-select: none;
    z-index: 2001;

    .header {
      padding: 18px 23px 9px 23px;
      text-align: right;
      .close {
        width: 13px;
        height: 13px;
        cursor: pointer;
      }
    }
    .right {
      display: block;
      width: 36px;
      height: 36px;
      margin: 0 auto;
    }
    .message {
      font-size: 18px;
      font-family: $zh-bold;
      font-weight: 700;
      text-align: center;
      color: $primary-text-color;
      margin-top: 10px;
    }
    .link {
      margin-top: 16px;
      margin-bottom: 49px;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      color: $primary-text-color;
      text-align: center;
      &-text {
        border-bottom: 1px solid $primary-text-color;
        cursor: pointer;
      }
    }
    .ad-img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  &:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
}
</style>
