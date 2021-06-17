<template>
  <div class="info">
    <div class="head">
      <div class="img">
        <el-upload
          class="avatar-uploader"
          action="/usercenter/profile/uploadPortrait"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="myToken"
        >
          <div class="avatar_div">
            <div class="avatar_hover">
              <span>更换头像</span>
            </div>
            <img v-if="ruleForm.portrait" :src="ruleForm.portrait" class="avatar" />
            <img v-else src="@/assets/person/touxiang.png" alt="更换头像" class="avatar" />
          </div>
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
        <!-- <img @click="change" src="@/assets/person/touxiang.png" alt="更换头像" /> -->
      </div>
    </div>
    <div class="body">
      <div class="body-title">基本信息</div>
      <div class="body-form">
        <el-form
          :model="ruleForm"
          ref="formDom"
          label-width="77px"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="ruleForm.nickname"
              placeholder="请输入昵称"
              @input="ruleForm.nickname = ruleForm.nickname.replace(/\s+/g,'')"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="username" v-if="ruleForm.username">
            <div>{{ ruleForm.username }}</div>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <div class="footer-title">
        <div class="title-left">学习经历</div>
        <div class="title-right" @click="add">
          添加
          <span></span>
          <!-- <img src="@/assets/person/tianjia.png" /> -->
        </div>
      </div>
      <div class="footer-form">
        <div class="row-1 row">
          <div class="headline">我的学校</div>
          <span>
            <el-select v-model="notEditForm.school" filterable placeholder="请选择">
              <el-option
                v-for="opts in options"
                :key="opts.value"
                :label="opts.label"
                :value="opts.value"
              ></el-option>
            </el-select>
          </span>
        </div>
        <div class="row-2 row">
          <div class="headline">我的系所</div>
          <span>
            <el-select v-model="notEditForm.faculty1" filterable placeholder="请选择">
              <el-option
                v-for="opts in options"
                :key="opts.value"
                :label="opts.label"
                :value="opts.value"
              ></el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="notEditForm.faculty2" filterable placeholder="请选择">
              <el-option
                v-for="opts in options"
                :key="opts.value"
                :label="opts.label"
                :value="opts.value"
              ></el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="notEditForm.faculty3" filterable placeholder="请选择">
              <el-option
                v-for="opts in options"
                :key="opts.value"
                :label="opts.label"
                :value="opts.value"
              ></el-option>
            </el-select>
          </span>
        </div>
      </div>
      <div class="footer-form" v-for="(item,index) in resume" :key="index">
        <div class="row-1 row">
          <div class="headline">我的学校</div>
          <span>
            <el-select v-model="item.school" filterable placeholder="请选择">
              <el-option
                v-for="opts in options"
                :key="opts.value"
                :label="opts.label"
                :value="opts.value"
              ></el-option>
            </el-select>
          </span>
        </div>
        <div class="row-2 row">
          <div class="headline">我的系所</div>
          <span>
            <el-select v-model="item.faculty1" filterable placeholder="请选择">
              <el-option
                v-for="opts in options"
                :key="opts.value"
                :label="opts.label"
                :value="opts.value"
              ></el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="item.faculty2" filterable placeholder="请选择">
              <el-option
                v-for="opts in options"
                :key="opts.value"
                :label="opts.label"
                :value="opts.value"
              ></el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="item.faculty3" filterable placeholder="请选择">
              <el-option
                v-for="opts in options"
                :key="opts.value"
                :label="opts.label"
                :value="opts.value"
              ></el-option>
            </el-select>
          </span>
        </div>
        <div class="row-3 row">
          <div class="headline">我的学号</div>
          <span>
            <el-input v-model="item.stuNum"></el-input>
          </span>
          <div v-if="resume.length>1" @click="()=>{resume.splice(index, 1)}" class="delete">
            删除
            <span></span>
            <!-- <img src="@/assets/person/delete.png" /> -->
          </div>
        </div>
      </div>
      <div class="footer-button">
        <el-button @click="editInfo" type="primary">保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue"
import { baseInfo, baseInfoEdit } from "@/api/personal/dataSet/basicInfo"
import { getUserId, getToken, setBasicInfo } from "@/utils/auth"
import { ElMessage } from "element-plus"
import { useStore } from "vuex"

export default {
  setup (props) {
    onMounted(() => {
      getBaseInfo()
    })

    const store = useStore()

    const notEditForm = ref({
      school: "",
      faculty1: "",
      faculty2: "",
      faculty3: ""
    })

    const resumeItem = {
      school: "",
      faculty1: "",
      faculty2: "",
      faculty3: "",
      stuNum: ""
    }

    const formDom = ref(null)

    const rules = {
      nickname: [
        { required: true, message: "昵称不能为空", trigger: "blur" },
        { max: 20, min: 4, message: "昵称限制4-20字符" }
      ],
      username: [
        { required: true, message: "用户名不能为空", trigger: "blur" }
      ],
      sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
    }

    const myToken = { Authorization: "Bearer " + getToken() }

    const resume = ref([{}])

    const handleAvatarSuccess = (res, file) => {
      ruleForm.value.portrait = res.data
    }
    const beforeAvatarUpload = file => {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png"
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        ElMessage({
          message: "上传头像图片只能是 JPG/JPEG/PNG 格式!",
          type: "error"
        })
      }
      if (!isLt2M) {
        ElMessage({
          message: "上传头像图片大小不能超过 2MB!",
          type: "error"
        })
      }
      return isJPG && isLt2M
    }

    const getBaseInfo = async () => {
      const res = await baseInfo(userId)
      ruleForm.value = { ...res.data }
    }
    const userId = getUserId()
    const ruleForm = ref({})
    const radioChange = e => {
      ruleForm.value.sex = e
    }

    const editInfo = async () => {
      const validate = await formDom.value.validate()
      const params = {
        ...ruleForm.value
      }
      const res = await baseInfoEdit(params)
      ElMessage({
        message: "修改成功",
        type: "success"
      })

      const basicInfo = {
        portrait: ruleForm.value.portrait,
        nickname: ruleForm.value.nickname
      }
      setBasicInfo(basicInfo)
      getBaseInfo()
    }

    const options = [
      {
        value: "选项1",
        label: "黄金糕"
      },
      {
        value: "选项2",
        label: "双皮奶"
      },
      {
        value: "选项3",
        label: "蚵仔煎"
      },
      {
        value: "选项4",
        label: "龙须面"
      },
      {
        value: "选项5",
        label: "北京烤鸭"
      },
      {
        value: "选项6",
        label: "河北"
      }
    ]

    const selectInput = (val) => {
      // if (val) { // val存在
      //   options = optionsCopy.filter((item) => {
      //     if (!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase())) {
      //       return true
      //     }
      //   })
      // } else { // val为空时，还原数组
      //   options = optionsCopy
      // }
    }
    const value = ref("")
    const add = () => {
      resume.value.push({})
    }
    return {
      ruleForm,
      notEditForm,
      radioChange,
      options,
      value,
      add,
      editInfo,
      resume,
      myToken,
      rules,

      formDom,

      handleAvatarSuccess,
      beforeAvatarUpload,
      selectInput
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin f-size {
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: right;
  color: #8d8d8d;
}
.is-required {
  position: relative;
  &::before {
    content: "*";
    position: absolute;
    width: 6px;
    height: 19px;
    color: #e0585b;
    left: 24px;
    top: 10px;
  }
}

::v-deep {
  .el-form-item__label {
    @include f-size;
  }
  .el-input {
    width: 192px;
    height: 42px;
    opacity: 1;
    background: #f4f4f4;
    border-radius: 4px;
  }
  .el-input {
    width: 322px;
    height: 40px;
    background: #f4f4f4;
    border-radius: 5px;
  }
  .el-input__inner {
    background: #f4f4f4;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #222222;
    &:focus{
      background-color: #ffffff;
    }
  }
  .el-scrollbar{
    width: 1;
    .el-select-dropdown__item{
      background-color: #faf5f5;
    }
  }

  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar_div {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    &:hover {
      .avatar_hover {
        opacity: 1;
        transition: all 0.2s;
      }
    }
    .avatar_hover {
      transition: all 0.2s;
      opacity: 0;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      line-height: 120px;
      span {
        border-bottom: 1px solid #ffffff;
      }
    }
  }
  .avatar {
    width: 100%;
    height: 100%;
  }
}

.info {
  width: 878px;
  opacity: 1;
  background: #ffffff;
  border-radius: 9px;
  margin: 20px 0 48px;
  border: 1px solid #ebebeb;
  .head {
    width: 100%;
    padding: 48px 0 72px;
    display: flex;
    justify-content: center;
  }
  .body {
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 48px;
    .body-title {
      margin-left: 30px;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #222222;
    }
    .body-form {
      margin-top: 20px;
      margin-left: 30px;
    }
  }
  .footer {
    .footer-title {
      display: flex;
      margin-top: 24px;
      margin-left: 30px;
      .title-left {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        color: #222222;
      }
      .title-right {
        flex: 1;
        display: flex;
        flex-direction: row-reverse;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: right;
        // color: #e0585b;
        color: #8d8d8d;
        align-items: center;
        margin-right: 40px;
        cursor: pointer;
        &:hover{
          color: #e0585b;
          span{
            background: url('@/assets/person/tianjia_active.png');
          }
        }
        span {
          width: 18px;
          height: 18px;
          margin-right: 6px;
          background: url('@/assets/person/tianjia.png');
        }
      }
    }
    .footer-form {
      border-bottom: 2px dashed #ebebeb;
      margin: 30px 40px 19px 30px;
      padding-top: 20px;
      .row {
        margin-bottom: 30px;
        display: flex;
        align-items: center;
      }
      .row-2 {
        span {
          margin-right: 20px;
        }
        &::v-deep(.el-input) {
          width: 192px;
        }
        &::v-deep(.el-input__inner) {
          height: 42px;
        }
      }
      .row-3 {
        .delete {
          display: flex;
          flex: 1;
          flex-direction: row-reverse;
          align-items: center;
          cursor: pointer;
          @include f-size;
          &:hover{
            color: #e0585b;
            span{
              background: url('@/assets/person/delete_active.png');
            }
          }
          span {
            width: 19px;
            height: 18px;
            margin-right: 6px;
            background: url('@/assets/person/delete.png');
          }
        }
      }
      .headline {
        @include f-size;
        margin-right: 24px;
        width: 60px;
        text-align: left;
      }
    }
    .footer-form:nth-last-child(1) {
      border-bottom: none !important;
    }
    .footer-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 20px;
      &::v-deep(.el-button--primary) {
        width: 240px;
        height: 42px;
        border-radius: 4px;
      }
    }
  }
}
</style>
