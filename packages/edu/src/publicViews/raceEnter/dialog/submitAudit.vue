<template>
  <dialog-com
    title="提示"
    :visible="visible"
    :coop="{ show: true, confirmTxt: '确定', cancelTxt: '取消' }"
    :center="true"
    :width="318"
    @confrimMethod="coopMethod"
  >
    <div class="tip">
      是否确认参加提交审核?
    </div>
  </dialog-com>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const coopMethod = type => {
      if (type === "confirm") {
        emit('confirm')
      }
    }
    return {
      coopMethod
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
