<template>
<div class="dialog">
  <el-dialog
    :title="title"
    :model-value="dialogVisible"
    :width="width"
    :center="center"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="close"
  >
    <slot></slot>
    <div v-if="coop.show" class="disFD">
      <el-button class="disL" type="primary" @click="confirm">{{
        coop.confirmTxt || "确定"
      }}</el-button>
      <el-button @click="cancel">{{ coop.cancelTxt || "取消" }}</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { ref, computed } from "vue"
export default {
  props: {
    title: {
      type: String,
      default () {
        return "暂未定义标题"
      }
    },
    width: {
      type: Number,
      default () {
        return 400
      }
    },
    visible: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    },
    center: {
      type: Boolean,
      default () {
        return false
      }
    },
    coop: {
      type: Object,
      default () {
        return {
          show: true,
          confirmTxt: '确定',
          cancelTxt: '取消'
        }
      }
    }
  },
  emits: ["confrimMethod", "changeVisible"],
  setup (props, context) {
    const confirm = () => {
      context.emit('confrimMethod', 'confirm')
    }
    const cancel = () => {
      context.emit('confrimMethod')
    }
    const close = () => {
      context.emit('changeVisible', false)
    }
    const dialogVisible = computed({
      get: () => props.visible,
      set: (nv) => {
        context.emit('changeVisible', nv)
      }
    })
    return {
      confirm,
      cancel,
      dialogVisible,
      close
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog{
  ::v-deep .el-dialog__body{
  padding:10px 20px 20px !important;
}
  ::v-deep .el-dialog__headerbtn{
    top: 25px;
  }

.disFD {
  display: flex;
  margin-top:20px;
  justify-content: center;
  .disL{
    margin-right:60px;
    border: none;
  }}
}
</style>
