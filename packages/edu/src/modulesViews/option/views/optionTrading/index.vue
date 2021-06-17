<template>
  <div class="container">
    <div class="left">
      <form-head :tabList="tabList">
        <template #form>
          <div class="form">
            <el-form label-width="80px" label-position="left" :model="forms">
              <el-form-item label="股东账号" class="form-item">
                <el-input disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="合约代码" class="form-item">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="合约名称" class="mar-g form-item">
                <el-input disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="买卖方向" class="mar-b form-item">
                <el-radio-group v-model="forms.type">
                  <el-radio :label="0">买入</el-radio>
                  <el-radio :label="1" :disabled="!!forms.checked"
                    >卖出</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item label="开平标志" class="mar-s form-item">
                <div class="radios">
                  <el-radio v-model="forms.sign" label="0">开仓</el-radio>
                  <el-radio v-model="forms.sign" label="1">平仓</el-radio>
                  <el-checkbox v-model="forms.checked">备兑</el-checkbox>
                </div>
              </el-form-item>
              <el-form-item label="报价方式" class="form-item">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="委托价格" class="form-item">
                <el-input-number style="width:192px"></el-input-number>
              </el-form-item>
              <el-form-item label="合约张数" class="form-item">
                <el-input disabled=""></el-input>
              </el-form-item>
              <el-form-item label="委托数量" class="form-item">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label-width="0" class="form-item">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入下单理由"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="0">
                <div class="btns">
                  <el-button type="primary" @click="submit">下单</el-button>
                  <el-button>重置</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </form-head>
    </div>
    <div class="middle"><five-range-panel></five-range-panel></div>
    <div class="right">
      <t-table></t-table>
    </div>
  </div>
</template>

<script>
import tTable from "../../components/tTable/index.vue"
import { reactive, watch } from "vue"
export default {
  components: {
    tTable
  },
  setup (props) {
    const tabList = [{ label: "期权交易", value: 0 }]

    const forms = reactive({
      type: 0,
      sign: "0",
      checked: false
    })

    const options = [
      { label: "限价", value: 0 },
      { label: "对手价", value: 1 },
      { label: "涨停价", value: 2 },
      { label: "跌停价", value: 3 }
    ]

    watch(
      () => forms.checked,
      (nv, ov) => {
        if (nv === true) {
          forms.type = 0
        }
      }
    )

    const submit = () => {
      console.log(typeof forms.type)
      console.log(typeof forms.sign)
    }
    return {
      tabList,
      forms,
      submit,
      options
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  :deep .el-textarea {
    width: 270px;
    height: 65px;
  }
  :deep .el-input-number__decrease {
    height: 34px !important;
    top: 3px !important;
  }
  :deep .el-input-number__increase {
    height: 34px !important;
    top: 3px !important;
  }
  :deep .el-input-number__increase:hover {
    border-left: 1px solid #e0585b;
  }
  :deep .el-input-number__decrease:hover {
    border-right: 1px solid #e0585b;
  }
  margin-top: 15px;
  display: flex;
  .left {
    .form {
      :deep .el-input {
        height: 36px !important;
      }
      :deep .el-input__inner {
        height: 36px;
      }
      padding: 0 16px;
      .form-item {
        height: 36px;
        margin-bottom: 16px;
      }
      .mar-g {
        margin-bottom: 5px;
      }
      .mar-b {
        height: 30px;
        margin-bottom: 10px;
      }
      .mar-s {
        height: 30px;
        margin-bottom: 10px;
      }
      .radios {
        display: flex;
        align-items: center;
        :deep .el-radio {
          margin-right: 15px;
        }
      }
      .btns {
        display: flex;
        margin-top: 6px;
        justify-content: space-around;
        :deep .el-button {
          height: 36px !important;
          min-height: 36px;
        }
      }
    }
  }

  .middle {
    margin-left: 19px;
    margin-right: 25px;
  }
  .right {
    padding: 16px;
    background-color: #fff;
    border-radius: 11px;
    border: 1px solid #ebebeb;
    flex: 1;
    max-width: 859px;
    overflow: hidden;
  }
}
</style>
