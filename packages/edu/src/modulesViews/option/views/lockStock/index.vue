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
    <div class="right">
      <table-toolbar title="可锁定解锁股份"></table-toolbar>
      <page-table
        :api="ajaxApi"
        ref="pageRef"
        :defaultData="defaultData"
        :pageSize="7"
        :marginTop="25"
      >
        <template #="tableScope">
          <table-com
            :tableData="tableScope.datas"
            :tableHeader="tableHeader"
            v-loading="tableScope.loading"
          >
          </table-com>
        </template>
      </page-table>
    </div>
  </div>
</template>

<script>
import { LOCK_DATA, UNLOCK_DATA, LOCK_BTNS, UNLOCK_BTNS } from "./form"
import { ref, computed, reactive } from "vue"
export default {
  components: {},

  setup (props) {
    const tabList = [
      { label: "锁定", value: 0 },
      { label: "解锁", value: 1 }
    ]
    const pageRef = ref(null)
    const defaultData = [
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
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "证券代码" } },
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "a", label: "可锁定数量" } },
      { attrs: { prop: "a", label: "可解锁数量" } },
      { attrs: { prop: "a", label: "交易市场" } }
    ]
    const tabValue = ref(0)
    const tabClick = e => {
      tabValue.value = e.value
    }
    return {
      formItems: computed(() =>
        tabValue.value === 0 ? LOCK_DATA : UNLOCK_DATA
      ),
      coopBtns: computed(() =>
        tabValue.value === 0 ? LOCK_BTNS : UNLOCK_BTNS
      ),
      tabList,
      tabClick,
      pageRef,
      defaultData,
      ajaxApi,
      tableHeader
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
  .right {
    height: 595px;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 11px;
    flex: 1;
    overflow: hidden;
    padding: 0 24px;
  }

}
</style>
