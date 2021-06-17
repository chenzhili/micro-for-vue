<template>
  <div class="container">
    <div class="header">
      <div class="tabs">
        <div class="tab" v-for="tab in tabs" :key="tab.value" :class="{active:activeValue === tab.value,hover:activeValue !== tab.value}" @click="toggle(tab)">
          {{ tab.label }}
        </div>
      </div>
    </div>
    <component :is="index"></component>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import OPTION from './optionBargain/index'
import STOCK from './stockBargain/index'
export default {
  components: {
    OPTION, STOCK
  },
  setup (props) {
    const tabs = [
      { label: "期权成交", value: 0 },
      { label: "证券成交", value: 1 }
    ]

    const activeValue = ref(0)

    const toggle = e => {
      activeValue.value = e.value
    }
    return {
      tabs,
      activeValue,
      toggle,
      index: computed(() => activeValue.value === 0 ? OPTION : STOCK)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1352px;
  background: #ffffff;
  border-radius: 8px;
  padding: 0 24px 24px;
  margin-top: 20px;
  margin-bottom: 40px;
  .header {
    height: 75px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    .tabs {
      display: flex;
      .tab {
        width: 88px;
        height: 36px;
        cursor: pointer;
        margin-right: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        color: #222222;
        &.active {
          transition: 0.3s;
          background: #e0585b;
          border-radius: 4px;
          color: #fff;
        }
        &.hover{
          &:hover{
            color: #e0585b;
          }
        }
      }
    }
  }
}
</style>
