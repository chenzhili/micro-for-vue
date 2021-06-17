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
    <component :is="index" :routeInfo="routeInfo" @showKline="showKline"  @hideKline="hideKline"></component>
  </div>
</template>

<script>
import { BUY_DATA, SELL_DATA, BUY_BTNS, SELL_BTNS } from "./form"
import { ref, computed, reactive } from "vue"
import DTable from './dTable'
export default {
  components: { DTable },
  setup (props) {
    const kline = ref(false)
    const isRight = ref(true)
    const tabList = [
      { label: "买入", value: 0 },
      { label: "卖出", value: 1 }
    ]

    const routeInfo = reactive({
      stockcode: '',
      marketcode: '',
      name: '',
      markettype: ''
    })

    const pageRef = ref(null)
    const defaultData = [
      { a: "465456", code: "600000" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" }
    ]
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const tableHeader = [
      { attrs: { prop: "a", label: "加自选" } },
      { attrs: { prop: "code", label: "商品代码" }, custom: true },
      { attrs: { prop: "a", label: "商品名称" } },
      { attrs: { prop: "a", label: "最新" } },
      { attrs: { prop: "a", label: "跌停" } },
      { attrs: { prop: "a", label: "涨幅(%)" } },
      { attrs: { prop: "a", label: "成交量" } },
      { attrs: { prop: "a", label: "均价" } },
      { attrs: { prop: "a", label: "昨收" } },
      { attrs: { prop: "a", label: "今开" } },
      { attrs: { prop: "a", label: "最高" } },
      { attrs: { prop: "a", label: "最低" } }
    ]
    const tabValue = ref(0)

    const input = ref("")
    const tabClick = e => {
      tabValue.value = e.value
    }
    const search = () => {
      console.log(input.value)
    }

    const showKline = data => {
      isRight.value = false
      routeInfo.stockcode = data.code
      routeInfo.marketcode = data.marketId
      routeInfo.name = data.name
      routeInfo.markettype = data.markettype
    }

    const hideKline = () => {
      Object.keys(routeInfo).forEach(key => {
        routeInfo[key] = ''
      })
      isRight.value = true
    }

    return {
      formItems: computed(() => (tabValue.value === 0 ? BUY_DATA : SELL_DATA)),
      coopBtns: computed(() => (tabValue.value === 0 ? BUY_BTNS : SELL_BTNS)),
      tabList,
      tabClick,
      pageRef,
      defaultData,
      ajaxApi,
      tableHeader,
      input,
      search,
      kline,
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
