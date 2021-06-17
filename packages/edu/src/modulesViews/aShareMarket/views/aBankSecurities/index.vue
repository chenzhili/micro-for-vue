<template>
  <div class="container">
    <bank-securities-transfer :ajaxApi="ajaxApi"></bank-securities-transfer>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  components: {},
  setup (props) {
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })
    return {
      ajaxApi
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
