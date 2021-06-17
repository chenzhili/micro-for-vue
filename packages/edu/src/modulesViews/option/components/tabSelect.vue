<template>
  <div class="tabs">
    <div class="tab" v-for="item in clickList" :key="item.value" :class="{active:tabActive === item.label}" @click="toggle(item)">{{item.label}}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    clickList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props, { emit }) {
    const tabActive = ref(props.clickList[0].label)

    const toggle = e => {
      tabActive.value = e.label
      emit('routerGo', e.path)
    }

    return {
      tabActive,
      toggle
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  max-width: 1400px;
  display: flex;
  font-size: 16px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  margin-top: 30px;
  .tab {
    width: 102px;
    height: 38px;
    margin-right: 20px;
    opacity: 1;
    border: 1px solid #a8abae;
    border-radius: 5px;
    color: #222222;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.active{
      background: #e0585b;
      border: 1px solid #e0585b;
      color: #fff;
    }
  }
}
</style>
