<template>
  <div
    class="WDcontainer"
    :style="{ width: ratio.width, height: ratio.height }"
  >
    <div class="WDhead" :style="{ height: ratio.headHeight }">买卖五档</div>
    <div class="WDbody" :style="{ height: ratio.bodyHeight }">
      <div class="WDbs" v-for="(item, index) in sellData" :key="index">
        <div class="bsValue">{{ item.label }}</div>
        <div class="bsValue">{{ item.price }}</div>
        <div class="bsValue">{{ item.num }}</div>
      </div>
    </div>
    <div class="WDbody" :style="{ height: ratio.bodyHeight }">
      <div class="WDbs" v-for="(item, index) in buyData" :key="index">
        <div class="bsValue">{{ item.label }}</div>
        <div class="bsValue">{{ item.price }}</div>
        <div class="bsValue">{{ item.num }}</div>
      </div>
    </div>
    <div class="WDfooter" :style="{ height: ratio.footerHeight }">
      <div class="disF">
        <div class="disL">
          <div class="marR">今开</div>
          <div>6248.80</div>
        </div>
        <div class="disR">
          <div class="marR">最高</div>
          <div>6250.23</div>
        </div>
      </div>
      <div class="disF">
        <div class="disL">
          <div class="marR">最新</div>
          <div>1.21</div>
        </div>
        <div class="disR">
          <div class="marR">最低</div>
          <div>4036</div>
        </div>
      </div>
      <div class="disF">
        <div class="disL">
          <div class="marR">涨幅</div>
          <div>--</div>
        </div>
        <div class="disR">
          <div class="marR">总量</div>
          <div>--</div>
        </div>
      </div>
      <div class="disF">
        <div class="disL">
          <div class="marR">涨停</div>
          <div>--</div>
        </div>
        <div class="disR">
          <div class="marR">跌停</div>
          <div>--</div>
        </div>
      </div>
      <div class="disF">
        <div class="disL">
          <div class="marR">昨收</div>
          <div>--</div>
        </div>
        <div class="disR">
          <div class="marR">昨结</div>
          <div>--</div>
        </div>
      </div>
      <div class="disF">
        <div class="disL">
          <div class="marR">金额</div>
          <div>--</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  props: {
    ratio: {
      type: Object,
      default: () => {
        return {
          width: "194px",
          height: "595px",
          headHeight: "32px",
          bodyHeight: "66px",
          footerHeight: ""
        }
      }
    }
  },
  setup (props) {
    const sellData = ref([{ label: "卖一", price: "--", num: "--" }])

    const buyData = ref([{ label: "买一", price: "--", num: "--" }])

    return {
      sellData,
      buyData
    }
  }
}
</script>

<style lang="scss" scoped>
.WDcontainer {
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 11px;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  color: #18191c;
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
    height: 66px;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    align-items: center;
    justify-content: center;
    .WDbs {
      display: flex;
      // justify-content: center;
      margin-left: 14px;
      .bsValue {
        width: 60px;
      }
    }
  }
  .WDfooter {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #18191c;
    padding-top: 24px;
    .disF {
      display: flex;
      margin-bottom: 24px;
      margin-left: 14px;
      &:last-child {
        margin-bottom: 0;
      }
      .marR {
        margin-right: 5px;
      }
      .disL {
        display: flex;
        width: 90px;
      }
      .disR {
        display: flex;
        width: 90px;
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
