<template>
  <div class="right">
    <div class="head">
      <h-nav-bar-new
        :list="hlist"
        :activeIndex="hNavActiveIndex"
        @tabChange="hNavChange"
      >
        <template #suffix>
          <div class="tools">
            <div class="tool">
                 <div class="icon">
            <div class="no-icon">
              <img src="@/assets/toolsImg/update.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/update_ac.png" alt />
            </div>
          </div>刷新
            </div>
            <el-input placeholder="代码/拼音首字母" v-model="input" clearable>
              <template #suffix>
                <i class="el-input__icon el-icon-search" @click="search"></i>
              </template>
            </el-input>
          </div>
        </template>
      </h-nav-bar-new>
    </div>
    <page-table
      :api="ajaxApi"
      ref="pageRef"
      :defaultData="defaultData"
      :pageSize="7"
      :marginTop="15"
    >
      <template #="tableScope">
        <table-com
          :tableData="tableScope.datas"
          :tableHeader="tableHeader"
          v-loading="tableScope.loading"
        >
          <template #code="{scope}">
            <span
              style="color: #3a6fd9;cursor: pointer;"
              @click="toKLine(scope.row)"
              >{{ scope.row.code }}</span
            ></template
          >
        </table-com>
      </template>
    </page-table>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  setup (props, { emit }) {
    const pageRef = ref(null)
    const hlist = [{ label: "基础汇率" }, { label: "交叉汇率" }]
    const hNavActiveIndex = ref(0)
    const defaultData = [
      { a: "465456", code: "600000", name: "浦发银行", marketId: "0" },
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
      { attrs: { prop: "a", label: "名称", fixed: true } },
      { attrs: { prop: "code", label: "代码", fixed: true }, custom: true },
      { attrs: { prop: "a", label: "买入价" } },
      { attrs: { prop: "a", label: "卖出价" } },
      { attrs: { prop: "a", label: "最新价" } },
      { attrs: { prop: "a", label: "开盘" } },
      { attrs: { prop: "a", label: "最高" } },
      { attrs: { prop: "a", label: "最低" } },
      { attrs: { prop: "a", label: "昨收价" } },
      { attrs: { prop: "a", label: "涨幅%" } }
    ]

    const hNavChange = e => {
      hNavActiveIndex.value = e.index
    }
    const toKLine = e => {
      emit("showKline", e)
    }
    return {
      pageRef,
      defaultData,
      ajaxApi,
      tableHeader,
      hlist,
      hNavActiveIndex,
      hNavChange,
      toKLine
    }
  }
}
</script>

<style lang="scss" scoped>
.right {
  height: 595px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 11px;
  flex: 1;
  max-width: 859px;
  overflow: hidden;
  padding: 0 24px;
  margin-left: 20px;
  .head {
    height: 75px;
    // border-bottom: 1px solid #ebebeb;
    display: flex;
    align-items: center;
    .tools {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .tool {
        display: flex;
        margin-left: 24px;
         .icon {
          position: relative;
          margin-right: 5px;
          & > div {
            height: 15px;
          }
          .ac-icon {
            position: absolute;
            opacity: 0;
            top: 0;
            background-color: #ffffff;
          }

        }
        &:hover {
          color: #e0585b;
          .icon {
            .ac-icon {
              opacity: 1;
            }
          }
          .no-icon {
            opacity: 0;
          }
        }
      }
    }
  }
  :deep .el-input {
    width: 170px;
    height: 40px;
    opacity: 1;
    border: 1px solid #dddddd;
    border-radius: 5px;
  }
  :deep .el-input--suffix .el-input__inner {
    background: #f4f4f4;
  }
   :deep .el-table__header-wrapper, .el-table__footer-wrapper{
    height: 60px;
  }

  i {
    cursor: pointer;
    &:hover{
      color:#222;
    }
  }
}
</style>
