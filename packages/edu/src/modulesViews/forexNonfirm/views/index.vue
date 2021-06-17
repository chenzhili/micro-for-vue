<template>
  <div class="container">
    <my-race
      :navItems="navItems"
      :childList="childList"
      @navChange="navChange"
      @goRouter="goRouter"
    ></my-race>
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="key" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { MENU_DATA, CHILDREN, GRADE } from "./menu.js"
import { useRouter } from "vue-router"
import myRace from "../components/myRace.vue"
import { ref, reactive, computed } from "vue"
export default {
  components: { myRace },
  setup (props) {
    const router = useRouter()
    const navValue = ref("委托下单")
    const navChange = e => {
      navValue.value = e.name
    }
    const goRouter = path => {
      router.push({ name: path })
    }
    return {
      navItems: MENU_DATA,
      childList: computed(() => {
        if (navValue.value === "委托下单") {
          return CHILDREN
        } else if (navValue.value === "我的战绩") {
          return GRADE
        } else {
          return []
        }
      }),
      navChange,
      goRouter
    }
  }
}
</script>

<style lang="scss" scoped></style>
