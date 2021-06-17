<template>
  <div class="race-contain">
    <div class="race">
      <div class="race-name">乾隆期权测试</div>
      <div class="choose-race">
        <el-select v-model="value" placeholder="其他比赛" filterable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div
      class="nav"
      :style="{
        height: childList && childList.length !== 0 ? '125px' : '62px'
      }"
    >
      <div
        class="nav-row"
        :style="{
          'border-bottom':
            childList && childList.length !== 0 ? ' 1px dashed #ebebeb' : 'none'
        }"
      >
        <div
          class="nav-item"
          v-for="(item, index) in navItems"
          :key="index"
          :class="{ active: activeLabel === item.name }"
          @click="toggle(item)"
        >
          <el-dropdown
            v-if="item.menus && item.menus.length !== 0"
            placement="bottom"
          >
            <span class="el-dropdown-link">
              {{ item.name }}
              <i class="arrow-down"></i>
            </span>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(menu, i) in item.menus"
                  :key="i"
                  @click="menuChange(menu)"
                  >{{ menu.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span v-else>{{ item.name }}</span>
        </div>
      </div>
      <div class="tab-row" v-if="childList && childList.length !== 0">
        <div
          class="tab-item"
          v-for="child in childList"
          :key="child.label"
          :class="{ active: activeTab === child.value }"
          @click="tabChange(child)"
        >
          {{ child.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
export default {
  props: {
    navItems: {
      type: Array,
      default: () => {
        return [
          { name: "委托下单", path: "" },
          { name: "我的自选", path: "" },
          { name: "我的持仓", path: "" },
          { name: "龙虎榜", path: "" },
          { name: "我的战绩", path: "" },
          { name: "考评得分", path: "" }
        ]
      }
    },
    childList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props, { emit }) {
    const router = useRouter()
    const activeLabel = ref("委托下单")
    const activeTab = ref(0)
    const options = []
    const value = ref("")
    const toggle = e => {
      activeLabel.value = e.name
      emit("navChange", e)
    }
    const tabChange = e => {
      activeTab.value = e.value
      emit("goRouter", e.path)
    }
    const menuChange = e => {
      emit("menuChange", e)
    }
    return {
      activeLabel,
      options,
      value,
      toggle,
      tabChange,
      activeTab,
      menuChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/interaction.scss";
.race-contain {
  padding-top: 23px;
  text-align: center;
}
.race {
  position: relative;
  .race-name {
    color: #222222;
    font-size: 20px;
    font-weight: bold;
    // text-align: center;
    margin-bottom: 23px;
  }
  .choose-race {
    position: absolute;
    right: 0;
    top: 0;
  }
}

.nav {
  width: 1350px;
  height: 125px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 9px;
  padding: 0 24px;
  .nav-row {
    display: flex;
    height: 62px;
    border-bottom: 1px dashed #ebebeb;
    .nav-item {
      width: 64px;
      margin-right: 56px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      // 特殊的 tabs 交互
      // @include tabs-interaction('true');
      // 一般的
      @include tabs-interaction("true");
    }
  }
  .tab-row {
    display: flex;
    align-items: center;
    height: 62px;
    .tab-item {
      height: 19px;
      opacity: 1;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #222222;
      margin-right: 56px;
      cursor: pointer;
      &.active {
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 9px;
        opacity: 1;
        background: #e0585b;
        border-radius: 4px;
        color: #fff;
      }
    }
  }
}
.com-contain {
  padding: 24px;
}
::v-deep {
  .el-dropdown {
    color: rgba(34, 34, 34, 1);
    font-size: 16px;
    @include sub-select-icon();
  }
  .el-dropdown-menu__item {
    width: 320px;
    height: 40px;
    padding: 0 16px;
  }
  .el-input {
    width: 192px;
    height: 40px;
    border-radius: 5px;
  }
  .el-select {
    @include select-icon();
  }
  .el-popper__arrow::before {
    content: none;
  }
}
</style>
