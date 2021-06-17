export const FORM_DATA = [
  {
    component: 'input',
    itemAttrs: {
      label: '股东账号'
    },
    attrs: {
      key: 'a',
      value: 'QQ',
      disabled: true
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '合约代码'
    },
    attrs: {
      key: 'b',
      value: ''
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '合约名称',
      disabled: true
    },
    attrs: {
      key: 'c',
      value: ''
    }
  },
  {
    component: 'radio',
    itemAttrs: {
      label: '开平标志',
      disabled: true
    },
    attrs: {
      key: 'd',
      value: '',
      options: [{
        value: 0,
        label: '开仓'
      }, {
        value: 1,
        label: '平仓'
      }
      ]
    }
  },
  {
    component: 'select',
    itemAttrs: {
      label: '报价方式'
    },
    attrs: {
      key: 'thrid',
      value: '',
      options: [{
        value: 0,
        label: '限价'
      }, {
        value: 1,
        label: '对手价'
      }, {
        value: 2,
        label: '涨停价'
      }, {
        value: 3,
        label: '跌停价'
      }
      ]
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '委托价格'
    },
    attrs: {
      key: 'e',
      value: 2,
      controls: false
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '合约张数'
    },
    attrs: {
      key: 'f',
      value: 2,
      controls: false,
      disabled: true
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '委托数量'
    },
    attrs: {
      key: 'daa',
      value: 2,
      controls: false
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
      style: {
        width: '265px',
        height: '38px'
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
    text: '下单',
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
