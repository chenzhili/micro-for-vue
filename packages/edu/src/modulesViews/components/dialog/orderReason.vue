<template>
  <dialog-com
    title="下单理由"
    :visible="visible"
    :coop="{ show: false, confirmTxt: '确定', cancelTxt: '取消' }"
    :center="true"
    :width="400"
  >
    <el-input type="textarea" v-model="reason" rows="5" readonly></el-input>
  </dialog-com>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    orderReason: {
      type: String
    }
  },
  setup (props, { emit }) {
    const coopMethod = type => {
      if (type === "confirm") {
        console.log("确认")
      }
    }
    return {
      coopMethod,
      reason: computed(() => props.orderReason || '未填写下单原因')
    }
  }
}
</script>

<style lang="scss" scoped>
.tip{
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #222222;
}
</style>
