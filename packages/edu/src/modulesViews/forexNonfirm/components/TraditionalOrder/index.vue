<template>
  <div class="FCom">
    <div class="head">传统下单</div>
    <div class="form">
      <el-form ref="form" label-width="70px" label-position="left">
        <el-form-item label="合约代码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="合约名称">
          <el-input disabled="true"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <div class="tabs">
            <div
              class="tab"
              v-for="type in exchange"
              :key="type.value"
              :class="{ active: typeValue === type.value }"
              @click="typeChange(type)"
            >
              {{ type.label }}
            </div>
          </div>
        </el-form-item>
        <el-form-item label-width="0">
          <div class="tabs">
            <div
              class="tab"
              v-for="item in orderType"
              :key="item.value"
              :class="{ active: activeValue === item.value }"
              @click="toggle(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number
            v-model="num"
            style="width:194px"
            placeholder="请输入价格"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="持仓量">
          <el-input disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手数">
          <el-input-number
            v-model="num"
            style="width:194px"
            placeholder="请输入手数"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="可用资金">
          <el-input disabled="true"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入下单理由"
            v-model="textarea"
            style="width:264px"
            maxlength="150"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            type="primary"
            style="width: 120px;height: 36px;margin-right:15px"
            >下单</el-button
          >
          <el-button style="width: 120px;height: 36px">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  setup () {
    const exchange = [
      { label: "买入", value: 0 },
      { label: "卖出", value: 1 }
    ]
    const orderType = [
      { label: "开仓", value: 0 },
      { label: "平仓", value: 1 },
      { label: "平今", value: 2 }
    ]
    const activeValue = ref(0)
    const typeValue = ref(0)

    const toggle = e => {
      activeValue.value = e.value
    }

    const typeChange = e => {
      typeValue.value = e.value
    }
    return {
      exchange,
      orderType,
      typeValue,
      activeValue,
      toggle,
      typeChange
    }
  }
}
</script>

<style lang="scss" scoped>
.FCom {
  width: 297px;
  height: 714px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 11px;
  .head {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    color: #222222;
    padding: 24px 0 24px 18px;
  }
  .form {
    padding-left: 18px;
    .tabs {
      display: flex;
      .tab {
        width: 72px;
        height: 34px;
        opacity: 1;
        border: 1px solid #505050;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: center;
        color: #505050;
        margin-right: 20px;
        cursor: pointer;
        &.active {
          border: 1px solid #f33a52;
          color: #f33a52;
        }
      }
    }
    :deep .el-input {
      width: 194px;
    }
  }
}
</style>
