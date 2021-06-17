<template>
  <div class="tabChange">
    <div class="tabs" v-if="tabList.length !== 0">
      <div
        class="tab"
        v-for="(item, index) in tabList"
        :key="index"
        :class="{
          active: tValue === item.value,
        }"
        @click="toggle(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <slot name="form"></slot>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  props: {
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props, { emit }) {
    const tValue = ref(props.tabList[0].value)

    const toggle = e => {
      tValue.value = e.value
      emit("tabClick", e)
    }
    return {
      tValue,
      toggle
    }
  }
}
</script>

<style lang="scss" scoped>
.tabChange {
  width: 297px;
  height: 595px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 11px;
  .tabs {
    display: flex;
    height: 63px;
    align-items: center;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #a8abae;
    .tab {
      padding: 0 16px;
      cursor: pointer;
      border-right: 1px solid #a8abae;
      &:last-child{
        border-right: none;
      }
      &.active {
        transition: 0.3s;
        color: #e0585b;
        font-weight: 700;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      }
      &:hover{
        color:#e0585b;
        font-weight: 700;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      }
    }
  }
}
</style>
