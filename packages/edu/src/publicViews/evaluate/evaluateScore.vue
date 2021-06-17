<template>
  <div class="contain setting">
    <table-toolbar title>
      <template #tool>
        <el-input placeholder="请输入报告名称" v-model="input" clearable>
          <template #suffix>
            <i class="el-input__icon el-icon-search"></i>
          </template>
        </el-input>
      </template>
    </table-toolbar>
    <page-table ref="pageRef" :defaultData="listData">
      <template #="tableScope">
        <div class="template-list">
          <div class="template-item" v-for="(item,index) in tableScope.datas" :key="index">
            <b>{{item.reportname}}</b>
            <div>
              <span>{{item.createtime}}</span>
              <span>上传者：{{item.fundername}}</span>
              <but-com class="but" content="下载" type="normal" :width="60"></but-com>
            </div>
          </div>
        </div>
      </template>
    </page-table>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  setup () {
    const input = ref("")
    const res = {
      data: [
        {
          fundername: "超级管理员",
          createtime: "2020-08-18 16:10:24",
          reportid: "2c9f83fd73efda830174009d94e3032c",
          reportname: "证券投资分析报告模板1",
          url:
            "http://resources.qlzhy.com/1597738161336_证券投资分析报告模板1.doc"
        },
        {
          fundername: "超级管理员",
          createtime: "2020-08-18 16:10:08",
          reportid: "2c9f83fd73efda830174009d5653032b",
          reportname: "证券投资分析报告模版2",
          url:
            "http://resources.qlzhy.com/1597738145320_证券投资分析报告模版2.doc"
        }
      ],
      page: { start: 0, size: 10, responsenum: 2, responsetotal: 2 },
      message: "处理成功",
      succflag: 0
    }
    return {
      input,
      listData: res.data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.contain {
  @include contain()
}
.setting{
  padding-left: 50px;
}
.but{
  margin-right: 10px;
}
.template-list {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  .template-item {
    height: 118px;
    border-bottom: 1px dashed #707070;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: left;
    // align-items: center;
    &>div{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
