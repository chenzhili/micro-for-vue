<template>
  <div class="data-set">
    <h-nav-bar :list="hlist" :activeIndex="hNavActiveIndex" @tabChange="hNavChange"></h-nav-bar>
    <component :is="index"></component>
  </div>
</template>

<script>
import ChangePsw from "./component/ChangePsw"
import ChangeAccount from "./component/ChangeAccount"
import BasicInfo from "./component/BasicInfo"
import { ref, computed } from "vue"

export default {
  components: {
    ChangePsw,
    ChangeAccount,
    BasicInfo
  },
  setup (props) {
    // const index = 'ChangePsw'
    const hlist = [
      { label: "基本资料" },
      { label: "修改密码" },
      { label: "帐号设置" }
    ]
    const hNavActiveIndex = ref(0)

    const hNavChange = e => {
      hNavActiveIndex.value = e.index
    }

    const index = computed(() => {
      if (hNavActiveIndex.value === 0) {
        return "BasicInfo"
      } else if (hNavActiveIndex.value === 1) {
        return "ChangePsw"
      } else {
        return "ChangeAccount"
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

<style lang="scss" >
.is-required {
  .el-form-item__label:before {
    content: none !important;
    color: #f56c6c;
    margin-right: 5px;
    font-weight: bold;
  }
}
</style>
