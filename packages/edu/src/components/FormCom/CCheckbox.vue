<template>
  <el-checkbox-group
    v-bind="$attrs"
  >
    <el-checkbox
      v-for="(option, index) in options"
      :key="index"
      v-bind="option"
    ></el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  name: 'CCheckbox',
  props: {
    options: {
      required: true,
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped></style>
