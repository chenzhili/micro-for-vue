<template>
  <div class="WDcontainer" :style="{ width: ratio.width, height: ratio.height }">
    <div class="WDhead" :style="{ height: ratio.headHeight }">买卖五档</div>
    <div class="WDbody" :style="{ height: ratio.bodyHeight }">
      <div class="WDbs list-in" v-for="(item,index) in sellLabel" :key="index">
        <div class="bsValue">{{item.label}}</div>
        <div class="bsValue">{{sellList[index]?sellList[index].price:'--'}}</div>
        <div class="bsValue">{{sellList[index]?sellList[index].volume:'--'}}</div>
      </div>
    </div>
    <div class="WDbody" :style="{ height: ratio.bodyHeight }">
      <div class="WDbs list-in" v-for="(item,index) in buyLabel" :key="index">
        <div class="bsValue">{{item.label}}</div>
        <div class="bsValue">{{buyList[index]?sellList[index].price:'--'}}</div>
        <div class="bsValue">{{sellList[index]?sellList[index].volume:'--'}}</div>
      </div>
    </div>
    <div class="WDfooter" :style="{ height: ratio.footerHeight }">
      <div class="disF">
        <div class="disL">
          <div class="marR">涨停</div>
          <div :class="{red:profitData.upstop}">{{profitData.upstop||'--'}}</div>
        </div>
        <div class="disR">
          <div class="marR">跌停</div>
          <div :class="{green:profitData.downstop}">{{profitData.downstop||'--'}}</div>
        </div>
      </div>
      <div class="disF">
        <div class="disL">
          <div class="marR">昨收</div>
          <div>{{profitData.close||'--'}}</div>
        </div>
        <div class="disR">
          <div class="marR">现价</div>
          <div>{{profitData.now||'--'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, reactive, computed } from "vue"
export default {
  props: {
    ratio: {
      type: Object,
      default: () => {
        return {
          width: "192px",
          height: "595px",
          headHeight: "32px",
          bodyHeight: "232px",
          footerHeight: "109px"
        }
      }
    },
    buys: {
      type: Array,
      default: () => []
    },
    sells: {
      type: Array,
      default: () => []
    },
    profit: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const sellLabel = [
      { label: "卖五" },
      { label: "卖四" },
      { label: "卖三" },
      { label: "卖二" },
      { label: "卖一" }
    ]
    const buyLabel = [
      { label: "买一" },
      { label: "买二" },
      { label: "买三" },
      { label: "买四" },
      { label: "买五" }
    ]

    return {
      sellLabel,
      buyLabel,
      buyList: computed(() => props.buys || []),
      sellList: computed(() => props.sells || []),
      profitData: computed(() => props.profit || {})
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/interaction.scss";
@include list-in(5);
.WDcontainer {
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 11px;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  .WDhead {
    background: #e3e3e3;
    border-radius: 10px 10px 0 0;
    font-size: 12px;
    font-weight: 400;
    color: #222222;
    padding-left: 16px;
    display: flex;
    align-items: center;
  }
  .WDbody {
    border-bottom: 1px solid #ebebeb;
    display: flex;
    flex-direction: column;
    padding: 20px 10px 44px;
    box-sizing: border-box;
    .WDbs {
      display: flex;
      // justify-content: space-between;
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0;
      }
      .bsValue {
        &:first-child {
          margin-right: 39px;
        }
        &:last-child {
          margin-right: 0;
          flex-grow: 1;
          text-align: right;
        }
      }
    }
  }
  .WDfooter {
    padding: 20px 10px 42px;
    box-sizing: border-box;
    .disF {
      display: flex;
      justify-content: space-between;
      margin-bottom: 13px;
      &:last-child {
        margin-bottom: 0;
      }
      .marR {
        margin-right: 8px;
      }
      .disL {
        display: flex;
      }
      .disR {
        display: flex;
      }
    }
  }
  .red {
    color: #f33a52;
  }
  .green {
    color: #07c180;
  }
}
</style>
