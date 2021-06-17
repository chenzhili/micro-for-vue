<template>
  <div class="container">
    <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :toolBar="toolBar"
      typeName="买卖方向："
      @navChange="navChange"
      @search="search"
      ref="tableDom"
    >
      <template #order="{scope}">{{scope.$index+1}}</template>
      <template #entrustbs="{scope}">{{scope.row.entrustbs==="1"?'买入':'卖出'}}</template>
    </table-query>
  </div>
</template>

<script>
import { queryNowCapitalFlows, queryHisCapitalFlows } from "@/api/myRace/order"
import { getRaceConfig } from "@/utils/auth.js"
import { TURNOVER } from "./setting"
import { ref, reactive, computed, onMounted } from "vue"
export default {
  components: {},
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
    const tableDom = ref(null)
    const criteria = ref({})
    const ajaxApi = reactive({
      getList (param) {
        return queryNowCapitalFlows(param)
      }
    })
    const exportData = () => {

    }

    const search = (data) => {
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
        navValue.value === 0
          ? queryNowCapitalFlows(param)
          : queryHisCapitalFlows(param)
      tableDom.value.loadData()
      loadData()
    }

    onMounted(() => {
      loadData()
    })

    return {
      navItems: TURNOVER.navItems,
      navChange,
      toolBar: computed(() => props.toolsBarList[navValue.value]),
      tableHeader: computed(() =>
        navValue.value === 0 ? props.nowHeader : props.hisHeader
      ),
      ajaxApi,
      tableDom,

      exportData,
      search
    }
  }
}
</script>

<style lang="scss" scoped></style>
