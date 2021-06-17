export default {
  /* 有需要的自定义组件可以自行添加 */
  input: {
    component: 'el-input',
    attrs: {
      placeholder: ''
    }
  },
  inputNumber: {
    component: 'el-input-number',
    attrs: {
      placeholder: ''
    }
  },
  select: {
    component: 'c-select',
    attrs: {
      placeholder: ''
    }
  },
  datePicker: {
    component: 'el-date-picker',
    attrs: {
      placeholder: ''
    }
  },
  timePicker: {
    component: 'el-time-picker',
    attrs: {
      placeholder: ''
    }
  },
  switch: {
    component: 'el-switch',
    attrs: {
      placeholder: ''
    }
  },
  checkbox: {
    component: 'el-checkbox',
    attrs: {
      placeholder: ''
    }
  },
  checkboxGroup: {
    component: 'c-checkbox',
    attrs: {
      placeholder: '',
      /* 组件 默认 值的 特殊性 */
      defaultValue: []
    }
  },
  radio: {
    component: 'c-radio',
    attrs: {
      placeholder: ''
    }
  }
}
