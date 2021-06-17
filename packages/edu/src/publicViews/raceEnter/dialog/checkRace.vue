<template>
  <dialog-com
    title="标准港股比赛"
    :visible="visible"
    :coop="{ show: false, confirmTxt: '确定', cancelTxt: '取消' }"
    :center="true"
    :width="1060"
    @confrimMethod="coopMethod"
  >
    <div class="container">
      <div class="msg">
        <div class="row">
          <div class="grid">
            <div class="gridL">参赛对象：</div>
            <div class="gridR">{{rule.raceobject}}</div>
          </div>
          <div class="grid">
            <div class="gridL">参赛人数限制：</div>
            <div class="gridR">{{rule.countlimit}}</div>
          </div>
          <div class="grid">
            <div class="gridL" :style="{width:'75px'}">初始资金：</div>
            <div class="gridR">{{rule.intialasset}}</div>
          </div>
        </div>
        <div class="row">
          <div class="grid">
            <div class="gridL">交易时间：</div>
            <div class="gridR">{{rule.transactionhour}}</div>
          </div>
          <div class="grid">
            <div class="gridL">结束时间：</div>
            <div class="gridR">{{rule.tradetime}}</div>
          </div>
        </div>
        <div class="row">
          <div class="grid">
            <div class="gridL">最大持仓比例：</div>
            <div class="gridR">{{rule.intialasset}}</div>
          </div>
          <div class="grid">
            <div class="gridL">持有股票数量：</div>
            <div class="gridR">{{rule.intialasset}}</div>
          </div>
        </div>
        <div class="row">
          <div class="grid">
            <div class="gridL">主办单位：</div>
            <div class="gridR">{{rule.organizer}}</div>
          </div>
          <div class="grid">
            <div class="gridL">承办单位：</div>
            <div class="gridR">{{rule.undertake}}</div>
          </div>
        </div>
      </div>
      <div class="race">
        <div class="raceH">相关费率</div>
        <table-com
          :tableData="rule.list"
          :tableHeader="tableHeader"
          :border="false"
        >
          <template #name></template>
          <template #buyorsell="{ scope }">{{scope.row.buyorsell==='1'?'买入':'卖出'}}</template>
        </table-com>
      </div>
      <div class="game">
        <div class="gameH">关于比赛</div>
        <div class="text">{{rule.matchrule?rule.matchrule:'暂无相关比赛内容'}}</div>
      </div>
    </div>
  </dialog-com>
</template>

<script>
import { onMounted } from 'vue'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    rule: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const tableHeader = [
      { attrs: { prop: "name", label: "商品名称" }, custom: true },
      { attrs: { prop: "buyorsell", label: "方向" }, custom: true },
      { attrs: { prop: "stamptax", label: "印花税(%)" } },
      { attrs: { prop: "stamptaxfloor", label: "最低印花税(元)" } },
      { attrs: { prop: "transactionfee", label: "过户费(‰)" } },
      { attrs: { prop: "transactionfeefloor", label: "最低过户费(元)" } },
      { attrs: { prop: "tradefee", label: "佣金(‰)" } },
      { attrs: { prop: "tradefeefloor", label: "最低佣金(元)" } }
    ]
    const coopMethod = type => {
      if (type === "confirm") {
        console.log("确认")
      }
    }
    return {
      tableHeader,
      coopMethod
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .msg {
    margin-left: 20px;
    .row {
      display: flex;
      margin-bottom: 24px;
      .grid {
        width: 245px;
        display: flex;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        .gridL {
          width: 100px;
          color: #222222;
        }
        .gridR {
          color: #8d8d8d;
        }
      }
    }
  }
  .race {
    width: 972px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 9px;
    padding: 0 24px 24px;
    .raceH {
      height: 67px;
      border-bottom: 1px solid #ebebeb;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #222222;
      display: flex;
      align-items: center;
    }
  }
  .game {
    width: 972px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 9px;
    padding: 0 24px 24px;
    margin-top: 28px;
    .gameH {
      height: 67px;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #222222;
      display: flex;
      align-items: center;
    }
    .text {
      padding: 15px 24px;
      width: 902;
      height: 81px;
      opacity: 1;
      background: #f3f3f3;
      border-radius: 6px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #8d8d8d;
    }
  }
}
</style>
