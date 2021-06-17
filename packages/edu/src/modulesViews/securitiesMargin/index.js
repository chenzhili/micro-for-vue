export default [
  // {
  //   path: '/securitiesMargin',
  //   name: 'securitiesMargin',
  //   component: () => import('securitiesMargin/views/index'),
  //   redirect: '/securitiesMargin/collateralTrading',
  //   children: [
  /** 信用交易模块 */
  {
    path: 'collateralTrading', // 担保品买卖
    name: 'collateralTrading',
    component: () => import('securitiesMargin/views/creditTrading/collateralTrading/index')
  },
  {
    path: 'financingBuy', // 融资买入
    name: 'financingBuy',
    component: () => import('securitiesMargin/views/creditTrading/financingBuy/index')
  },
  {
    path: 'securitiesSell', // 融券卖出
    name: 'securitiesSell',
    component: () => import('securitiesMargin/views/creditTrading/securitiesSell/index')
  },
  {
    path: 'securityReturn', // 买券还券
    name: 'securityReturn',
    component: () => import('securitiesMargin/views/creditTrading/securityReturn/index')
  },
  {
    path: 'fundReturn', // 卖券还款
    name: 'fundReturn',
    component: () => import('securitiesMargin/views/creditTrading/fundReturn/index')
  },
  {
    path: 'directReturn', // 直接还款/券
    name: 'directReturn',
    component: () => import('securitiesMargin/views/creditTrading/directReturn/index')
  },
  {
    path: 'queryRepeal', // 查撤委托
    name: 'queryRepeal',
    component: () => import('securitiesMargin/views/creditTrading/queryRepeal/index')
  },
  {
    path: 'delegationMsg', // 委托信息
    name: 'delegationMsg',
    component: () => import('securitiesMargin/views/creditTrading/delegationMsg/index')
  },
  {
    path: 'bargainMsg', // 成交信息
    name: 'bargainMsg',
    component: () => import('securitiesMargin/views/creditTrading/bargainMsg/index')
  },
  {
    path: 'fundCondition', // 资金流水信息
    name: 'fundCondition',
    component: () => import('securitiesMargin/views/creditTrading/fundCondition/index')
  },
  {
    path: 'collateralTransfer', // 担保品划转
    name: 'collateralTransfer',
    component: () => import('securitiesMargin/views/creditTrading/collateralTransfer/index')
  },
  /** 普通交易模块 */
  {
    path: 'generalDeal', // 买入卖出
    name: 'generalDeal',
    component: () => import('securitiesMargin/views/commonTrading/generalDeal/index')
  },
  {
    path: 'generalQueryRepeal', // 查撤委托
    name: 'generalQueryRepeal',
    component: () => import('securitiesMargin/views/commonTrading/generalQueryRepeal/index')
  },
  {
    path: 'generalDelegationMsg', // 委托信息
    name: 'generalDelegationMsg',
    component: () => import('securitiesMargin/views/commonTrading/generalDelegationMsg/index')
  },
  {
    path: 'generalBargainMsg', // 成交信息
    name: 'generalBargainMsg',
    component: () => import('securitiesMargin/views/commonTrading/generalBargainMsg/index')
  },
  {
    path: 'generalFundCondition', // 资金流水
    name: 'generalFundCondition',
    component: () => import('securitiesMargin/views/commonTrading/generalFundCondition/index')
  },
  {
    path: 'generalDeliveryList', // 查询交割单
    name: 'generalDeliveryList',
    component: () => import('securitiesMargin/views/commonTrading/generalDeliveryList/index')
  },
  {
    path: 'generalBankSecurities', // 银证转账
    name: 'generalBankSecurities',
    component: () => import('securitiesMargin/views/commonTrading/generalBankSecurities/index')
  }
  //   ]
  // }
]
