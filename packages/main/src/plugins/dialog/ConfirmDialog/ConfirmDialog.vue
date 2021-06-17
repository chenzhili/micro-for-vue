<template>
  <transition name="fade-in-linear" @after-leave="$emit('vanish')">
    <div v-show="visible">
      <div class="ql-dialog-modal"></div>
      <div class="ql-dialog-overlay" @click="closeByOverlay">
        <div id="ql-confirm-dialog-conten">
          <div class="header">
            <img
              v-if="showClose"
              class="close"
              src="@/assets/dialog/delete.png"
              @click="close"
            />
          </div>
          <div class="message">{{ message }}</div>
          <div class="sub">{{ sub }}</div>
          <div class="footer">
            <div
              class="btn primary"
              :class="{ onceBtn: onceBtn }"
              @click="confirm"
            >
              确认
            </div>
            <div v-if="!onceBtn" class="btn" @click="cancel">取消</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    message: {
      type: String,
      defalut: "请输入提示"
    },
    sub: {
      type: String,
      default: ""
    },
    maskClose: {
      type: Boolean,
      default: () => false
    },
    onceBtn: {
      type: Boolean,
      default: () => false
    },
    showClose: {
      type: Boolean,
      default: () => true
    }
  },
  setup (props, { emit }) {
    const visible = ref(false)

    const confirm = () => {
      visible.value = false
      emit("action", "confirm")
    }

    const cancel = () => {
      visible.value = false
      emit("action", "cancel")
    }

    const close = () => {
      visible.value = false
      emit("action", "close")
    }

    const closeByOverlay = e => {
      if (!props.maskClose) return
      const dialogElement = document.getElementById("ql-confirm-dialog-conten")
      if (!dialogElement.contains(e.target)) {
        visible.value = false
        emit("action", "close")
      }
    }

    return {
      visible,
      confirm,
      cancel,
      close,
      closeByOverlay
    }
  }
}
</script>

<style lang="scss" scoped>
.ql-dialog-modal{
  z-index: 8000;
}
.ql-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  z-index: 9001;

  #ql-confirm-dialog-conten {
    display: inline-block;
    width: 320px;
    vertical-align: middle;
    background-color: #ffffff;
    border-radius: 8px;
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    user-select: none;
    z-index: 9001;

    .header {
      padding: 18px 23px;
      text-align: right;
      .close {
        width: 13px;
        height: 13px;
        cursor: pointer;
      }
    }

    .message {
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      color: $primary-text-color;
      margin-top: 23px;
    }
    .sub {
      margin-top: 12px;
      margin-bottom: 24px;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: $gray-text-color;
    }
    .footer {
      padding: 24px 30px;
      display: flex;
      justify-content: space-between;
      .btn {
        width: 118px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: 1px solid #999999;
        border-radius: 5px;
        font-weight: 400;
        font-size: 14px;
        color: $gray-text-color;
        cursor: pointer;
      }
      .primary {
        background: $primary-light-color;
        border: 1px solid $primary-light-color;
        border-radius: 4px;
        color: #ffffff;
      }
      .onceBtn {
        width: 100% !important;
      }
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
