export default [
  // {
  //   path: '/aShareMarket',
  //   name: 'aShareMarket',
  //   component: () => import('aShareMarket/views/index'),
  //   redirect: '/aShareMarket/aStocksDeal',
  //   children: [
  {
    path: 'aStocksDeal', // A股买入卖出
    name: 'aStocksDeal',
    component: () => import('aShareMarket/views/aStocksDeal/index')
  },
  {
    path: 'aQueryRepeal', // A股查撤委托
    name: 'aQueryRepeal',
    component: () => import('aShareMarket/views/aQueryRepeal/index')
  },
  {
    path: 'aDelegationMsg', // A股委托信息
    name: 'aDelegationMsg',
    component: () => import('aShareMarket/views/aDelegationMsg/index')
  },
  {
    path: 'aBargainMsg', // A股成交信息
    name: 'aBargainMsg',
    component: () => import('aShareMarket/views/aBargainMsg/index')
  },
  {
    path: 'aFundCondition', // A股资金流水
    name: 'aFundCondition',
    component: () => import('aShareMarket/views/aFundCondition/index')
  },
  {
    path: 'deliveryOrder', // A股查询交割单
    name: 'deliveryOrder',
    component: () => import('aShareMarket/views/deliveryOrder/index')
  },
  {
    path: 'aBankSecurities', // 银证转账
    name: 'aBankSecurities',
    component: () => import('aShareMarket/views/aBankSecurities/index')
  }
  //   ]
  // }
]
