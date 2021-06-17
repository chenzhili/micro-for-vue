<template>
  <div class="change-account">
    <div class="main">
      <div class="account-msg">
        <div class="msg-left">
          <img src="@/assets/person/phone.png" alt="图片加载失败" />
          <span>手机</span>
        </div>
        <div class="msg-middle">{{bindStatus[0].bind?bindStatus[0].account:'暂未绑定'}}</div>
        <div>
          <div
            class="but"
            :class="bindStatus[0].bind?'plain':'red'"
            @click="changeVisible('changeBindVis',true)"
          >{{bindStatus[0].bind?'更换':'绑定'}}手机</div>
        </div>
      </div>
      <div class="account-msg">
        <div class="msg-left">
          <img src="@/assets/person/wechat.png" alt="图片加载失败" />
          <span>微信</span>
        </div>
        <div class="msg-middle">{{bindStatus[1].bind?bindStatus[1].account:'暂未绑定'}}</div>
        <div>
          <div
            class="but"
            v-if="bindStatus[1].bind"
            @click="changeVisible('unBindWechatVis',true)"
          >解绑</div>
          <div class="but red" v-else @click="thirdBind('wechat')">绑定微信</div>
        </div>
      </div>
      <div class="account-msg">
        <div class="msg-left">
          <img src="@/assets/person/qq.png" alt="图片加载失败" />
          <span>QQ</span>
        </div>
        <div class="msg-middle">{{bindStatus[2].bind?bindStatus[2].account:'暂未绑定'}}</div>
        <div>
          <div class="but plain" v-if="bindStatus[2].bind" @click="changeVisible('unBindQQVis',true)">解绑</div>
          <div class="but red" v-else @click="thirdBind('qq')">绑定QQ</div>
        </div>
      </div>
      <div class="account-msg">
        <div class="msg-left">
          <img src="@/assets/person/email.png" alt="图片加载失败" />
          <span>邮箱</span>
        </div>
        <div class="msg-middle">{{bindStatus[3].bind?bindStatus[3].account:'暂未绑定'}}</div>
        <div>
          <div
            class="but plain"
            v-if="bindStatus[3].bind"
            @click="changeVisible('unBindEmailVis',true)"
          >解绑</div>
          <div class="but red" v-else @click="changeVisible('bindEmailVis',true)">绑定邮箱</div>
        </div>
      </div>
    </div>
    <change-bind
      :userId="userId"
      :visible="modal.changeBindVis"
      @changeVisible="changeVisible('changeBindVis')"
    ></change-bind>
    <bind-email
      :userId="userId"
      :visible="modal.bindEmailVis"
      @changeVisible="changeVisible('bindEmailVis')"
    ></bind-email>
    <un-bind
      :channel="'wechat'"
      :visible="modal.unBindWechatVis"
      @changeVisible="changeVisible('unBindWechatVis')"
    ></un-bind>
    <un-bind
      :channel="'qq'"
      :visible="modal.unBindQQVis"
      @changeVisible="changeVisible('unBindQQVis')"
    ></un-bind>
    <un-bind
      :channel="'email'"
      :visible="modal.unBindEmailVis"
      @changeVisible="changeVisible('unBindEmailVis')"
    ></un-bind>
  </div>
</template>

<script>
import bindEmail from "../dialog/bindEmail"
import unBind from "../dialog/unBind"

import changeBind from "../dialog/changeBind"
import { reactive, onMounted, ref } from "vue"
import { useStore } from "vuex"
import { getUserId, getCertifyFlag } from "@/utils/auth"
import { accredit, openWin } from "@/views/Login/thirdMethods"

import { getChannelList } from "@/api/personal/dataSet/bind"
export default {
  components: {
    bindEmail,
    changeBind,
    unBind
  },
  setup (props) {
    const store = useStore()
    let userId = getUserId()
    const bindStatus = ref({
      0: {
        bind: false,
        account: ""
      },
      1: {
        bind: false,
        account: ""
      },
      2: {
        bind: false,
        account: ""
      },
      3: {
        bind: false,
        account: ""
      }
    })

    onMounted(() => {
      channelBind()
    })

    const channelBind = async () => {
      userId = getUserId()
      const res = await getChannelList(userId)
      const data = res.data
      const binded = data.map(item => item.channelType)
      const stuNumChannel = data.find(item => item.channelType === 9)
      for (const i in bindStatus.value) {
        if (binded.indexOf(Number(i)) !== -1) {
          const channel = data.find(item => item.channelType === Number(i))
          bindStatus.value[i] = {
            bind: true,
            account: channel.channelAccount
          }
        } else {
          bindStatus.value[i] = {
            bind: false,
            account: ""
          }
        }
      }
    }

    const thirdBind = channel => {
      const url = accredit(store, 1, channel)
      openWin(url, () => {
        channelBind()
      })
    }

    const modal = reactive({
      bindEmailVis: false,
      unBindQQVis: false,
      unBindWechatVis: false,
      unBindEmailVis: false,
      changeBindVis: false
    })

    const changeVisible = (type, bool) => {
      modal[type] = bool || false
      if (!modal[type]) {
        channelBind()
      }
    }

    return {
      modal,
      userId,
      bindStatus,

      changeVisible,
      thirdBind,
      channelBind
    }
  }
}
</script>

<style lang="scss" scoped>
// ::v-deep .el-button {
//   width: 120px;
//   height: 36px;
//   border: 1px solid #8d8d8d;
//   // color: #8d8d8d;
//   border-radius: 5px;
// }
.but {
  width: 120px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &.red {
    background: #e0585b;
    color: #fff;
  }
  &.plain {
    border: 1px solid #8d8d8d;
    color: #8d8d8d;
    background: #fff;
  }
  &:hover {
    &.red {
      background-color: #d9464a;
    }
    &.plain {
      border: 1px solid #505050;
      color: #505050;
    }
  }
}
.change-account {
  width: 878px;
  height: 302px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 9px;
  margin: 20px 0 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  .main {
    margin: 32px auto;
    .account-msg {
      display: flex;
      align-items: center;
      background: #fff;
      .msg-left {
        display: flex;
        align-items: center;
        margin-right: 32px;
        width: 95px;
        img {
          width: 42px;
          height: 42px;
          margin: 8px;
        }
        span {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #222222;
        }
      }
      .msg-middle {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #222222;
        width: 200px;
      }
    }
  }
}
</style>
