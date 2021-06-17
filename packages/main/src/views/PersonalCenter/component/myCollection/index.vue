<template>
  <div class="mu-collection">
    <h-nav-bar
      :list="hlist"
      :activeIndex="hNavActiveIndex"
      @tabChange="hNavChange"
    >
    </h-nav-bar>
    <component :is="index"></component>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import TestQuestions from '../myCollection/component/TestQuestions.vue'
import ArticleList from '../myCollection/component/ArticleList.vue'
import RecruitMsg from './component/RecruitMsg'
export default {
  components: {
    ArticleList,
    TestQuestions,
    RecruitMsg
  },
  setup (props) {
    const hlist = [{ label: "试题" }, { label: "文章" }, { label: "招聘信息" }]
    const hNavActiveIndex = ref(0)
    const hNavChange = (e) => {
      hNavActiveIndex.value = e.index
    }
    const index = computed(() => {
      if (hNavActiveIndex.value === 0) {
        return 'TestQuestions'
      } else if (hNavActiveIndex.value === 1) {
        return 'ArticleList'
      } else {
        return 'RecruitMsg'
      }
    })
    return {
      hlist,
      hNavActiveIndex,
      hNavChange,
      index
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
