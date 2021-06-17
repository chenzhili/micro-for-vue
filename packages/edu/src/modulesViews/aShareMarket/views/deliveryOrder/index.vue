<template>
  <registration :toolsBar="toolsBar"></registration>
</template>

<script>
import registration from "@/modulesViews/components/registration.vue"
export default {
  components: {
    registration
  },
  setup () {
    const toolsBar = { date: true, type: true, export: true, search: true }
    return {
      toolsBar
    }
  }

}
</script>

<style>

</style>
