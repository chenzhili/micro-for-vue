<template>
  <div class="K-line" v-loading="loading">
    <line-tabs
      :options="options"
      ref="tabs"
      :selection="selection"
      :min-type="minType"
      @refresh="refresh"
      @mychange="onChange"
      :on-power="setPower"
      @power="onPower"
      @goLast="goLast"
      :havePower="selection !== 0"
      :code="routeInfo.stockcode"
      :name="routeInfo.name"
    ></line-tabs>
    <div class="line-container">
      <div class="minute-line" v-if="selection === 0 && !loading">
        <TimeSharing
          :dataGraph="dataGraphForTime"
          :config="configForTime"
          v-if="dataGraphForTime.data.length > 0"
          class="myhyy"
        ></TimeSharing>
        <div class="data-img" v-else>
          <div>
            <svg-icon icon-class="no_qu"></svg-icon>
          </div>
          <span>暂无分时线数据</span>
        </div>
      </div>
      <div
        class="date-line"
        v-if="selection === 1 && minDataGraphForK.data.length > 0"
      >
        <KLineGraphCom
          :dataGraph="minDataGraphForK"
          :config="configForK"
          :sTt="sTt"
        ></KLineGraphCom>
      </div>
      <div
        class="date-line"
        v-else-if="
          selection > 1 && selection < 5 && fifDataGraphForK.data.length > 0
        "
      >
        <KLineGraphCom
          :dataGraph="fifDataGraphForK"
          :config="configForK"
          :sTt="sTt"
          :curSTT="curSTTFif"
        ></KLineGraphCom>
      </div>
      <div
        class="date-line"
        v-else-if="
          selection > 4 && selection < 7 && dayDataGraphForK.data.length
        "
      >
        <KLineGraphCom
          :dataGraph="dayDataGraphForK"
          :config="configForK"
          :sTt="sTt"
          :curSTT="curSTTDay"
        ></KLineGraphCom>
      </div>
      <div
        class="date-line"
        v-else-if="selection > 6 && monDataGraphForK.data.length > 0"
      >
        <KLineGraphCom
          :dataGraph="monDataGraphForK"
          :config="configForK"
          :sTt="sTt"
        ></KLineGraphCom>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  getCurrentInstance,
  onBeforeUnmount,
  onBeforeMount,
  computed
} from "vue"
import LineTabs from "./LineTabs"
import { dayKline } from "./klineFun"
export default {
  components: { LineTabs },
  props: ["minType", "routeInfo"],
  setup (props, { emit }) {
    const { ctx } = getCurrentInstance()
    const configForTime = {
      insType: "0",
      theme: "light"
    }
    const state = reactive({
      loading: false,
      options: [
        "分时线",
        "5分钟",
        "15分钟",
        "30分钟",
        "60分钟",
        "日K",
        "周k",
        "月K"
      ],
      selection: 0,
      minVal: {
        1: "m5",
        2: "15分钟数据无需转换",
        3: "m30",
        4: "m60",
        5: "日K无需转换",
        6: "w"
      },
      day: {
        forDate: [],
        noDate: []
      },
      // routeInfo: ctx.$router.currentRoute.value.query,
      routeInfo: props.routeInfo,
      minDataGraphForK: {
        // 1分钟
        data: [],
        curData: [],
        wgtflag: 0
      },
      fifDataGraphForK: {
        // 15分钟
        data: [],
        curData: [],
        wgtflag: 0
      },
      dayDataGraphForK: {
        // 1天
        data: [],
        curData: [],
        wgtflag: 0
      },
      monDataGraphForK: {
        // 一个月
        data: [],
        curData: [],
        wgtflag: 0
      },
      sTt: [], // 1分钟转5、30、60分钟
      curSTTFif: ["m1", "m15"],
      curSTTDay: ["m1", "d"],
      dataGraphForTime: {
        data: [],
        preClosePrice: ""
      },
      timer: null,
      date: "",
      workingDay: false,
      wgtflag: 0,
      lastClose: "", // 没有行情时收盘价用这个
      grid: false
    })
    const configForK = computed(() => {
      return {
        insType: "1",
        theme: "light",
        hideDealGrid: state.grid
      }
    })
    // 刷新
    function refresh () {
      const code = state.routeInfo.stockcode
      if (state.selection === 1) {
        dayKline(state, code, state.minDataGraphForK.wgtflag, 0)
      } else if (state.selection > 1 && state.selection < 5) {
        dayKline(state, code, state.fifDataGraphForK.wgtflag, 1)
      } else if (
        (state.selection > 4 && state.selection < 7) ||
        state.selection === 0
      ) {
        dayKline(state, code, state.dayDataGraphForK.wgtflag, 2)
      } else if (state.selection > 6) {
        dayKline(state, code, state.dayDataGraphForK.wgtflag, 3)
      }
    }
    // 切换tab
    function onChange (val) {
      state.selection = val
      state.wgtflag = 0
      switch (val) {
        case 1:
          state.sTt = ["m1", state.minVal[val]]
          break
        case 2:
          state.sTt = []
          break
        case 3:
          state.sTt = ["m15", state.minVal[val]]
          break
        case 4:
          state.sTt = ["m15", state.minVal[val]]
          break
        case 5:
          state.sTt = []
          break
        case 6:
          state.sTt = ["d", state.minVal[val]]
          state.dayDataGraphForK.data = state.day.noDate
          break
        case 7:
          state.sTt = []
          break
        default:
          state.sTt = []
          break
      }
      const code = state.routeInfo.stockcode
      if (!state.minDataGraphForK.data.length && val === 1) {
        dayKline(state, code, state.minDataGraphForK.wgtflag, 0)
      } else if (!state.fifDataGraphForK.data.length && val > 1 && val < 5) {
        dayKline(state, code, state.fifDataGraphForK.wgtflag, 1)
      } else if (!state.dayDataGraphForK.data.length && val > 4 && val < 7) {
        dayKline(state, code, state.dayDataGraphForK.wgtflag, 2)
      } else if (!state.monDataGraphForK.data.length && val > 6) {
        dayKline(state, code, state.monDataGraphForK.wgtflag, 3)
      }
    }
    function setPower () {
      if (state.selection === 1) {
        return state.minDataGraphForK.wgtflag
      } else if (state.selection > 1 && state.selection < 5) {
        return this.fifDataGraphForK.wgtflag
      } else if (state.selection > 4 && state.selection < 7) {
        return state.dayDataGraphForK.wgtflag
      } else if (state.selection > 6) {
        return state.monDataGraphForK.wgtflag
      }
    }
    /**
     * 切换复权
     * @param val 选中的复权 0 不， 1 前， 2 后
     */
    function onPower (val) {
      if (state.selection === 1) {
        state.minDataGraphForK.wgtflag = val
        dayKline(state, state.routeInfo.stockcode, val, 0)
      } else if (state.selection > 1 && state.selection < 5) {
        state.fifDataGraphForK.wgtflag = val
        dayKline(state, state.routeInfo.stockcode, val, 1)
      } else if (state.selection > 4 && state.selection < 7) {
        state.dayDataGraphForK.wgtflag = val
        dayKline(state, state.routeInfo.stockcode, val, 2)
      } else if (state.selection > 6) {
        state.monDataGraphForK.wgtflag = val
        dayKline(state, state.routeInfo.stockcode, val, 3)
      }
    }
    const goLast = () => {
      emit('hideKline')
    }
    onBeforeMount(() => {
      state.loading = true
      if (state.routeInfo.marketcode === "11") {
        state.grid = true
      }
      if (
        state.routeInfo.marketcode === "11" ||
        state.routeInfo.markettype === "7"
      ) {
        // 默认选择分钟线
        state.selection = 5
      }
      dayKline(
        state,
        state.routeInfo.stockcode,
        state.dayDataGraphForK.wgtflag,
        2
      )
    })
    onBeforeUnmount(() => {
      clearInterval(state.timer)
    })
    return {
      configForTime,
      configForK,
      ...toRefs(state),
      refresh,
      onChange,
      setPower,
      onPower,
      goLast
    }
  }
}
</script>

<style lang="scss" scoped>
.K-line {
  min-height: 500px;
  flex:1;
  .line-container {
    // padding-top: 20px;
    // margin-bottom: 30px;
    // border: 1px solid #ddd;
    // border-top: none;
    .minute-line{
      width:100%;
      height:100%;
    }
    box-sizing: border-box;
    // width: 861px;
    height: 510px;
    opacity: 1;
    background: rgba(0, 0, 0, 0);
    & > div {
      width: 100%;
      height: 100%;
    }
    .data-img {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 80px;
        margin: auto;
      }
    }
  }
}
</style>
