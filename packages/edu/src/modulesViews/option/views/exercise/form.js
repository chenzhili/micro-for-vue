export const TABLE_DATA = [
  {
    component: 'input',
    itemAttrs: {
      label: '合约代码'
    },
    attrs: {
      key: 'a',
      value: ''
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '合约名称'
    },
    attrs: {
      key: 'b',
      value: '',
      disabled: true
    }
  },
  {
    component: 'radio',
    itemAttrs: {
      label: '行权类型'
    },
    attrs: {
      key: 'd',
      value: '',
      options: [{
        value: 0,
        label: '行权'
      }
      ]
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '行权价格'
    },
    attrs: {
      key: 'daa',
      value: 2,
      controls: false,
      disabled: true
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '最大可行'
    },
    attrs: {
      key: 'daa',
      value: 2,
      controls: false,
      disabled: true
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '行权数量'
    },
    attrs: {
      key: 'daa',
      value: 2,
      controls: false
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
    text: '行权',
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
