<template>
  <div>
    <education-nav></education-nav>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
    <ApplyForm></ApplyForm>
    <education-footer></education-footer>
  </div>
</template>

<script>
import EducationNav from "./components/EducationNav"
import EducationFooter from "./components/EducationFooter"
import ApplyForm from './components/ApplyForm'
import { ref } from "vue"
export default {
  name: "education",
  components: {
    EducationNav,
    EducationFooter,
    ApplyForm
  },
  setup (props, content) {
    const centerTab = ref(0)

    return { centerTab }
  }
}
</script>

<style lang="scss" >
.contain{
  width: 1200px;
  margin: auto;
}
</style>
