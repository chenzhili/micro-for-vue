<template>
  <el-form
    class="cus-el-form"
    :ref="name"
    :model="model"
    v-bind="setFormProp($attrs)"
  >
    <el-form-item
      v-for="(item, index) in formItemsResult"
      :key="index"
      v-bind="item.itemAttrs"
      :prop="item.attrs.key"
      class="form-item"
    >
      <component
        :is="item.component"
        v-bind="item.attrs"
        v-model="model[item.attrs.key]"
      ></component>
    </el-form-item>
    <el-form-item v-if="!!coopBtns.length">
      <!-- 可能 需要 component 内置组件 做 el-link 和 el-button 的区别，现在没必要 -->
    <!-- <div class="btns"> -->
      <el-button v-for="(btn, index) in coopBtns" :key="index" v-bind="btn.attrs" @click.prevent="coop(btn)">{{btn.text}}</el-button>
    <!-- </div> -->
    </el-form-item>
  </el-form>
</template>
<script>
import CCheckbox from './CCheckbox'
import CRadio from './CRadio'
import CSelect from './CSelect'
import { clone } from '@/utils'
import formBase from './formBase'
import { watch, ref, computed, getCurrentInstance } from 'vue'

export default {
  name: 'FormCom',
  components: {
    CCheckbox,
    CRadio,
    CSelect
  },
  setup (props, context) {
    const model = ref({})
    const instance = getCurrentInstance()

    /* 方法 */
    const computedFormItem = (formItem) => {
      const component = formItem.component || 'input' // 没有的时候初始使用
      const baseItem = formBase[component]
      formItem.component = baseItem.component
      // 提出 value 字段
      const { value, ...otherAttrs } = formItem.attrs
      formItem.attrs = Object.assign({}, baseItem.attrs, otherAttrs)
      return formItem
    }

    const coop = (btn) => {
      if (!btn.type) return
      switch (btn.type) {
        case 'custom':
          btn.method instanceof Function && btn.method()
          break
        case 'reset':
          instance.refs[props.name].resetFields()
      }
    }

    const _defaultValue = (component) => (formBase[component].attrs.defaultValue || '')
    /* 监听变化 */
    watch(props, (nv) => {
      nv.formItems.forEach(item => {
        item && (model.value[item.attrs.key] = item.attrs.value != null ? item.attrs.value : _defaultValue(item.component))
      })
    }, {
      immediate: true,
      deep: true
    })
    /* 计算属性 */
    const setFormProp = computed(() => attrs => (Object.assign({}, { inline: true }, attrs)))

    const formItemsResult = computed(() => (clone(props.formItems).map(item => computedFormItem(item))))

    return {
      model,
      setFormProp,
      formItemsResult,
      coop
    }
  },
  props: {
    /* 表单项 */
    formItems: {
      required: true,
      type: Array
    },
    /* 表单操作项 */
    coopBtns: {
      type: Array,
      default () {
        return []
      }
    },
    /* ref 的名称 */
    name: {
      type: String,
      default () {
        return 'formRef'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cus-el-form{
  :deep .el-input-number{
    width:100%;
  }
  :deep .el-input-number__increase:hover{
    border-left: 1px solid #e0585b;
  }
  :deep .el-input-number__decrease:hover{
    border-right: 1px solid #e0585b;
  }
  :deep .el-input-number__decrease {
    height: 34px !important;
    top: 3px !important;
  }
  :deep .el-input-number__increase {
    height: 34px !important;
    top: 3px !important;
  }
  :deep .el-textarea__inner{
    height: 100%;
  }
  .form-item{
    margin-bottom: 16px;
  }
  :deep .el-input{
    height: 36px !important;
  }
  :deep .el-input__inner{
    height: 36px !important;
    width: 192px;
  }
  :deep .el-input.is-disabled .el-input__inner{
    background-color: #f0f1f2;
    color:#8e8e8e;
    border: none;
  }
  .btns{
    display: flex;
    justify-content: space-between;
  }
}
</style>
