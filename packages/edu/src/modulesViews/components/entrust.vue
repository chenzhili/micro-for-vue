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
      <template #detail="{scope}">
        <el-button @click="changeVisible('changeDetailVis', true, scope.row)" size="small">查看</el-button>
      </template>
      <template #reason="{scope}">
        <el-button @click="changeVisible('orderReasonVis', true, scope.row)" size="small">查看</el-button>
      </template>
    </table-query>
    <order-reason
      :visible="modal.orderReasonVis"
      :orderReason="curItem.orderresean"
      @changeVisible="changeVisible('orderReasonVis')"
    ></order-reason>
    <change-detail
      :visible="modal.changeDetailVis"
      :changeNo="curItem.businessecno"
      @changeVisible="changeVisible('changeDetailVis')"
    ></change-detail>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue"
import { queryNowDeal, queryHisDeal } from "@/api/myRace/order"
import { getRaceConfig } from "@/utils/auth.js"
import changeDetail from "./dialog/changeDetail"
import orderReason from "./dialog/orderReason"
import { ENTRUST } from "./setting"
export default {
  components: {
    changeDetail,
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
    const criteria = ref({
      entrustbs: "",
      status: "",
      starttime: "",
      endtime: ""
    })
    const modal = reactive({
      changeDetailVis: false,
      orderReasonVis: false
    })
    const ajaxApi = reactive({
      getList (param) {
        return Promise.resolve()
      }
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
      navValue.value = item.value
      ajaxApi.getList = param =>
        navValue.value === 0 ? queryNowDeal(param) : queryHisDeal(param)
      loadData()
    }
    onMounted(() => {
      loadData()
    })
    return {
      navItems: ENTRUST.navItems,
      navChange,
      toolBar: computed(() => props.toolsBarList[navValue.value]),
      tableHeader: computed(() =>
        navValue.value === 0 ? props.nowHeader : props.hisHeader
      ),
      ajaxApi,
      tableDom,
      modal,
      changeVisible,
      curItem,

      search
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
