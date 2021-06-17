<template>
  <div class="my-interest">
    <h-nav-bar
      :list="hlist"
      :indicator="false"
    >
    </h-nav-bar>
    <focus-firm></focus-firm>
  </div>
</template>

<script>
import { ref } from "vue"
import FocusFirm from "./component/FocusFirm.vue"
export default {
  components: {
    FocusFirm
  },
  setup (props) {
    const hlist = [{ label: "关注的企业" }]
    return {
      hlist
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
