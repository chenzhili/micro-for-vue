<template>
  <div class="container">
    <div class="left">
      <div class="title">
        <div class="tabs">
          <div
            class="tab"
            v-for="item in tabList"
            :key="item.value"
            :class="{ active: tabValue === item.value }"
            @click="toggle(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="form-com">
        <div class="form-items">
          <div class="form-left">
            <el-form
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
              label-position="left"
            >
              <el-form-item label="交易品种" class="form-item">
                <el-select v-model="forms.saleCurrency">
                  <el-option
                    :label="type.label"
                    :value="type.value"
                    v-for="type in options"
                    :key="type.value"
                  >
                    <span style="float: left">{{ type.EN }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ type.label }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="委托汇率" prop="name" class="form-item">
                <el-input-number style="width:175px"></el-input-number>
              </el-form-item>
              <el-form-item label="委托类型" class="form-item">
                <el-select v-model="forms.saleCurrency">
                  <el-option label="市价成交" :value="0"></el-option>
                  <el-option label="挂单交易" :value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="委托手数" prop="name" class="form-item">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="委托终止时间" prop="name">
                <el-date-picker
                  v-model="value1"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div class="form-right">
            <el-form
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
              label-position="top"
            >
              <div class="r-item">策略委托</div>
              <el-form-item label="止盈价格" prop="name">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="止损价格" prop="name">
                <el-input></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="textarea">
        <el-input
          type="textarea"
          placeholder="下单理由"
          v-model="textarea"
          show-word-limit
          rows="7"
        >
        </el-input>
        <div class="btns">
          <el-button type="primary" style="margin-right:26px">下单</el-button>
          <el-button>重置</el-button>
        </div>
      </div>
    </div>
    <component
      :is="index"
      :routeInfo="routeInfo"
      @showKline="showKline"
      @hideKline="hideKline"
    ></component>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue"
import DTable from "./table"
export default {
  components: { DTable },
  setup (props) {
    const tabList = [
      { label: "买入", value: 0 },
      { label: "卖出", value: 1 }
    ]
    const tabValue = ref(0)

    const options = [
      { EN: "AUDCAD", label: "澳元加元", value: 0 },
      { EN: "AUDCHF", label: "澳元瑞郎", value: 1 },
      { EN: "AUDCNY", label: "澳元人民", value: 2 },
      { EN: "AUDEUR", label: "澳元欧元", value: 3 },
      { EN: "AUDGBP", label: "澳元英镑", value: 4 },
      { EN: "AUDHKD", label: "澳元港元", value: 5 },
      { EN: "AUDJPY", label: "澳元日元", value: 6 },
      { EN: "AUDUSD", label: "澳元美元", value: 7 },
      { EN: "CADAUD", label: "加元澳元", value: 8 },
      { EN: "CADCHF", label: "加元瑞郎", value: 9 }
    ]

    const forms = reactive({
      type: 0,
      saleCurrency: 0,
      buyCurrency: 0
    })

    const value1 = ref("")

    const toggle = e => {
      tabValue.value = e.value
    }
    const isRight = ref(true)
    const routeInfo = reactive({
      stockcode: "",
      marketid: "",
      name: ""
    })

    const showKline = data => {
      isRight.value = false
      routeInfo.stockcode = data.code
      routeInfo.marketcode = data.marketId
      routeInfo.name = data.name
    }

    const hideKline = () => {
      Object.keys(routeInfo).forEach(key => {
        routeInfo[key] = ""
      })
      isRight.value = true
    }

    return {
      tabList,
      tabValue,
      toggle,
      forms,
      value1,
      options,
      index: computed(() => (isRight.value ? "DTable" : "KLine")),
      showKline,
      routeInfo,
      hideKline
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 15px;
  display: flex;
  .left {
    width: 485px;
    height: 595px;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 11px;
    padding: 0 16px;
    .title {
      height: 62px;
      display: flex;
      align-items: center;
      .tabs {
        display: flex;
        .tab {
          cursor: pointer;
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          color: #8d8d8d;
          padding-right: 15px;
          margin-right: 15px;
          &:nth-child(1) {
            border-right: 1px solid #8d8d8d;
          }
          &.active {
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            color: #e0585b;
          }
          &:hover {
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            color: #e0585b;
          }
        }
      }
    }
    .form-com {
      .form-items {
        display: flex;
        .form-item {
          margin-bottom: 16px;
        }
        :deep .el-input {
          height: 36px;
        }
        :deep .el-input__inner {
          height: 36px;
        }
        :deep .el-input-number__decrease {
          height: 34px !important;
          top: 3px !important;
        }
        :deep .el-input-number__increase {
          height: 34px !important;
          top: 3px !important;
        }
        .form-left {
          border-right: 1px solid #ebebeb;
          padding-right: 15px;
          :deep .el-input {
            width: 175px;
          }
        }
        .form-right {
          padding-left: 15px;
          .r-item {
            height: 20px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: left;
            color: #18191c;
          }
          :deep .el-input {
            width: 175px;
          }
          :deep .el-form--label-top .el-form-item__label {
            padding-bottom: 0;
          }
          :deep .el-form-item {
            margin-bottom: 25;
          }
        }
      }
    }
    .textarea {
      margin-top: 24px;
      .btns {
        margin-top: 16px;
        display: flex;
        justify-content: center;
        :deep .el-button {
          height: 36px;
          min-height: 36px;
        }
      }
    }
    :deep .el-input {
      width: 192px;
    }
  }
}
</style>
