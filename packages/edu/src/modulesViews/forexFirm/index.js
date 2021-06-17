export default [
  // {
  //   path: '/forexFirm',
  //   name: 'forexFirm',
  //   component: () => import('forexFirm/views/index'),
  //   redirect: '/forexFirm/firmOfferOrder',
  //   children: [
  {
    path: 'firmOfferOrder', // 外汇实盘下单
    name: 'firmOfferOrder',
    component: () => import('forexFirm/views/firmOfferOrder/index')
  },
  {
    path: 'realityQueryRepeal', // 外汇实盘查撤委托
    name: 'realityQueryRepeal',
    component: () => import('forexFirm/views/realityQueryRepeal/index')
  },
  {
    path: 'realityDelegationMsg', // 外汇实盘委托信息
    name: 'realityDelegationMsg',
    component: () => import('forexFirm/views/realityDelegationMsg/index')
  },
  {
    path: 'realityBargainMsg', // 外汇实盘成交信息
    name: 'realityBargainMsg',
    component: () => import('forexFirm/views/realityBargainMsg/index')
  },
  {
    path: 'realitySpread', // 外汇实盘点差参数
    name: 'realitySpread',
    component: () => import('forexFirm/views/realitySpread/index')
  },
  {
    path: 'realityBankSecurities', // 外汇实盘银汇转账
    name: 'realityBankSecurities',
    component: () => import('forexFirm/views/realityBankSecurities/index')
  }
  //   ]
  // }
]
