export const LOCK_DATA = [
  {
    component: 'input',
    itemAttrs: {
      label: '证券代码'
    },
    attrs: {
      key: 'a',
      value: ''
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '证券名称'
    },
    attrs: {
      key: 'b',
      value: '',
      disabled: true
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '可锁数量'
    },
    attrs: {
      key: 'c',
      value: '',
      disabled: true,
      controls: false
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '锁定数量'
    },
    attrs: {
      key: 'daa',
      value: 2,
      controls: false
    }
  }
]
export const UNLOCK_DATA = [
  {
    component: 'input',
    itemAttrs: {
      label: '证券代码'
    },
    attrs: {
      key: 'a',
      value: ''
    }
  },
  {
    component: 'input',
    itemAttrs: {
      label: '证券名称'
    },
    attrs: {
      key: 'b',
      value: '',
      disabled: true
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '可解数量'
    },
    attrs: {
      key: 'c',
      value: '',
      disabled: true,
      controls: false
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '解锁数量'
    },
    attrs: {
      key: 'daa',
      value: 2,
      controls: false
    }
  }
]

export const LOCK_BTNS = [
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
    text: '锁定',
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

export const UNLOCK_BTNS = [
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
    text: '解锁',
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
