<template>
  <div class="line-tabs">
    <div class="line-time">
      <template v-if="minType !== 'false' || index !== 0">
        <div
          class="tabs-btn"
          @click="onChange(index)"
          :class="{ action: index === selection }"
          v-for="(item, index) in options"
          :key="index"
        >
          {{ item }}
        </div>
      </template>
      <div class="tabs-btn" v-if="havePower">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{power[currentIndex]}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item,index) in power" :key="index" @click="setPower(index)">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="market-code">
        <span v-if="name">{{ name }}</span>
        <span v-if="code">[{{ code }}]</span>
      </div>
    </div>
    <div class="operate">
      <div @click="refresh">刷新</div>
      <div @click="goLast">返回</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue"
export default {
  props: [
    "options",
    "havePower",
    "name",
    "code",
    "onPower",
    "minType",
    "selection"
  ],
  emits: ["mychange", "power", "refresh"],
  setup (props, { emit }) {
    const state = reactive({
      power: ["不复权", "前复权", "后复权"],
      currentIndex: 0,
      ...props
    })
    // 选择K线
    function onChange (index) {
      emit("mychange", index)
    }
    // 选择父权
    function setPower (index) {
      state.currentIndex = index
      emit("power", index)
    }
    function refresh () {
      emit("refresh")
    }
    const goLast = () => {
      emit("goLast")
    }
    return {
      ...toRefs(state),
      onChange,
      setPower,
      refresh,
      goLast
    }
  }
}
</script>

<style scoped lang="scss">
$transitonColor: #e0585b;
.line-tabs {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  position: relative;
  top: -1px;
  height: 64px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .line-time {
    display: flex;
    align-items: center;
    .tabs-btn {
      // background: #F8F8F8;
      // padding: 12px;
      // border-top: 1px solid #ddd;
      // border-right: 1px solid #ddd;
      margin-right: 15px;
      cursor: pointer;
      box-sizing: border-box;
      position: relative;
      &:nth-child(1) {
        margin-left: 24px;
      }
      &:nth-child(9) {
        margin-right: 10px;
      }
      .select-power {
        position: absolute;
        z-index: 2020;
        left: -1px;
        top: 36px;
        display: none;
        span {
          display: block;
          width: 58px;
          text-align: center;
          height: 28px;
          line-height: 28px;
          background: white;
          // border: 1px solid #ddd;
          border-bottom: none;
        }
        span:last-child {
          // border-bottom: 1px solid #ddd;
        }
      }
    }
    .tabs-btn:hover {
      color: $transitonColor;
      .select-power {
        color: #606266;
        display: block;
      }
    }
    .select-power {
      span:hover {
        color: $transitonColor;
      }
    }
    // .tabs-btn:nth-of-type(1) {
    //   border-left: 1px solid #ddd;
    // }
    .tabs-btn:last-child:hover {
      .select-power {
        display: block;
      }
    }
    .action {
      color: $transitonColor;
      position: relative;
      // border-bottom: 2px solid $transitonColor;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100%);
        height: 2px;
        background-color: $transitonColor;
      }
    }
    .market-code {
      margin-left: 12px;
      line-height: 45px;
      color: #8d8d8d;
    }
  }
  .operate {
    display: flex;
    // margin-left:28px
    div {
      // background: #F8F8F8;
      padding: 12px;
      &:first-child {
        margin-left: 40px;
      }
      // border-top: 1px solid #ddd;
      // border-right: 1px solid #ddd;
      cursor: pointer;
      box-sizing: border-box;
    }
    div:hover {
      color: $transitonColor;
    }
  }
}
</style>
