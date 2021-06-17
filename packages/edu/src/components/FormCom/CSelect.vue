<template>
  <el-select
    v-bind="$attrs"
  >
    <el-option
      v-for="option in options"
      :key="option.value"
      v-bind="option"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'CSelect',
  props: {
    options: {
      required: true,
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped></style>
