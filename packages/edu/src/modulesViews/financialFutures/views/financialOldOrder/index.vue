<template>
  <div class="container">
    <div class="left">
      <traditional-order></traditional-order>
    </div>
    <div class="middle"><one-range-panel></one-range-panel></div>
    <component :is="index" :routeInfo="routeInfo" @showKline="showKline"  @hideKline="hideKline"></component>
  </div>
</template>

<script>
import OneRangePanel from "../../components/OneRangePanel/index"
import TraditionalOrder from "../../components/TraditionalOrder/index"
import { ref, reactive, computed } from "vue"
import DTable from './dTable'
export default {
  components: {
    OneRangePanel,
    TraditionalOrder,
    DTable
  },
  setup (props) {
    const isRight = ref(true)
    const routeInfo = reactive({
      stockcode: '',
      marketid: '',
      name: ''
    })

    const showKline = data => {
      isRight.value = false
      routeInfo.stockcode = data.code
      routeInfo.marketcode = data.marketId
      routeInfo.name = data.name
    }

    const hideKline = () => {
      Object.keys(routeInfo).forEach(key => {
        routeInfo[key] = ''
      })
      isRight.value = true
    }
    return {
      index: computed(() => isRight.value ? 'DTable' : 'KLine'),
      showKline,
      routeInfo,
      hideKline
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 15px;
  display: flex;
  .middle {
    margin-left: 19px;
    margin-right: 25px;
  }
}
</style>
