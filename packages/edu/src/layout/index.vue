<template>
  <div class="container-body">
    <!-- <app-nav></app-nav> -->
    <div class="main">
      <sub-nav></sub-nav>
      <div class="main-body">
        <app-main></app-main>
      </div>
    </div>
    <!-- <app-footer></app-footer> -->
  </div>
</template>

<script>
import AppMain from './components/AppMain.vue'
import AppNav from './components/AppNav.vue'
// import AppFooter from "./components/AppFooter.vue"

import { onMounted } from 'vue'
import SubNav from './components/SubNav.vue'

export default {
  name: 'Layout',
  components: {
    AppMain,
    // AppNav,
    SubNav /* ,
    AppFooter */
  },
  setup (props) {}
}
</script>

<style lang="scss">
.container-body {
  display: flex;
  height:100%;
  flex-direction: column;
  .main {
    flex:1;
    background-color: #fafafa;
    // margin-top: $app-nav-height;
    display:flex;
    flex-direction: column;
    .main-body{
      flex:1;
      margin:0 auto;
      max-width: 1400px;
    }
  }
}
</style>
