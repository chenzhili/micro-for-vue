export default [
  // {
  //   path: '/hkStocksMarket',
  //   name: 'hkStocksMarket',
  //   component: () => import('hkStocks/views/index'),
  //   redirect: '/hkStocksMarket/hkStocksDeal',
  //   children: [
  {
    path: 'hkStocksDeal', // 港股买入卖出
    name: 'hkStocksDeal',
    component: () => import('hkStocks/views/hkStocksDeal/index')
  },
  {
    path: 'hkQueryRepeal', // 港股查撤委托
    name: 'hkQueryRepeal',
    component: () => import('hkStocks/views/hkQueryRepeal/index')
  },
  {
    path: 'hkDelegationMsg', // 港股委托信息
    name: 'hkDelegationMsg',
    component: () => import('hkStocks/views/hkDelegationMsg/index')
  },
  {
    path: 'hkBargainMsg', // 港股成交信息
    name: 'hkBargainMsg',
    component: () => import('hkStocks/views/hkBargainMsg/index')
  },
  {
    path: 'hkFundCondition', // 港股资金流水
    name: 'hkFundCondition',
    component: () => import('hkStocks/views/hkFundCondition/index')
  },
  {
    path: 'hkBankSecurities', // 银证转账
    name: 'hkBankSecurities',
    component: () => import('hkStocks/views/hkBankSecurities/index')
  }
  //   ]
  // }
]
