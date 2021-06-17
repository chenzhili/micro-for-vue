<template>
  <div class="message-list" v-loading="isLoading">
    <div class="none">
      <div class="target-box" ref="targetBox">
        <div class="target-space"></div>
        <div>{{changeable.title}}</div>
        <div v-html="changeable.content"></div>
      </div>
    </div>
    <div
      class="list-item"
      :class="{ 'is-open': isOpen(index), 'has-hover': isOpen(index) }"
      v-for="(item, index) in list"
      :key="index"
    >
      <div
        class="item-left"
        :style="{'height':heightList[index]||'72px'}"
        @click="itemClickHanle(item, index)"
      >
        <div class="item-avtar" :class="{'un-read':item.status===0}">
          <img src="@/assets/message_avtar.png" />
        </div>
        <div class="item-body">
          <div class="item-header">
            <div class="title">{{item.type===1?'系统消息':item.sender}}</div>
            <div class="time">{{item.createTime}}</div>
          </div>
          <div class="item-footer">
            <div class="item-introduce" v-if="!isOpen(index)">
              <!-- <div v-html="item.content"></div> -->
              <div>{{item.title}}</div>
            </div>
            <div class="item-content" v-if="isOpen(index)">
              <div>{{item.title}}</div>
              <div v-html="item.content"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="close-area" v-if="isOpen(index)">
        <i @click="delMsg(item,index)" class="el-icon-close close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue"
import { getUserId } from "@/utils/auth"
import ConfirmDialog from "@/plugins/dialog/ConfirmDialog"
import { readMsg, deleteMsg, getMessage, deleteAllMsg } from "@/api/message"
import { useStore } from "vuex"

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: () => false
    },
    list: {
      type: Array,
      require: true
    }
  },

  emits: ["updateList", "loadMore"],
  setup (props, { emit }) {
    const activeIndex = ref([])
    const userId = getUserId()
    const store = useStore()

    const targetBox = ref(null)

    const changeable = ref({
      title: "",
      content: ""
    })

    const heightList = ref({})

    const delMsg = async (item, index) => {
      console.log(item, index)
      await ConfirmDialog({
        message: "确认删除该消息？",
        maskClose: true
      })
      const res = await deleteMsg(item.id)
      emit("updateList")
    }

    const itemClickHanle = async (item, index) => {
      // 可能异步请求消息详情
      if (activeIndex.value.includes(index)) {
        const i = activeIndex.value.findIndex(child => child === index)
        activeIndex.value.splice(i, 1)
        heightList.value[index] = "72px"
      } else {
        changeable.value = {
          title: item.title,
          content: item.content
        }
        nextTick(() => {
          const changeableHeight = window.getComputedStyle(targetBox.value)
            .height
          heightList.value[index] = changeableHeight
          console.log(heightList.value)
        })
        if (item.status === 0) {
          const res = await readMsg(item.id)
          item.status = 1
          store.commit("operation/READ_MESSAGE", "0")
        }
        activeIndex.value.push(index)
      }
    }

    const clearClick = () => {
      activeIndex.value = []
      heightList.value = {}
    }

    const isOpen = index => {
      return activeIndex.value.includes(index)
    }

    return {
      activeIndex,
      itemClickHanle,
      isOpen,
      delMsg,
      clearClick,

      targetBox,
      changeable,
      heightList
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s;
}

.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  // transform: translateY(20px);
  height: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  // transform: translateY(20px);
  height: 100%;
}
.none{
  position: absolute;
  height: 0;
  overflow: hidden;
}
.target-box {
  width: 804px;
  .target-space {
    height: 29px;
  }
}

.message-list {
  width: 878px;
  background-color: #ffffff;
  border: 1px solid $divide-line-color;
  border-radius: 9px;
  min-height: 132px;
  overflow: hidden;

  .list-item {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid $divide-line-color;
    background-color: #ffffff;
    overflow: hidden;
    // height: 110px;
    // transition: height 0.2s;
    &.is-open {
      background-color: #fafafa;
      .item-left {
        height: unset;
      }
    }

    &.has-hover {
      .close-area {
        .close {
          font-size: 20px;
          color: #333333;
        }
      }
      &:hover .close-area > .close {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .close-area {
      width: 20px;
      margin-right: 24px;
      display: flex;
      align-items: center;
      .close {
        cursor: pointer;
        opacity: 0;
        transform: translateX(60px);
        transition: 0.3s;
      }
    }

    .item-left {
      transition: all 0.4s;
      height: 72px;
      display: flex;
      flex: 1;
      justify-content: flex-start;
      padding: 30px 0 30px 30px;
      cursor: pointer;
      .item-avtar {
        width: 48px;
        height: 48px;
        border-radius: 24px;
      }
      .un-read {
        position: relative;
        &::after {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e0585b;
          position: absolute;
          top: 0;
          right: 0;
          font-size: 20px;
        }
      }
      .item-body {
        overflow: hidden;
        flex: 1;
        margin-left: 19px;
        .item-header {
          display: flex;
          align-items: center;
          .title {
            font-size: 14px;
            font-weight: 400;
            color: $primary-text-color;
          }
          .time {
            font-size: 12px;
            font-weight: 400;
            color: $hint-text-color;
            margin-left: 24px;
          }
        }
        .item-footer {
          margin-top: 10px;
          .item-introduce {
            text-align: left;
          }
          .item-content {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
