export default [
  // {
  //   path: '/shBShares',
  //   name: 'shBShares',
  //   component: () => import('shBShares/views/index'),
  //   redirect: '/shBShares/shDeal',
  //   children: [
  {
    path: 'shDeal', // 沪B股买入卖出
    name: 'shDeal',
    component: () => import('shBShares/views/shDeal/index')
  },
  {
    path: 'shQueryRepeal', // 沪B股查撤委托
    name: 'shQueryRepeal',
    component: () => import('shBShares/views/shQueryRepeal/index')
  },
  {
    path: 'shDelegationMsg', // 沪B股委托信息
    name: 'shDelegationMsg',
    component: () => import('shBShares/views/shDelegationMsg/index')
  },
  {
    path: 'shBargainMsg', // 沪B股成交信息
    name: 'shBargainMsg',
    component: () => import('shBShares/views/shBargainMsg/index')
  },
  {
    path: 'shFundCondition', // 沪B股资金流水
    name: 'shFundCondition',
    component: () => import('shBShares/views/shFundCondition/index')
  },
  {
    path: 'shDeliveryOrder', // 沪B股查询交割单
    name: 'shDeliveryOrder',
    component: () => import('shBShares/views/shDeliveryOrder/index')
  },
  {
    path: 'shBankSecurities', // 沪B股银证转账
    name: 'shBankSecurities',
    component: () => import('shBShares/views/shBankSecurities/index')
  }
  //   ]
  // }
]
