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
    <div class="middle">
      <five-range-panel :profit="fiveData.profit" :buys="fiveData.buys" :sells="fiveData.sells"></five-range-panel>
    </div>
    <component :is="index" :routeInfo="routeInfo" @showKline="showKline" @hideKline="hideKline"></component>
  </div>
</template>

<script>
import { BUY_DATA, SELL_DATA, BUY_BTNS, SELL_BTNS } from "./form"
import { ref, reactive, computed, onMounted } from "vue"
import { getStockList, getData, getAccount } from "./data"
import { clone } from "@/utils"
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
    const isRight = ref(true)
    const tableData = ref([])

    const buyConfig = reactive(clone(BUY_DATA))
    const sellConfig = reactive(clone(SELL_DATA))

    const tabClick = e => {
      tabValue.value = e.value
      fiveData.value = {}
    }

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

    const fiveData = ref({})
    const selectShock = async e => {
      const res = await getData()
      const curShock = res.data.find(item => item.code === e)
      fiveData.value = curShock
      if (tabValue.value) {
        sellConfig[1].attrs.value = curShock.code
        sellConfig[2].attrs.value = curShock.name
        sellConfig[3].attrs.value = Number(curShock.now)
      } else {
        buyConfig[1].attrs.value = curShock.code
        buyConfig[2].attrs.value = curShock.name
        buyConfig[3].attrs.value = Number(curShock.now)
      }
    }

    const init = async () => {
      const accountRes = await getAccount()
      buyConfig[0].attrs.value = accountRes.secacct
      buyConfig[4].attrs.value = Number(accountRes.avalBal).toFixed(2)
      sellConfig[0].attrs.value = accountRes.secacct
      const listRes = await getStockList()
      buyConfig[1].attrs.options = listRes.data.map(item => {
        return {
          label: item.stockcode,
          value: item.stockcode
        }
      })
      sellConfig[1].attrs.options = listRes.data.map(item => {
        return {
          label: item.stockcode,
          value: item.stockcode
        }
      })
      buyConfig[1].attrs.onChange = selectShock
      sellConfig[1].attrs.onChange = selectShock
    }
    onMounted(() => {
      init()
    })

    return {
      formItems: computed(() =>
        tabValue.value === 0 ? buyConfig : sellConfig
      ),
      coopBtns: computed(() => (tabValue.value === 0 ? BUY_BTNS : SELL_BTNS)),
      tabList,
      tabClick,
      index: computed(() => (isRight.value ? "DTable" : "KLine")),
      showKline,
      routeInfo,
      hideKline,
      fiveData,
      tableData
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
