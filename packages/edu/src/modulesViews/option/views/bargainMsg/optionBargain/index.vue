<template>
  <div class="option_table">
    <div class="tabList">
      <div
        class="nav"
        v-for="item in navList"
        :key="item.value"
        :class="{ active: navValue === item.value }"
        @click="navChange(item)"
      >
        {{ item.label }}
      </div>
      <div class="btns">
        <div class="btn">
          <div class="icon">
            <div>
              <img src="@/assets/toolsImg/update.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/update_ac.png" alt />
            </div>
          </div>
          刷新
        </div>
        <div class="btn">
          <div class="icon">
            <div>
              <img src="@/assets/toolsImg/export.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/export_ac.png" alt />
            </div>
          </div>
          导出
        </div>
        <div class="btn" v-if="!isTable">
          类别：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="btn" v-if="!isTable">
          <el-date-picker
            is-range
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="起始时间"
            end-placeholder="截止时间"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="table" v-if="isTable">
      <page-table :api="ajaxApi" ref="pageRef" :defaultData="defaultData">
        <template #="tableScope">
          <table-com
            :tableData="tableScope.datas"
            :tableHeader="tableHeader"
            v-loading="tableScope.loading"
          >
            <template #test
              ><img
                src="@/assets/toolsImg/test.gif"
                alt=""
                style="width:30px;height:30px"
            /></template>
          </table-com>
        </template>
      </page-table>
    </div>
    <div class="table" v-else>
      <page-table :api="ajaxApi" ref="pageRef" :defaultData="defaultData">
        <template #="tableScope">
          <table-com
            :tableData="tableScope.datas"
            :tableHeader="tableHeader1"
            v-loading="tableScope.loading"
          >
          </table-com>
        </template>
      </page-table>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue"
export default {
  components: {},
  setup () {
    const navList = [
      { label: "当日成交", value: 0 },
      { label: "历史成交", value: 1 }
    ]
    const value = ref(0)
    const time = ref("")
    const options = [
      { label: "全部", value: 0 },
      { label: "买入开仓", value: 1 },
      { label: "买入平仓", value: 2 },
      { label: "卖出开仓", value: 3 },
      { label: "卖出平仓", value: 4 }
    ]
    const navValue = ref(0)
    const pageRef = ref(null)
    const isTable = ref(true)
    const defaultData = [
      { a: "465456" },
      { a: "123" },
      { a: "465456" },
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
      { attrs: { prop: "a", label: "成交时间" } },
      { attrs: { prop: "a", label: "合约代码" } },
      { attrs: { prop: "a", label: "合约名称" } },
      { attrs: { prop: "a", label: "买卖类别" } },
      { attrs: { prop: "a", label: "开平仓" } },
      { attrs: { prop: "a", label: "备兑标志" } },
      { attrs: { prop: "a", label: "成交状态" } },
      { attrs: { prop: "a", label: "成交数量" } },
      { attrs: { prop: "a", label: "成交价格" } },
      { attrs: { prop: "a", label: "成交金额" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "成交编号" } },
      { attrs: { prop: "a", label: "费用" } },
      { attrs: { prop: "test", label: "下单理由" }, custom: true }
    ]
    const tableHeader1 = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "成交日期" } },
      { attrs: { prop: "a", label: "成交时间" } },
      { attrs: { prop: "a", label: "合约代码" } },
      { attrs: { prop: "a", label: "合约名称" } },
      { attrs: { prop: "a", label: "买卖类别" } },
      { attrs: { prop: "a", label: "开平仓" } },
      { attrs: { prop: "a", label: "备兑标志" } },
      { attrs: { prop: "a", label: "成交状态" } },
      { attrs: { prop: "a", label: "成交数量" } },
      { attrs: { prop: "a", label: "成交价格" } },
      { attrs: { prop: "a", label: "成交金额" } },
      { attrs: { prop: "a", label: "委托编号" } },
      { attrs: { prop: "a", label: "成交编号" } },
      { attrs: { prop: "a", label: "费用" } },
      { attrs: { prop: "a", label: "下单理由" } }
    ]
    const navChange = e => {
      navValue.value = e.value
    }
    return {
      navList,
      options,
      time,
      navValue,
      navChange,
      isDate: computed(() => navValue.value === 0),
      isTable: computed(() => navValue.value === 0),
      pageRef,
      defaultData,
      ajaxApi,
      tableHeader,
      tableHeader1
    }
  }
}
</script>

<style lang="scss" scoped>
.option_table {
  .tabList {
    display: flex;
    align-items: center;
    height: 90px;
    .nav {
      padding-right: 10px;
      margin-right: 10px;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #a8abae;
      cursor: pointer;
      &.active {
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        color: #e0585b;
      }
      &:hover {
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        color: #e0585b;
      }
      &:nth-child(1) {
        border-right: 1px solid #a8abae;
      }
    }
    .btns {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      .btn {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #222222;
        margin-right: 24px;
        cursor: pointer;
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
        }
        img {
          width: 15px;
          height: 15px;
          margin-right: 4px;
        }
        &:nth-child(1) {
          margin-right: 0;
        }
      }
    }
  }
  .table {
    max-width: 1352px;
    overflow: hidden;
  }
}
</style>
