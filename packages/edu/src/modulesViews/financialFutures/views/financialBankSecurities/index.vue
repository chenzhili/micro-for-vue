<template>
  <div class="container">
    <bank-securities-transfer :ajaxApi="ajaxApi" :assetHeader="assetHeader" :EFTHeader="EFTHeader"></bank-securities-transfer>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  components: {},
  setup (props) {
    const assetHeader = [
      { attrs: { prop: "a", label: "可用资金" } },
      { attrs: { prop: "a", label: "可取资金" } },
      { attrs: { prop: "a", label: "客户权益" } },
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
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })
    return {
      ajaxApi,
      assetHeader
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
