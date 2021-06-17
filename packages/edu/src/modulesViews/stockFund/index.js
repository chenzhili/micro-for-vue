export default [
  // {
  //   path: '/stockFund',
  //   name: 'stockFund',
  //   component: () => import('stockFund/views/index'),
  //   redirect: '/stockFund/HSDeal',
  //   children: [
  {
    path: 'HSDeal', // 沪深基金买入卖出
    name: 'HSDeal',
    component: () => import('stockFund/views/HSDeal/index')
  },
  {
    path: 'HSQueryRepeal', // 沪深基金查撤委托
    name: 'HSQueryRepeal',
    component: () => import('stockFund/views/HSQueryRepeal/index')
  },
  {
    path: 'HSDelegationMsg', // 沪深基金委托信息
    name: 'HSDelegationMsg',
    component: () => import('stockFund/views/HSDelegationMsg/index')
  },
  {
    path: 'HSBargainMsg', // 沪深基金成交信息
    name: 'HSBargainMsg',
    component: () => import('stockFund/views/HSBargainMsg/index')
  },
  {
    path: 'HSFundCondition', // 沪深基金资金流水
    name: 'HSFundCondition',
    component: () => import('stockFund/views/HSFundCondition/index')
  },
  {
    path: 'HSDeliveryOrder', // 沪深基金查询交割单
    name: 'HSDeliveryOrder',
    component: () => import('stockFund/views/HSDeliveryOrder/index')
  },
  {
    path: 'HSBankSecurities', // 沪深基金银证转账
    name: 'HSBankSecurities',
    component: () => import('stockFund/views/HSBankSecurities/index')
  }
  //   ]
  // }
]
