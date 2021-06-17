<template>
  <div>
    <el-dialog width="420px" v-model="loginVisible">
      <formContent :isDialog="true" @closeDialog="loginVisible=false"></formContent>
    </el-dialog>
  </div>
</template>

<script>
import formContent from "./formContent"
import { computed, ref, toRefs, toRef } from "vue"
export default {
  components: {
    formContent
  },
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  emits: ["changeVisible"],
  setup (props, { emit }) {
    const loginVisible = computed({
      get () {
        return props.visible
      },
      set (nv) {
        emit("changeVisible", nv)
      }
    })
    return { loginVisible }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 8px;
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    padding: 0px;
  }
}
</style>
