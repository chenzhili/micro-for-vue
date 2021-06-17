<template>
  <div class="container">
    <div class="left margin">
      <user-info></user-info>
      <v-nav-bar class="margin" :activeIndex="vNavActiveIndex" :list="vList" @tabChange="vNavChange"></v-nav-bar>
    </div>
    <div class="right margin">
      <study-situation></study-situation>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import StudySituation from './common/StudySituation.vue'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  components: { StudySituation },
  setup (props) {
    const vList = [
      { label: "我的实训", path: 'myPracticalTraining' },
      { label: "我的竞赛", path: 'myRace' },
      { label: "做题记录", path: 'record' },
      { label: "我的收藏", path: 'myCollection' },
      { label: "我的关注", path: 'myInterest' },
      { label: "基本设置", path: 'dataSet' }
    ]
    const router = useRouter()
    const route = useRoute()
    const vNavActiveIndex = ref(0)
    const vNavChange = (e) => {
      vNavActiveIndex.value = e.index
      router.push(e.child.path)
    }

    onMounted(() => {
      vNavActiveIndex.value = vList.findIndex(item => route.fullPath.includes(item.path))
    })

    return {
      vList,
      vNavActiveIndex,
      vNavChange
    }
  }

}
</script>

<style lang="scss" scoped>
$l_w: 300px;
$r_w: 880px;
.margin {
  margin-top: 20px;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  .left {
    width: $l_w;
    margin-right: 20px;
  }
  .right {
    width: $r_w;
  }
}
</style>
