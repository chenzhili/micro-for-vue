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
      { attrs: { prop: "a", label: "美元余额" } },
      { attrs: { prop: "a", label: "总市值" } },
      { attrs: { prop: "a", label: "总资产" } },
      { attrs: { prop: "a", label: "总盈亏" } },
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
      { label: "银行->外汇账户", value: 0 },
      { label: "外汇账户->银行", value: 1 }
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
