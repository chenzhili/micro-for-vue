<template>
  <div class="container">
    <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :toolBar="toolBar"
      @navChange="navChange"
      @search="search"
      ref="tableDom"
    >
      <template #order="{scope}">{{scope.$index+1}}</template>
      <template #entrustbs="{scope}">{{scope.row.entrustbs==="1"?'买入':'卖出'}}</template>
      <template #entruststatus="{scope}">{{status[scope.row.entruststatus]}}</template>
      <template #orgreportno="{scope}">{{scope.row.orgreportno||'--'}}</template>
      <template #reason="{scope}">
        <el-button @click="changeVisible('orderReasonVis', true, scope.row)" size="small">查看</el-button>
      </template>
    </table-query>
    <order-reason
      :visible="modal.orderReasonVis"
      :orderReason="curItem.orderresean"
      @changeVisible="changeVisible('orderReasonVis')"
    ></order-reason>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue"
import { queryNowOrders, queryHisOrders } from "@/api/myRace/order"
import { getRaceConfig } from "@/utils/auth.js"
import orderReason from "./dialog/orderReason"
import { EXCHANGE } from "./setting"
export default {
  components: {
    orderReason
  },
  props: {
    toolsBarList: {
      type: Array,
      require: true
    },
    nowHeader: {
      type: Array,
      require: true
    },
    hisHeader: {
      type: Array,
      require: true
    }
  },
  setup (props) {
    const raceConfig = JSON.parse(getRaceConfig())
    const navValue = ref(0)
    const curItem = ref({})
    const tableDom = ref(null)
    const criteria = ref({})
    const ajaxApi = reactive({
      getList (param) {
        return queryNowOrders(param)
      }
    })

    const modal = reactive({
      changeDetailVis: false,
      orderReasonVis: false
    })
    const changeVisible = (type, bool, data) => {
      modal[type] = bool || false
      if (bool) curItem.value = data
    }

    const exportData = () => {}

    const search = data => {
      criteria.value = data
      loadData()
    }

    const loadData = () => {
      const params = {
        ...criteria.value,
        clientid: raceConfig.clientid,
        markettype: raceConfig.markettype,
        raceid: raceConfig.raceid
      }
      tableDom.value.loadData(params)
    }

    const navChange = item => {
      criteria.value = {}
      navValue.value = item.value
      ajaxApi.getList = param =>
        navValue.value === 0 ? queryNowOrders(param) : queryHisOrders(param)
      loadData()
    }

    onMounted(() => {
      loadData()
    })
    return {
      navItems: EXCHANGE.navItems,
      navChange,
      toolBar: computed(() => props.toolsBarList[navValue.value]),
      ajaxApi,
      tableDom,
      status,
      tableHeader: computed(() =>
        navValue.value === 0 ? props.nowHeader : props.hisHeader
      ),
      modal,
      changeVisible,
      curItem,

      exportData,
      search
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
