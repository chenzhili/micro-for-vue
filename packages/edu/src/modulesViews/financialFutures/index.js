export default [
  // {
  // path: '/financialFutures',
  // name: 'financialFutures',
  // component: () => import('financialFutures/views/index'),
  // redirect: '/financialFutures/financialNewOrder',
  // children: [
  {
    path: 'financialNewOrder', // 金融期货三键下单
    name: 'financialNewOrder',
    component: () => import('financialFutures/views/financialNewOrder/index')
  },
  {
    path: 'financialOldOrder', // 金融期货传统下单
    name: 'financialOldOrder',
    component: () => import('financialFutures/views/financialOldOrder/index')
  },
  {
    path: 'financialQueryRepeal', // 金融期货查撤委托
    name: 'financialQueryRepeal',
    component: () => import('financialFutures/views/financialQueryRepeal/index')
  },
  {
    path: 'financialDelegationMsg', // 金融期货委托信息
    name: 'financialDelegationMsg',
    component: () => import('financialFutures/views/financialDelegationMsg/index')
  },
  {
    path: 'financialBargainMsg', // 金融期货成交信息
    name: 'financialBargainMsg',
    component: () => import('financialFutures/views/financialBargainMsg/index')
  },
  {
    path: 'financialContract', // 金融期货合约品种
    name: 'financialContract',
    component: () => import('financialFutures/views/financialContract/index')
  },
  {
    path: 'financialBankSecurities', // 金融期货银证转账
    name: 'financialBankSecurities',
    component: () => import('financialFutures/views/financialBankSecurities/index')
  }
  //   ]
  // }
]
