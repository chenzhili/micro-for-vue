<template>
  <dialog-com
    title="成交明细"
    :visible="visible"
    :coop="{ show: false, confirmTxt: '确定', cancelTxt: '取消' }"
    :center="true"
    :width="1000"
  >
    <table-com :tableHeader="hearder" :tableData="tableData">
      <template #order="{scope}">{{scope.$index+1}}</template>
    </table-com>
  </dialog-com>
</template>

<script>
import { watch, ref } from 'vue'
// import { getDetail } from '../aBargainMsg/data'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    changeNo: {
      type: Number
    }
  },
  setup (props, { emit }) {
    const hearder = [
      { attrs: { prop: "order", label: "序号" }, custom: true },
      { attrs: { prop: "businessubno", label: "成交子编号" } },
      { attrs: { prop: "businesscrtdate", label: "成交日期" } },
      { attrs: { prop: "businesscrttime", label: "成交时间" } },
      { attrs: { prop: "optbusinessprice", label: "成交价格" } },
      { attrs: { prop: "businessamount", label: "成交数量" } },
      { attrs: { prop: "businessbalance", label: "成交金额" } },
      { attrs: { prop: "restnum", label: "证券余量" } }
    ]

    const tableData = ref([])

    watch(props, async nv => {
      // const res = await getDetail({ businessecno: nv.changeNo })
      // tableData.value = res.data
    })
    return {
      hearder,
      tableData
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #222222;
}
</style>
