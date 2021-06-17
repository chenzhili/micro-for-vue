<template>
  <div class="container">
    <div class="left">
      <div class="title">下单</div>
      <div class="form-com">
        <div class="form-item">
          <el-radio-group v-model="forms.type">
            <el-radio :label="0">即时</el-radio>
            <el-radio :label="1">获利</el-radio>
            <el-radio :label="2">止损</el-radio>
            <el-radio :label="3">双向</el-radio>
          </el-radio-group>
        </div>
        <div class="form-items">
          <div class="form-left">
            <el-form
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
              label-position="left"
            >
              <el-form-item label="卖出币种" class="item">
                <el-select v-model="forms.saleCurrency">
                  <el-option label="美元" :value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="买入币种" class="item">
                <el-select v-model="forms.buyCurrency">
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="item in currency"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最多可卖" prop="name" class="item">
                <el-input disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="最少可卖" prop="name" class="item">
                <el-input disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="卖出金额" prop="name" class="item">
                <el-input></el-input>
              </el-form-item>
              <div class="price-items">
                <div class="price-item">
                  最新买价：
                  <div class="price-num">123456</div>
                </div>
                <div class="price-item">
                  最新卖价：
                  <div class="price-num">123456</div>
                </div>
                <div class="price-item">
                  点差：
                  <div class="price-num">12</div>
                </div>
              </div>
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
              <el-form-item label="委托终止时间" prop="name" class="item">
                <el-date-picker
                  v-model="value1"
                  type="datetime"
                  placeholder="选择日期时间"
                  :disabled="dateDisabled"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="获利价格" prop="name" class="item">
                <el-input :disabled="pDisabled"></el-input>
              </el-form-item>
              <el-form-item label="止损价格" prop="name" class="item">
                <el-input :disabled="lDisabled"></el-input>
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
          maxlength="150"
          show-word-limit
          rows="3"
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

    const forms = reactive({
      type: 0,
      saleCurrency: 0,
      buyCurrency: 0
    })

    const currency = [
      { label: "澳元", value: 0 },
      { label: "加元", value: 1 },
      { label: "瑞郎", value: 2 },
      { label: "人民币", value: 3 },
      { label: "欧元", value: 4 },
      { label: "英镑", value: 5 },
      { label: "港元", value: 6 },
      { label: "日元", value: 7 }
    ]
    const value1 = ref("")

    return {
      forms,
      currency,
      value1,
      dateDisabled: computed(() => forms.type === 0),
      pDisabled: computed(() => !!(forms.type === 0 || forms.type === 2)),
      lDisabled: computed(() => !!(forms.type === 0 || forms.type === 1)),
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
      height: 53px;
      border-bottom: 1px solid #ebebeb;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: center;
      color: #222222;
      display: flex;
      align-items: center;
    }
    .form-com {
      :deep .el-input{
        height: 36px;
      }
      :deep .el-input__inner{
        height: 36px;
      }
      .form-item {
        height: 65px;
        display: flex;
        align-items: center;
      }
      .form-items {
        display: flex;
        .form-left {
          .item{
            margin-bottom: 16px;
          }
          border-right: 1px solid #ebebeb;
          padding-right: 15px;
          .price-items {
            display: flex;
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #18191c;
            .price-item {
              margin-right: 5px;
              display: flex;
            }
          }
        }
        .form-right {
          .item{
            margin-bottom: 16px;
          }
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
            width: 185px;
          }
          :deep .el-form--label-top .el-form-item__label {
            padding-bottom: 0;
          }
          :deep .el-form-item {
            margin-bottom: 10;
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
        :deep .el-button{
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
