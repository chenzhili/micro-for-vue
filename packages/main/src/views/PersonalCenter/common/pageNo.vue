<template>
  <div class="page">
    <el-pagination
      background
      :page-size="9"
      layout="prev, pager, next"
      :total="90">
    </el-pagination>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.page {
  margin: 30px 0 60px 0;
  width: 100%;
  height: 30px;
}
.el-pagination {
    text-align: center;
}
</style>
