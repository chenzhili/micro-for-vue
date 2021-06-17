export default [
  // {
  //   path: '/szBShares',
  //   name: 'szBShares',
  //   component: () => import('szBShares/views/index'),
  //   redirect: '/szBShares/szDeal',
  //   children: [
  {
    path: 'szDeal', // 深B股买入卖出
    name: 'szDeal',
    component: () => import('szBShares/views/szDeal/index')
  },
  {
    path: 'szQueryRepeal', // 深B股查撤委托
    name: 'szQueryRepeal',
    component: () => import('szBShares/views/szQueryRepeal/index')
  },
  {
    path: 'szDelegationMsg', // 深B股委托信息
    name: 'szDelegationMsg',
    component: () => import('szBShares/views/szDelegationMsg/index')
  },
  {
    path: 'szBargainMsg', // 深B股成交信息
    name: 'szBargainMsg',
    component: () => import('szBShares/views/szBargainMsg/index')
  },
  {
    path: 'szFundCondition', // 深B股资金流水
    name: 'szFundCondition',
    component: () => import('szBShares/views/szFundCondition/index')
  },
  {
    path: 'szDeliveryOrder', // 深B股查询交割单
    name: 'szDeliveryOrder',
    component: () => import('szBShares/views/szDeliveryOrder/index')
  },
  {
    path: 'szBankSecurities', // 深B股银证转账
    name: 'szBankSecurities',
    component: () => import('szBShares/views/szBankSecurities/index')
  }
  //   ]
  // }
]
