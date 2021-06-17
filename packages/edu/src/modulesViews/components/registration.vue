<template>
  <div class="container">
    <table-query
      :navItems="navItems"
      :tableHeader="tableHeader"
      :ajaxApi="ajaxApi"
      :toolBar="{ date: true, type: true, export: true, search: true }"
      typeName="买卖方向："
      @search="search"
      ref="tableDom"
    >
      <template #order="{scope}">{{scope.$index+1}}</template>
    </table-query>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { REGISTRATION } from "./setting"
import { queryDeliveryOrders } from "@/api/myRace/order"
import { getRaceConfig } from "@/utils/auth.js"

export default {
  props: {
    toolsBar: {
      type: Object,
      require: true
    }
  },
  setup (props) {
    const raceConfig = JSON.parse(getRaceConfig())
    const tableDom = ref(null)
    const criteria = ref({
      entrustbs: '',
      status: '',
      starttime: '',
      endtime: ''
    })
    const ajaxApi = reactive({
      getList (param) {
        return queryDeliveryOrders(param)
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

    onMounted(() => {
      loadData()
    })
    return {
      navItems: REGISTRATION.navItems,
      tableHeader: REGISTRATION.header,
      tableDom,
      ajaxApi,
      search,
      exportData
    }
  }
}
</script>

<style lang="scss" scoped></style>
