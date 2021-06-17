export default [
  // {
  //   path: '/commodityFutures',
  //   name: 'commodityFutures',
  //   component: () => import('commodityFutures/views/index'),
  //   redirect: '/commodityFutures/commodityNewOrder',
  //   children: [
  {
    path: 'commodityNewOrder', // 商品期货三键下单
    name: 'commodityNewOrder',
    component: () => import('commodityFutures/views/commodityNewOrder/index')
  },
  {
    path: 'commodityOldOrder', // 商品期货传统下单
    name: 'commodityOldOrder',
    component: () => import('commodityFutures/views/commodityOldOrder/index')
  },
  {
    path: 'commodityQueryRepeal', // 商品期货查撤委托
    name: 'commodityQueryRepeal',
    component: () => import('commodityFutures/views/commodityQueryRepeal/index')
  },
  {
    path: 'commodityDelegationMsg', // 商品期货委托信息
    name: 'commodityDelegationMsg',
    component: () => import('commodityFutures/views/commodityDelegationMsg/index')
  },
  {
    path: 'commodityBargainMsg', // 商品期货成交信息
    name: 'commodityBargainMsg',
    component: () => import('commodityFutures/views/commodityBargainMsg/index')
  },
  {
    path: 'commodityContract', // 商品期货合约品种
    name: 'commodityContract',
    component: () => import('commodityFutures/views/commodityContract/index')
  },
  {
    path: 'commodityBankSecurities', // 商品期货银证转账
    name: 'commodityBankSecurities',
    component: () => import('commodityFutures/views/commodityBankSecurities/index')
  }
  //   ]
  // }
]
