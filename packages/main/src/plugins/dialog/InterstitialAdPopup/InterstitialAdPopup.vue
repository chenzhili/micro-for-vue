<template>
  <transition name="fade-in-linear" @after-leave="$emit('vanish')">
    <div v-show="visible">
      <div class="ql-dialog-modal"></div>
      <div class="ql-dialog-overlay" @click="closeByOverlay">
        <div id="ql-home-dialog-conten">
          <img class="fodder" :src="imageUrl" @click="confirm" />
          <img class="close" src="@/assets/dialog/close.png" @click="close" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    imageUrl: {
      type: String,
      defalut: ""
    },
    maskClose: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ['vanish', 'action'],
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
      const dialogElement = document.getElementById("ql-home-dialog-conten")
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

  #ql-home-dialog-conten {
    display: inline-block;
    vertical-align: middle;
    background-color: transparent;
    border-radius: 8px;
    overflow: hidden;
    backface-visibility: hidden;
    user-select: none;
    z-index: 2001;

    .fodder,
    .close {
      display: block;
      cursor: pointer;
    }
    .close {
      width: 26px;
      height: 26px;
      margin: 0 auto;
      margin-top: 32px;
      opacity: 0.8;
      transition: 0.2s;

      &:hover {
        opacity: 1;
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
