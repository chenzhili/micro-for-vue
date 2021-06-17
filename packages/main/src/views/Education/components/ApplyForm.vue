<template>
  <div class="apply-form contain">
    <div class="tabs">
      <span @click="curTab=1" :class="{'active-tab':curTab==1}">产学合作</span>
      <span @click="curTab=2" :class="{'active-tab':curTab==2}">渠道合作</span>
      <span @click="curTab=3" :class="{'active-tab':curTab==3}">产品试用</span>
    </div>
    <div class="apply-main">
      <div class="form">
        <template v-if="curTab==1">
          <el-form :model="proStudyData" :rules="PRO_STUDY_FORM.rules" ref="formDom">
            <el-form-item v-for="(item,i) in PRO_STUDY_FORM.forms" :key="i" :prop="item.prop">
              <el-input v-model="proStudyData[item.prop]" v-bind="item.attrs"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-if="curTab==2">
          <el-form :model="channelCoopData" :rules="CHANNEL_COOP_FORM.rules" ref="formDom">
            <el-form-item v-for="(item,i) in CHANNEL_COOP_FORM.forms" :key="i" :prop="item.prop">
              <el-input v-model="channelCoopData[item.prop]" v-bind="item.attrs"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-if="curTab==3">
          <el-form :model="tryApplyData" :rules="TRY_APPLY_FORM.rules" ref="formDom">
            <el-form-item v-for="(item,i) in TRY_APPLY_FORM.forms" :key="i" :prop="item.prop">
              <el-input v-model="tryApplyData[item.prop]" v-bind="item.attrs"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <span @click="__custom__coopPer(btns, getAlias(), [submit])" class="submit">提交</span>
      </div>
      <div class="qr-code">
        <img src="@/assets/education/qr_code.png" alt />
        <span>
          关注我们
          <br />获取更多行业动态
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { applySubmit } from "@/api/education.js"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import {
  PRO_STUDY_FORM,
  CHANNEL_COOP_FORM,
  TRY_APPLY_FORM
} from "./applyConfig"
import { ref, nextTick, watch, computed } from "vue"
import { buttonAuth } from "@/utils/buttonAuth"
import { ElMessage } from "element-plus"

export default {
  setup () {
    const store = useStore()
    const route = useRoute()

    const curRoute = computed(() => {
      return route.fullPath.split('/')[2]
    })
    watch(curRoute, () => {
      switch (curRoute.value) {
        case 'channelsCoop':
          curTab.value = 2
          break
        case 'tryApply':
          curTab.value = 3
          break
        default:
          curTab.value = 1
          break
      }
    })
    const proStudyData = ref({})
    const channelCoopData = ref({})
    const tryApplyData = ref({})
    const curTab = ref(1)
    const formDom = ref(null)

    const getAlias = () => {
      const a = {
        1: PRO_STUDY_FORM.alias,
        2: CHANNEL_COOP_FORM.alias,
        3: TRY_APPLY_FORM.alias
      }
      return a[curTab.value]
    }

    const submit = async () => {
      const validate = await formDom.value.validate()
      let data
      let applyForm
      switch (curTab.value) {
        case 1:
          data = proStudyData.value
          break
        case 2:
          data = channelCoopData.value
          break
        case 3:
          data = tryApplyData.value
          break
      }
      data.type = curTab.value
      const res = await applySubmit(data)
      ElMessage({
        message: "提交成功",
        type: "success"
      })
      data.type === 1
        ? (proStudyData.value = {})
        : data.type === 2
          ? (channelCoopData.value = {})
          : (tryApplyData.value = {})
    }

    return {
      curTab,
      formDom,
      getAlias,
      submit,
      PRO_STUDY_FORM,
      CHANNEL_COOP_FORM,
      TRY_APPLY_FORM,

      proStudyData,
      channelCoopData,
      tryApplyData,

      ...buttonAuth()
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-form {
  padding-top: 40px;
  .tabs {
    border-bottom: 1px solid #d8d8d8;
    font-size: 18px;
    color: #333333;
    line-height: 36px;
    span {
      margin-right: 48px;
      display: inline-block;
      cursor: pointer;
    }
    .active-tab {
      color: #4361ee;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 59px;
        height: 3px;
        background-color: #4361ee;
      }
    }
  }
  .apply-main {
    padding: 49px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .form {
      width: 388px;
      padding-left: 100px;
      flex: none;
      .submit {
        display: block;
        border-radius: 4px;
        color: #ffffff;
        width: 85px;
        height: 40px;
        line-height: 40px;
        background-color: #4361ee;
        text-align: center;
        margin-left: auto;
        cursor: pointer;
      }
    }
    .qr-code {
      width: 525px;
      height: 450px;
      border-left: 1px solid #c5c5c5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        color: #999999;
        line-height: 25px;
        text-align: center;
        margin-top: 19px;
      }
    }
  }
}

.el-form-item {
  margin-bottom: 32px;
}
</style>
