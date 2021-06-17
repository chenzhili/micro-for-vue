export const BUY_DATA = [
  {
    component: 'input',
    itemAttrs: {
      label: '股东账号'
    },
    attrs: {
      key: 'secacct',
      value: '',
      disabled: true
    }
  },
  {
    component: 'select',
    itemAttrs: {
      label: '证券代码'
    },
    attrs: {
      key: 'code',
      value: '',
      options: [],
      placeholder: '代码/名称/拼音'
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '证券名称'
    },
    attrs: {
      key: 'name',
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
      value: 0,
      step: 0.1,
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
      key: 'avalBal',
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
      step: 100,
      value: 0,
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
      key: 'cdc',
      value: '',
      placeholder: '请输入下单理由',
      style: {
        width: '264px',
        height: '65px'
      }
    }
  }
]
export const SELL_DATA = [
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
    component: 'select',
    itemAttrs: {
      label: '证券代码'
    },
    attrs: {
      key: 'code',
      value: '',
      options: [],
      placeholder: '代码/名称/拼音'
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
      label: '卖出价格'
    },
    attrs: {
      key: 'c',
      step: 0.1,
      value: 0,
      controls: true,
      placeholder: '请输入数字'
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '可卖数量'
    },
    attrs: {
      key: 'f',
      value: '',
      disabled: true
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '卖出数量'
    },
    attrs: {
      key: 'daa',
      step: 100,
      value: 0,
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
        height: '120px'
      }
    }
  }
]

export const BUY_BTNS = [
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
export const SELL_BTNS = [
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
    text: '卖出',
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
