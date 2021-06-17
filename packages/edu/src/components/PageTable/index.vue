<template>
  <div class="slide-table-wrapper clearfix">
    <slot :datas="mainData" :loading="loadState"></slot>
    <div class="pages" :style="{'margin-top':`${marginTop}px`}">
      <div class="pageNum">
        共
        <div class="pageN">{{ total }}</div>
        条记录, 每页{{ pageSize }}条, 共
        <div class="pageN">{{Math.ceil(total/pageSize)}}</div>
        页
      </div>
      <div class="pageClick">
        <el-pagination
          background
          :total="total"
          layout=" prev, pager, next"
          :page-size="pageSize"
          :current-page="currenPage"
          @current-change="onCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, reactive, nextTick, onMounted, watch } from "vue"

export default {
  name: "pageTable",
  props: {
    api: {
      type: Object,
      default: () => {
        return {
          getList () {
            return Promise.resolve([{}, {}, {}, {}])
          }
        }
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    defaultData: {
      type: Array,
      default: () => []
    },
    marginTop: {
      type: Number,
      default: 30
    }
  },
  setup (props, { emit }) {
    const { api, pageSize, defaultData } = toRefs(props)
    const mainData = ref([])
    const currenPage = ref(1)
    const total = ref(0)
    const param = reactive({
      data: {}
    })
    const loadState = ref(false)

    const setParam = p => {
      total.value = 0
      param.data = { ...p }
      currenPage.value = 1
      loadData()
    }

    const loadData = () => {
      const p = {
        ...param.data,
        // 其它参数
        current: currenPage.value,
        size: pageSize.value
      }
      loadState.value = true

      api.value
        .getList(p)
        .then(response => {
          console.log("load data", response)
          mainData.value = response.data.records
          total.value = response.data.total
          loadState.value = false
          /* 这里特别注意，初始化选中项，生命周期的问题，必须 加入 nextTick */
          nextTick(() => {
            emit("emitMainData", response.data.records, response.data.size)
            emit("passData", response.data.records)
          })
        })
        .catch(err => {
          console.log(err)
          loadState.value = false
        })
    }

    const setDefaultData = () => {
      if (
        defaultData.value.length > 0 &&
        process.env.NODE_ENV === "development"
      ) {
        // mainData.value = defaultData.value
        total.value = defaultData.value.length
        const start = (currenPage.value - 1) * pageSize.value
        mainData.value = defaultData.value.slice(start, start + pageSize.value)
      }
    }
    const onCurrentChange = page => {
      currenPage.value = page
      const start = (currenPage.value - 1) * pageSize.value
      loadData()
      emit("pageChange", true)
    }

    watch(defaultData, () => {
      setDefaultData()
    })

    onMounted(() => {
      props.defaultData.length && setDefaultData()
    })

    return {
      mainData,
      currenPage,
      total,
      loadState,
      onCurrentChange,
      setParam
    }
  }
}
</script>
<style lang="scss" scoped>
.pages {
  text-align: right;
  display: flex;
  align-items: center;
  .pageClick {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
  }
  .pageNum {
    width: 400px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: right;
    color: #222222;
    letter-spacing: 1px;
    .pageN{
      color: rgba(73,138,254,1.0);
      display: flex;
      align-items: center;
      letter-spacing: 0px;
    }
  }
}

:deep(.pages) {
  .btn-next,
  .btn-prev {
    width: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    color: #9a9a9a;
    border: 1px solid #dcdfe6;
  }
  .el-pagination.is-background .el-pager li {
    width: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    border: 1px solid #dcdfe6;
  }

  .el-pagination.is-background .el-pager .number {
    color: #9a9a9a;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    color: #ffffff;
    background-color: $primary-light-color;
    border: 1px solid $primary-light-color;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):not(.active):hover {
    color: $primary-light-color;
  }
}
</style>
