<template>
  <div class="message">
    <div class="left margin">
      <user-info></user-info>
      <v-nav-bar
        class="margin"
        :activeIndex="vNavActiveIndex"
        :list="vList"
        @tabChange="
          e => {
            vNavActiveIndex = e.index;
          }
        "
      ></v-nav-bar>
    </div>
    <div class="right margin">
      <h-nav-bar
        :activeIndex="hNavActiveIndex"
        :list="hList"
        :needCount="true"
        @tabChange="
          e => {
            hNavActiveIndex = e.index;
          }
        "
      >
        <template #suffix>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ statusText }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in sList"
                  :key="index"
                  @click="status = item.value"
                >{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </h-nav-bar>
      <div class="message-num">
        <div class="all-num">
          共
          <span class="all-num-red">{{ totalCount }}</span>条
        </div>
        <div class="delete-text">
          <div @click="readAll">全部标为已读</div>
          <div @click="deleteMessage">
            <i class="el-icon-delete" style="margin-right:6px"></i>
            全部删除
          </div>
        </div>
      </div>
      <message-list ref="listDom" :list="dataList" :isLoading="isLoading" @updateList="resetList"></message-list>
    </div>
  </div>
</template>

<script>
import MessageList from "./MessageList"
import { ElMessage } from "element-plus"
import {
  readMsg,
  deleteMsg,
  getMessage,
  deleteAllMsg,
  getUnReadInfo,
  readAllMsg
} from "@/api/message"
import {
  ref,
  watch,
  computed,
  onMounted,
  onUnmounted
} from "vue"
import { getUserId } from "@/utils/auth"
import { parseTime } from "@/utils/index"
import ConfirmDialog from "@/plugins/dialog/ConfirmDialog"
import { useStore } from "vuex"

export default {
  components: { MessageList },
  setup (props) {
    const STATUS = {
      3: "全部",
      0: "未读",
      1: "已读"
    }
    const listDom = ref(null)
    const userId = getUserId()
    const store = useStore()

    const page = ref({
      size: 15,
      current: 1
    })

    const totalCount = ref(0)

    const vList = [{ label: "教师消息" }, { label: "系统消息" }]
    const hList = [
      { label: "全部" },
      { label: "子系统1" },
      { label: "子系统2" },
      { label: "子系统3" }
    ]
    const sList = [
      { label: "全部", value: 3 },
      { label: "未读", value: 0 },
      { label: "已读", value: 1 }
    ]

    const dataList = ref([])

    const isLoading = ref(false)
    const status = ref(3)
    const vNavActiveIndex = ref(1)
    const hNavActiveIndex = ref(0)

    let haveNextPage = true

    watch(
      [vNavActiveIndex, hNavActiveIndex, status],
      ([vIndex, hIndex, status], [prevVIndex, prevHIndex, prevStatus]) => {
        resetList()
      }
    )

    const deleteMessage = () => {
      if (dataList.value.length === 0) {
        return ElMessage({
          message: "当前列表没有消息",
          type: "error"
        })
      }
      ConfirmDialog({
        message: "确认删除全部消息？",
        showClose: false
      }).then(() => {
        deleteMessageRequest()
      })
    }
    const deleteMessageRequest = async () => {
      await deleteAllMsg({ userId, type: status.value })
      resetList()
      if (status.value !== 1) getListStatus()
    }

    const loadMore = () => {
      const clientHeight = document.documentElement.clientHeight
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      if (clientHeight + scrollTop >= scrollHeight) {
        ++page.value.current
        requestMessage()
      }
    }

    const readAll = async () => {
      if (!store.getters.unReadCount['0']) {
        return ElMessage({
          message: "当前没有未读消息",
          type: "error"
        })
      }
      const res = await readAllMsg({ channelId: 0 })
      getListStatus()
      resetList()
    }

    const resetList = () => {
      listDom.value.clearClick()
      page.value = {
        size: 10,
        current: 1
      }
      haveNextPage = true
      dataList.value = []
      requestMessage()
    }

    const getListStatus = async () => {
      store.dispatch('operation/setCount')
    }

    const requestMessage = async () => {
      if (!haveNextPage) return
      if (isLoading.value) return
      isLoading.value = true
      const params = {
        // type: ,
        status: status.value,
        userId,
        current: page.value.current,
        size: page.value.size
      }
      const res = await getMessage(params)
      const { current, total, records, size } = res.data
      if (total <= current * size) haveNextPage = false
      totalCount.value = total
      records.map(item => {
        item.createTime = parseTime(item.createTime)
      })
      dataList.value = dataList.value.concat(records)
      isLoading.value = false
    }

    onMounted(() => {
      requestMessage()
      getListStatus()
      window.addEventListener("scroll", loadMore)
    })
    onUnmounted(() => {
      window.removeEventListener("scroll", loadMore, false)
    })

    return {
      vList,
      hList,
      sList,
      vNavActiveIndex,
      hNavActiveIndex,
      isLoading,
      status,
      statusText: computed(() => STATUS[status.value]),
      deleteMessage,
      readAll,

      resetList,
      loadMore,

      listDom,
      dataList,
      totalCount
    }
  }
}
</script>

<style lang="scss" scoped>
$l_w: 300px;
$r_w: 880px;

.margin {
  margin-top: 20px;
}

.message {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  padding-bottom: 158px;
  .left {
    width: $l_w;
    margin-right: 20px;
  }

  .right {
    width: $r_w;

    .message-num {
      display: flex;
      justify-content: space-between;
      margin: 12px 2px;

      .all-num {
        font-size: 14px;
        font-weight: 400;
        color: $primary-text-color;
        &-red {
          color: $primary-light-color;
          margin: 0 4px;
        }
      }

      .delete-text {
        font-size: 14px;
        font-weight: 400;
        color: $gray-text-color;
        & > div {
          cursor: pointer;
          display: inline-block;
          &:first-child {
            margin-right: 24px;
          }
        }
      }
    }

    .el-dropdown-link {
      cursor: pointer;
      font-weight: 400;
      color: $primary-text-color;
    }
    .el-icon-arrow-down {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
