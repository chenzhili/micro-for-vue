<template>
  <div class="container">
    <tab-select :clickList="clickList" @routerGo="routerGo"></tab-select>
    <router-view v-slot="{ Component }">
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <component :is="Component" :key="key"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import tabSelect from "../components/tabSelect.vue"
import { useRouter } from 'vue-router'
import { ROUTER_LIST } from "./routers"
import { ref } from "vue"

export default {
  components: { tabSelect },
  setup (props) {
    const router = useRouter()

    const hlist = [
      { label: "上证50ETF" },
      { label: "上海300ETF" },
      { label: "深证300ETF" }
    ]

    const hNavActiveIndex = ref(0)
    const routerGo = path => {
      router.push({ name: path })
    }
    const hNavChange = e => {
      hNavActiveIndex.value = e.index
    }

    return {
      clickList: ROUTER_LIST,
      hlist,
      hNavActiveIndex,
      hNavChange,
      routerGo
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .content {
    display: flex;
    justify-content: space-between;

    .etf-area {
      width: 829px;
      height: 683px;
      background: #ffffff;
      border: 1px solid #ebebeb;
      border-radius: 11px;
      padding: 16px;
    }
    .table-area {
      margin-top: 16px;
    }
  }
}
</style>
