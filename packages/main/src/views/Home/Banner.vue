<template>
  <div class="banner">
    <el-carousel ref="carDom" height="263px">
      <el-carousel-item
        v-for="(item, index) in banner"
        :key="index"
        @click="bannerClick(item)"
        :style="{'display':loading?'none':'unset'}"
      >
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue"
import { getPublicity } from "@/api/publicity"

export default {
  setup (props) {
    const banner = ref([])
    const loading = ref(true)
    const carDom = ref(null)

    const getBannerList = () => {
      getPublicity("sy_lb").then(res => {
        if (res.code === "000000" && res.data.length !== 0) {
          banner.value = res.data
          loading.value = false
          nextTick(() => {
            carDom.value.setActiveItem(0)
          })
        }
      })
    }

    const bannerClick = item => {
      window.open(item.linkUrl)
    }

    onMounted(() => {
      getBannerList()
    })

    return {
      banner,
      bannerClick,
      carDom,
      loading
    }
  }
}
</script>

<style scoped lang="scss">
.banner {
  width: 880px;
  height: 263px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
