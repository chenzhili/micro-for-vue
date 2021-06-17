<template>
  <div class="container">
    <div class="EFT">
      <div class="head">证衍转账</div>
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="划转方向：" class="fr">
            <el-select v-model="formInline.a" placeholder="">
              <el-option label="证券->期权" value="0"></el-option>
              <el-option label="期权->证券" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转入金额：" class="fr">
            <el-input v-model="formInline.b" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="币种：" class="fr">
            <span>人民币</span>
          </el-form-item>
          <el-form-item>
            <el-button
              class="h-btn"
              type="primary"
              size="medium"
              @click="onSubmit"
              >转账</el-button
            >
            <el-button class="h-btn" @click="onSubmit" size="medium"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="充值账户：" class="fr">
            <el-select v-model="formInline.a" placeholder="">
              <el-option label="期权账户" value="0"></el-option>
              <el-option label="证券账户" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="充值金额：" class="fr">
            <el-input v-model="formInline.b" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="币种：" class="fr">
            <span>人民币</span>
          </el-form-item>
          <el-form-item>
            <el-button
              class="h-btn"
              type="primary"
              size="medium"
              @click="onSubmit"
              >充值</el-button
            >
          </el-form-item>
        </el-form>
        <el-form :inline="true">
          <el-form-item label="期权可用资金：" class="sum">
            <span class="money">3123123123</span>
          </el-form-item>
          <el-form-item label="证券可用资金：" class="sum">
            <span class="money">123123123123</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table">
      <table-toolbar title="记录查询">
        <template #tool>
          <div class="btn btn2">
            <div class="icon">
             <div>
              <img src="@/assets/toolsImg/export.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/export_ac.png" alt />
            </div>
          </div>导出
          </div>
          <div class="btn">
            <div class="icon">
            <div>
              <img src="@/assets/toolsImg/search.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/search_ac.png" alt />
            </div>
          </div>查询</div>
        </template>
      </table-toolbar>
      <page-table :api="ajaxApi" ref="pageRef" :defaultData="defaultData">
        <template #="tableScope">
          <table-com
            :tableData="tableScope.datas"
            :tableHeader="tableHeader"
            v-loading="tableScope.loading"
          >
          </table-com>
        </template>
      </page-table>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
export default {
  components: {},
  setup (props) {
    const formInline = reactive({
      a: "",
      b: ""
    })
    const pageRef = ref(null)
    const defaultData = [
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" },
      { a: "465456" }
    ]
    const ajaxApi = reactive({
      getList (param) {
        return ""
      }
    })

    const tableHeader = [
      { attrs: { prop: "a", label: "序号" } },
      { attrs: { prop: "a", label: "转账日期" } },
      { attrs: { prop: "a", label: "转账时间" } },
      { attrs: { prop: "a", label: "申请流水号" } },
      { attrs: { prop: "a", label: "业务类别" } },
      { attrs: { prop: "a", label: "发生金额" } }
    ]
    return {
      formInline,
      pageRef,
      defaultData,
      ajaxApi,
      tableHeader
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
  margin-bottom: 44px;
  .EFT {
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 11px;
    .head {
      height: 68px;
      border-bottom: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: center;
      color: #18191c;
      padding-left: 24px;
    }
    .form {
      padding: 24px 50px 0;
      .fr {
        margin-right: 24px;
      }
      .sum {
        width: 225px;
      }
      .money {
        color: #8d8d8d;
      }
      .h-btn {
        width: 120px;
        margin-left: 16px;
      }
    }
  }
  .table {
    width: 1350px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 9px;
    padding: 0 24px;
    margin-top: 20px;
    .btn {
      width: 55px;
      height: 20px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #222222;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon{
        position: relative;
        margin-right: 5px;
        &>div{
          height: 15px;
        }
        .ac-icon{
          position: absolute;
          opacity: 0;
          top: 0;
          background-color: #fff;
        }
      }
       &:hover {
          color: #e0585b;
          .icon {
            .ac-icon {
              opacity: 1;
            }
          }
        }
      img {
        width: 15px;
        height: 15px;
        margin-right: 4px;
      }
    }
    .btn2 {
      margin-right: 25px;
    }
  }
}
</style>
