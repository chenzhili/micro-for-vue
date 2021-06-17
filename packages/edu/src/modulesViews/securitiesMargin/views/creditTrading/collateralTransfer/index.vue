<template>
  <div class="container">
    <div class="transfer">
      <div class="head">担保品划转</div>
      <div class="fund-list">
        <div class="fund" v-for="(item, index) in accountList" :key="index">
          <div class="title">{{ item.type }}</div>
          <div
            class="capital"
            :style="{
              'border-right': index !== 0 ? 'none' : '1px solid #ebebeb'
            }"
          >
            <div class="package">
              <div class="num">
                {{ item.availableFund }}
                <div class="YUAN">元</div>
              </div>
              <div class="name">可用金额</div>
              <div class="num">
                {{ item.availableStock }}
                <div class="YUAN">元</div>
              </div>
              <div class="name">可用证券</div>
            </div>
          </div>
          <div class="table">
            <table-com
              :tableData="item.tableData"
              :tableHeader="tableHeader"
              :border="false"
            ></table-com>
          </div>
        </div>
      </div>
    </div>
    <div class="form">
      <div class="tabs">
        <div
          class="tab"
          v-for="(item, index) in tabs"
          :key="index"
          :class="{ active: tabValue === item.value }"
          @click="toggle(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <component :is="keyValue"></component>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue"
import GoodsInto from './components/goodsInto'
import GoodsOut from './components/goodsOut'
export default {
  components: {
    GoodsInto, GoodsOut
  },
  setup (props) {
    const tableData = [
      { a: "平安银行", b: "100001", c: "000001", d: "120000" },
      { a: "平安银行", b: "100001", c: "000001", d: "120000" }
    ]
    const tableHeader = [
      { attrs: { prop: "a", label: "证券名称" } },
      { attrs: { prop: "b", label: "证券代码" } },
      { attrs: { prop: "c", label: "持仓数量" } },
      { attrs: { prop: "d", label: "可用数量" } }
    ]
    const accountList = [
      {
        type: "信用账户：",
        availableFund: "44444444.00",
        availableStock: "44444444.00",
        tableData: tableData
      },
      {
        type: "普通账户：",
        availableFund: "44444444.00",
        availableStock: "44444444.00",
        tableData: tableData
      }
    ]

    const tabs = [
      { label: "担保品转入", value: 0 },
      { label: "担保品转出", value: 1 }
    ]
    const tabValue = ref(0)
    const toggle = e => {
      tabValue.value = e.value
    }
    return {
      tableData,
      tableHeader,
      accountList,
      tabs,
      tabValue,
      toggle,
      keyValue: computed(() => tabValue.value === 0 ? 'GoodsInto' : 'GoodsOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @mixin font-style($size: 16px, $weight: 400, $color: #18191c) {
    font-size: $size;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: $weight;
    text-align: center;
    color: $color;
  }
  margin-top: 20px;
  .transfer {
    width: 1398px;
    height: 555px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 11px;
    .head {
      @include font-style(16px, 700, #18191c);
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      height: 68px;
      border-bottom: 1px solid #ebebeb;
      padding-left: 24px;
      display: flex;
      align-items: center;
      border-radius: 11px 11px 0 0;
    }
    .fund-list {
      display: flex;
      .fund {
        width: 50%;
        .title {
          @include font-style;
          height: 88px;
          padding-left: 42px;
          display: flex;
          align-items: center;
        }
        .capital {
          height: 169px;
          display: flex;
          justify-content: center;
          border-right: 1px solid #ebebeb;
          .package {
            .num {
              padding-bottom: 21px;
              display: flex;
              align-items: flex-end;
              @include font-style(22px, 400, #18191c);
              font-family: DIN, DIN-Regular;
              .YUAN {
                @include font-style(16px, 800, #8d8d8d);
                margin-left: 2px;
              }
            }
            .name {
              padding-bottom: 30px;
              @include font-style;
            }
          }
        }
        .table {
          width: 456px;
          margin: 35px auto;
        }
      }
    }
  }
  .form {
    width: 1308px;
    // height: 290px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 11px;
    margin: 24px 0 20px;
    padding: 24px 45px;
    .tabs {
      display: flex;
      @include font-style;
      .tab {
        width: 105px;
        text-align: left;
        margin-right: 23px;
        cursor: pointer;
        &:nth-child(1) {
          border-right: 1px solid #a8abae;
        }
        &.active {
          font-weight: 700;
          color: #e0585b;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        }
        &:hover{
          font-weight: 700;
          color: #e0585b;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        }
      }
    }
  }
}
</style>
