<template>
  <el-radio-group
    v-bind="$attrs"
  >
    <el-radio
      v-for="(option, index) in options"
      :key="index"
      v-bind="option"
    ></el-radio>
    <slot name="checkbox"></slot>
  </el-radio-group>
</template>
<script>
export default {
  name: 'CRadio',
  props: {
    options: {
      required: true,
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped></style>
