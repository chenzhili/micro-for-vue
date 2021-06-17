<template>
  <div class="t-table">
    <h-nav-bar-new
      :list="hlist"
      :activeIndex="hNavActiveIndex"
      @tabChange="hNavChange"
    ></h-nav-bar-new>
    <div class="head">
      <div class="head-lr">
        <div class="headL titleT">认购</div>
        <div class="headR titleT">认沽</div>
      </div>
      <div class="headM">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in times"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
  <t-style-table style="margin:0 auto;margin-top: 16px" bodyHeight="400" halfWidth="365" @row-click="rowClick">
    <t-style-table-left :data="data.left">
      <template v-for="(item,index) in tableHeader" :key="index">
        <t-style-table-column prop="price" width="100">
          <template #default="scope">
            <div :style="{ color: scope.row.price > 0 ? '#f00' : '#07c180' }">
              {{ scope.row.price }}
            </div>
          </template>
          <template #header>
            <div style="background:#e0585b;color:#fff">{{ item.label }}</div>
          </template>
        </t-style-table-column>
      </template>
    </t-style-table-left>

    <t-style-table-center :data="data.center">
      <t-style-table-column prop="price" label="执行价" width="100">
      </t-style-table-column>
    </t-style-table-center>

    <t-style-table-right :data="data.right">
      <template v-for="(item,key) in tableHeader.reverse()" :key="key">
        <t-style-table-column prop="price" width="100">
          <template #default="scope">
            <div :style="{ color: scope.row.price > 0 ? '#f00' : '#07c180' }">
              {{ scope.row.price }}
            </div>
          </template>
          <template #header>
            <div style="background:#e0585b;color:#fff">{{ item.label }}</div>
          </template>
        </t-style-table-column>
      </template>
    </t-style-table-right>
  </t-style-table>
</template>

<script>
import { onMounted, reactive, ref } from "vue"

export default {
  setup (props) {
    const hlist = [
      { label: "上证50ETF" },
      { label: "上海300ETF" },
      { label: "深证300ETF" }
    ]

    const hNavActiveIndex = ref(0)

    const hNavChange = e => {
      hNavActiveIndex.value = e.index
    }

    const times = [
      { label: "2021年04月(22天)", value: 0 },
      { label: "2021年05月(50天)", value: 1 },
      { label: "2021年06月(78天)", value: 2 },
      { label: "2021年09月(169天)", value: 3 }
    ]

    const value = ref(0)

    const data = reactive({
      left: [],
      center: [],
      right: []
    })

    const tableHeader = [
      { label: 'Rho' },
      { label: 'Theta' },
      { label: 'Vega' },
      { label: 'Gamma' },
      { label: 'DeIta' },
      { label: '隐波%' },
      { label: '理论价' },
      { label: '真实杠杆' },
      { label: '杠杆' },
      { label: '溢价%' },
      { label: '时间价值' },
      { label: '内在价值' },
      { label: '虚实度%' },
      { label: '卖出' },
      { label: '买入' },
      { label: '持仓' },
      { label: '总量' },
      { label: '涨幅%' },
      { label: '涨跌' },
      { label: '最新' }
    ]

    const rowClick = e => {
      console.log(e.row)
      console.log(e.index)
    }

    onMounted(() => {
      const left = []
      const center = []
      const right = []
      for (let index = 0; index < 10; index++) {
        left.push({ price: 19.23 })
        center.push({ price: 18.58 })
        right.push({ price: -19.45 })
      }
      data.left = left
      data.center = center
      data.right = right
    })

    return {
      hlist,
      hNavActiveIndex,
      hNavChange,
      value,
      times,
      data,
      rowClick,
      tableHeader
    }
  }
}
</script>

<style lang="scss" scoped>
.t-table {
  .head {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 16px;
    .head-lr {
      flex: 1;
      display: flex;
      justify-content: space-between;
      .titleT {
        width: 367px;
        height: 42px;
        line-height: 42px;
        border-radius: 4px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
      }
      .headL {
        background-color: rgba($color: #f33a52, $alpha: 0.2);
        color: #f33a52;
      }
      .headR {
        background-color: rgba($color: #07c180, $alpha: 0.2);
        color: #07c180;
      }
    }
    .headM {
      position: absolute;
      top: 0;
      width: 192px;
      &::v-deep(.el-input--suffix .el-input__inner) {
        height: 42px;
        border: none;
        background: #f4f4f4;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #222222;
      }
    }
  }
  :deep(.header-class) {
    background-color: #e0585b !important;
    color: #fff !important;
    border-radius: 6px;
  }
  :deep(.header-center-class) {
    background-color: #eeeeee !important;
    .t-style-table-column {
      opacity: 0.6;
      color: #18191c;
    }
  }
  :deep(.body-center-class) {
    background-color: #eeeeee !important;
    color: #18191c !important;
  }
}
</style>
