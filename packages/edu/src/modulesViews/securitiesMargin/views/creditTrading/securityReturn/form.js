export const FORM_DATA = [
  {
    component: 'input',
    itemAttrs: {
      label: '股东账号'
    },
    attrs: {
      key: 'a',
      value: '',
      disabled: true
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '证券代码'
    },
    attrs: {
      key: 'b',
      value: ''
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '证券名称'
    },
    attrs: {
      key: 'c',
      value: '',
      disabled: true
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '买入价格'
    },
    attrs: {
      key: 'e',
      value: '',
      controls: true,
      placeholder: '请输入数字'
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '可用资金'
    },
    attrs: {
      key: 'f',
      value: '',
      disabled: true
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '可买数量'
    },
    attrs: {
      key: 'daa',
      value: '',
      disabled: true
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '买入数量'
    },
    attrs: {
      key: 'ccc',
      value: '',
      controls: true,
      placeholder: '请输入数字'
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: ''
    },
    attrs: {
      type: 'textarea',
      key: 'ccc',
      value: '',
      placeholder: '请输入下单理由',
      style: {
        width: '264px',
        height: '65px'
      }
    }
  }
]

export const COOP_BTNS = [
  {
    attrs: {
      // plain: true,
      type: 'primary',
      style: {
        width: '120px',
        height: '36px'
      }
    },
    // 自定义方法
    type: 'custom',
    text: '买入',
    method () {
      console.log('执行了 method')
    }
  },
  {
    attrs: {
      plain: true,
      // type: 'primary',
      style: {
        width: '120px',
        height: '36px'
      }
    },
    type: 'reset',
    text: '重置'
  }
]
