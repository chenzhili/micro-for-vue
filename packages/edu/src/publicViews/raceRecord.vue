<template>
  <div>
    <table-com :tableData="tableData" :tableHeader="tableHeader" :border="false"></table-com>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from "vue-router"
export default {
  name: 'raceCo',
  setup () {
    const tableHeader = [
      { attrs: { prop: 'number', label: '竞赛名称' } },
      { attrs: { prop: 'name', label: '日收益' } },
      { attrs: { prop: 'desc', label: '月收益' } },
      { attrs: { prop: 'user', label: '总收益' } }
    ]
    return {
      tableHeader
    }
  }
}
</script>

<style scoped lang="scss">
</style>
