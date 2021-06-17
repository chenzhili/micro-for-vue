<template>
  <dialog-com
    :title="`确认要解除与${channelName}的绑定吗？`"
    :visible="visible"
    :coop="{ show: true,confirmTxt:'确定',cancelTxt:'取消' }"
    :width="365"
    @confrimMethod="coopMethod"
  >
    <div v-if="channel==='email'">确认后，将不能使用邮箱接收通知消息</div>
    <div v-else>确认后，将不能使用{{channelName}}登录乾隆智慧云</div>
  </dialog-com>
</template>

<script>
import { getUserId } from "@/utils/auth"
import { removeThird, removeEmail } from "@/api/personal/dataSet/bind"
import { onMounted, ref } from "vue"
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    channel: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    onMounted(() => {
      init()
    })

    const channelName = ref("")
    let api
    let params = {}

    const init = () => {
      switch (props.channel) {
        case "qq":
          channelName.value = "QQ"
          api = removeThird
          params = {
            id: getUserId(),
            type: 2
          }
          break
        case "wechat":
          channelName.value = "微信"
          api = removeThird
          params = {
            id: getUserId(),
            type: 1
          }
          break
        case "email":
          channelName.value = "邮箱"
          api = removeEmail
          break
      }
    }

    const coopMethod = async type => {
      if (type === "confirm") {
        const res = await api(params)
        emit("changeVisible", false)
      } else {
        emit("changeVisible", false)
      }
    }
    return {
      channelName,
      coopMethod
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
