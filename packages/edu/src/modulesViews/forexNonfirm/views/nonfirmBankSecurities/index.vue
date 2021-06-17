<template>
  <div class="container">
    <bank-securities-transfer
      :ajaxApi="ajaxApi"
      :assetHeader="assetHeader"
      :EFTHeader="EFTHeader"
      currency="美元"
      title="银汇转账"
      :direction="direction"
    ></bank-securities-transfer>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  components: {},
  setup (props) {
    const assetHeader = [
      { attrs: { prop: "a", label: "账面余额" } },
      { attrs: { prop: "a", label: "可用保证金" } },
      { attrs: { prop: "a", label: "持仓盈亏" } },
      { attrs: { prop: "a", label: "实际净值" } },
      { attrs: { prop: "a", label: "银行资金余额" } }
    ]
    const EFTHeader = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "转账日期" } },
      { attrs: { prop: "a", label: "转账时间" } },
      { attrs: { prop: "a", label: "申请流水号" } },
      { attrs: { prop: "a", label: "业务类别" } },
      { attrs: { prop: "a", label: "银行编号" } },
      { attrs: { prop: "a", label: "金额" } }
    ]
    const direction = [
      { label: "银行->外汇", value: 0 },
      { label: "外汇->银行", value: 1 }
    ]
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })
    return {
      ajaxApi,
      assetHeader,
      EFTHeader,
      direction
    }
  }
}
</script>

<style lang="scss" scoped></style>
