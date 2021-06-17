<template>
  <div class="container">
    <div class="EFT">
      <div class="head">{{ title }}</div>
      <div class="form">
        <el-form
          :inline="true"
          :model="formInline"
          :rules="rules"
          class="demo-form-inline"
          ref="forms"
        >
          <el-form-item label="划转方向：" class="fr" prop="name">
            <el-select v-model="formInline.name" placeholder="">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in direction"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转入金额：" class="fr" prop="age">
            <el-input v-model="formInline.age" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="币种：" class="fr">
            <span>{{ currency }}</span>
          </el-form-item>
          <el-form-item>
            <el-button
              class="h-btn"
              type="primary"
              size="medium"
              @click="onSubmit"
              >转账</el-button
            >
            <el-button class="h-btn" @click="reset" size="medium"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <table-com
          :tableData="assetInfo"
          :tableHeader="assetHeader"
          :border="true"
        ></table-com>
      </div>
    </div>
    <div class="table">
      <table-toolbar title="转账查询">
        <template #tool>
          <div class="btn btn2">
           <div class="icon">
              <div>
              <img src="@/assets/toolsImg/export.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/export_ac.png" alt />
            </div>
           </div>
            导出
          </div>
          <div class="btn">
         <div class="icon">
              <div>
              <img src="@/assets/toolsImg/search.png" alt />
            </div>
            <div class="ac-icon">
              <img src="@/assets/toolsImg/search_ac.png" alt />
            </div>
         </div>
            查询
          </div>
        </template>
      </table-toolbar>
      <page-table :api="ajaxApi" ref="pageRef" :defaultData="defaultData">
        <template #="tableScope">
          <table-com
            :tableData="tableScope.datas"
            :tableHeader="EFTHeader"
            v-loading="tableScope.loading"
          >
          </table-com>
        </template>
      </page-table>
    </div>
  </div>
</template>

<script>
import { ref, reactive, unref } from "vue"
export default {
  props: {
    title: {
      type: String,
      default: "银证转账"
    },
    currency: {
      type: String,
      default: "人民币"
    },
    direction: {
      type: Array,
      default: () => {
        return [
          { label: "银行->券商", value: 0 },
          { label: "券商->银行", value: 1 }
        ]
      }
    },
    assetHeader: {
      type: Array,
      default: () => {
        return [
          { attrs: { prop: "a", label: "序号" } },
          { attrs: { prop: "a", label: "币种" } },
          { attrs: { prop: "a", label: "银行资金余额" } },
          { attrs: { prop: "a", label: "总资产" } },
          { attrs: { prop: "a", label: "可用资金" } }
        ]
      }
    },
    assetInfo: {
      type: Array,
      default: () => {
        return [{}]
      }
    },
    ajaxApi: {
      type: Object,
      default: () => {
        return {}
      }
    },
    EFTHeader: {
      type: Array,
      default: () => {
        return [
          { attrs: { prop: "a", label: "序号" } },
          { attrs: { prop: "a", label: "转账日期" } },
          { attrs: { prop: "a", label: "转账时间" } },
          { attrs: { prop: "a", label: "申请流水号" } },
          { attrs: { prop: "a", label: "业务类别" } },
          { attrs: { prop: "a", label: "银行编号" } },
          { attrs: { prop: "a", label: "金额" } }
        ]
      }
    },
    EFTInfo: {
      type: Array,
      default: () => {
        return [{}]
      }
    }
  },
  setup (props) {
    const formInline = reactive({
      name: 0,
      age: ""
    })

    const rules = {
      name: [
        {
          required: true,
          message: "请选择划转方向",
          trigger: ["blur", "change"]
        }
      ],
      age: [
        {
          required: true,
          message: "请输入转入金额",
          trigger: ["blur", "change"]
        }
      ]
    }
    const forms = ref(null)
    const pageRef = ref(null)
    const defaultData = [{ a: "noData" }]

    const onSubmit = async () => {
      const f = unref(forms)
      if (!f) return
      try {
        await f.validate()
        console.log("转账")
      } catch (error) {
        console.log(error)
      }
    }

    const reset = async () => {
      forms.value.resetFields()
    }
    return {
      forms,
      formInline,
      pageRef,
      defaultData,
      reset,
      rules,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/common.scss";
.container {
  margin-top: 20px;
  margin-bottom: 40px;
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
      padding: 24px 50px;
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
    padding: 0 24px 42px;
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
      &:hover {
        color: #e0585b;
        .icon{
          .ac-icon{
            opacity: 1;
          }
        }
      }
      .icon {
          position: relative;
          margin-right: 5px;
          &>div{
            height: 15px;
          }
          .ac-icon {
            position: absolute;
            opacity: 0;
            top: 0;
            background-color: #ffffff;
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
