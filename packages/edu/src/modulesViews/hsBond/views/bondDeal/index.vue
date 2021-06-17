<template>
  <div class="container">
    <div class="left">
      <form-head :tabList="tabList" @tabClick="tabClick">
        <template #form>
          <div class="form">
            <form-com :formItems="formItems" :coopBtns="coopBtns"></form-com>
          </div>
        </template>
      </form-head>
    </div>
    <div class="middle"><five-range-panel></five-range-panel></div>
    <component
      :is="index"
      :routeInfo="routeInfo"
      @showKline="showKline"
      @hideKline="hideKline"
    ></component>
  </div>
</template>

<script>
import { BUY_DATA, SELL_DATA, BUY_BTNS, SELL_BTNS } from "./form"
import { ref, reactive, computed } from "vue"
import DTable from "./dTable"
export default {
  components: {
    DTable
  },
  setup (props) {
    const tabList = [
      { label: "买入", value: 0 },
      { label: "卖出", value: 1 }
    ]
    const tabValue = ref(0)
    const tabClick = e => {
      tabValue.value = e.value
    }
    const isRight = ref(true)
    const routeInfo = reactive({
      stockcode: "",
      marketid: "",
      name: ""
    })

    const showKline = data => {
      isRight.value = false
      routeInfo.stockcode = data.code
      routeInfo.marketcode = data.marketId
      routeInfo.name = data.name
    }

    const hideKline = () => {
      Object.keys(routeInfo).forEach(key => {
        routeInfo[key] = ""
      })
      isRight.value = true
    }

    return {
      formItems: computed(() => (tabValue.value === 0 ? BUY_DATA : SELL_DATA)),
      coopBtns: computed(() => (tabValue.value === 0 ? BUY_BTNS : SELL_BTNS)),
      tabList,
      tabClick,
      index: computed(() => (isRight.value ? "DTable" : "KLine")),
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
  .left {
    .form {
      margin-left: 16px;
    }
  }
  .middle {
    margin-left: 19px;
    margin-right: 25px;
  }
}
</style>
