export default [
  // {
  //   path: '/hsBond',
  //   name: 'hsBond',
  //   component: () => import('hsBond/views/index'),
  //   redirect: '/hsBond/bondDeal',
  //   children: [
  {
    path: 'bondDeal', // 沪深债券买入卖出
    name: 'bondDeal',
    component: () => import('hsBond/views/bondDeal/index')
  },
  {
    path: 'bondQueryRepeal', // 沪深债券查撤委托
    name: 'bondQueryRepeal',
    component: () => import('hsBond/views/bondQueryRepeal/index')
  },
  {
    path: 'bondDelegationMsg', // 沪深债券委托信息
    name: 'bondDelegationMsg',
    component: () => import('hsBond/views/bondDelegationMsg/index')
  },
  {
    path: 'bondBargainMsg', // 沪深债券成交信息
    name: 'bondBargainMsg',
    component: () => import('hsBond/views/bondBargainMsg/index')
  },
  {
    path: 'bondFundCondition', // 沪深债券资金流水
    name: 'bondFundCondition',
    component: () => import('hsBond/views/bondFundCondition/index')
  },
  {
    path: 'bondDeliveryOrder', // 沪深债券查询交割单
    name: 'bondDeliveryOrder',
    component: () => import('hsBond/views/bondDeliveryOrder/index')
  },
  {
    path: 'bondBankSecurities', // 沪深债券银证转账
    name: 'bondBankSecurities',
    component: () => import('hsBond/views/bondBankSecurities/index')
  }
  //   ]
  // }
]
