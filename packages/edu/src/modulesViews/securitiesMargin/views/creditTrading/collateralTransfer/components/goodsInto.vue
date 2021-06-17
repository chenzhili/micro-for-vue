<template>
  <div class="main">
    <el-form label-position="left" label-width="90px" :model="form">
      <el-form-item label="资金转入" class="title"> </el-form-item>
      <el-form-item label="转入金额：">
        <el-input v-model="form.a" placeholder="请输入转入金额"></el-input>
      </el-form-item>
      <el-form-item label="证券转入" class="title"> </el-form-item>
      <el-row class="row">
        <el-col :span="6">
          <el-form-item label="证券代码：" class="code">
            <el-select v-model="form.b" placeholder="请选择证券代码">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="证券数量：">
            <el-input v-model="form.b" placeholder="请输入证券数量"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary">确定</el-button>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  setup (props) {
    const form = reactive({
      a: "",
      b: "",
      c: ""
    })
    const options = []
    return {
      form,
      options
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top: 22px;
  :deep .el-input {
    width: 160px;
  }
  :deep .el-form {
    background-color: #fff;
  }
  .title {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #18191c;
  }
  .row {
    display: flex;
  }
  .code {
    margin-right: 43px;
  }
}
</style>
