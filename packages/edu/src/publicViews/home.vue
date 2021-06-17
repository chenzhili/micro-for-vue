<template>
  <div>
    <table-com :tableData="tableData" :tableHeader="tableHeader" :border="true"></table-com>
    <div class="form-container">
      <form-com :formItems="formItems" :coopBtns="coopBtns"></form-com>
    </div>
  </div>
</template>

<script>
import FormCom from '@/components/FormCom/index'
export default {

  components: {
    FormCom
  },
  setup () {
    const tableHeader = [
      { attrs: { prop: '', label: '', type: 'selection', width: '50', align: 'center' } },
      { attrs: { prop: 'number', label: '采购包编号' } },
      { attrs: { prop: 'name', label: '采购包名称' } },
      { attrs: { prop: 'desc', label: '采购包概述' } },
      { attrs: { prop: 'user', label: '发起人' } },
      { attrs: { prop: 'createTime', label: '生成时间' } },
      { attrs: { prop: 'modifyTime', label: '变更时间' } },
      { attrs: { prop: 'status', label: '采购包状态' } }
    ]
    /* formCom 的 参数 */
    const formItems = [
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
          label: '证券名称',
          disabled: true
        },
        attrs: {
          key: 'c',
          value: ''
        }
      },
      {
        component: 'inputNumber',
        itemAttrs: {
          label: '买入价格'
        },
        attrs: {
          key: 'd',
          value: 2,
          controls: false
        }
      },
      {
        component: 'inputNumber',
        itemAttrs: {
          label: '可用资金'
        },
        attrs: {
          key: 'e',
          value: 2,
          controls: false,
          disabled: true
        }
      },
      {
        component: 'inputNumber',
        itemAttrs: {
          label: '可卖数量'
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
          label: '买入数量'
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
            width: '266px',
            height: '124px'
          }
        }
      }
    ]

    const coopBtns = [
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
    return {
      tableHeader,
      tableData: [
        {
          number: 1
        }, {}, {}, {}
      ],
      formItems,
      coopBtns
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container{
  width: 299px;
}

</style>
