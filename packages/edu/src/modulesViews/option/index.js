export default [
  // {
  //   path: "/option",
  //   name: "option",
  //   component: () => import('option/views/index'),
  //   redirect: '/option/optionTrading',
  //   children: [
  {
    path: 'optionTrading', // 期权交易
    name: 'optionTrading',
    component: () => import('option/views/optionTrading/index')
  },
  {
    path: 'stockTrading', // 股票
    name: 'stockTrading',
    component: () => import('option/views/stockTrading/index')
  },
  {
    path: 'lockStock', // 锁定/解锁
    name: 'lockStock',
    component: () => import('option/views/lockStock/index')
  },
  {
    path: 'exercise', // 行权
    name: 'exercise',
    component: () => import('option/views/exercise/index')
  },
  {
    path: 'stockTransaction', // 证衍转账
    name: 'stockTransaction',
    component: () => import('option/views/stockTransaction/index')
  },
  {
    path: 'optionContract', // 期权合约
    name: 'optionContract',
    component: () => import('option/views/optionContract/index')
  },
  {
    path: 'exerciseResult', // 行权结果
    name: 'exerciseResult',
    component: () => import('option/views/exerciseResult/index')
  },
  {
    path: 'cancelAttorney', // 查撤委托
    name: 'cancelAttorney',
    component: () => import('option/views/cancelAttorney/index')
  },
  {
    path: 'optionDelegationMsg', // 委托信息
    name: 'optionDelegationMsg',
    component: () => import('option/views/delegationMsg/index')
  },
  {
    path: 'optionBargainMsg', // 成交信息
    name: 'optionBargainMsg',
    component: () => import('option/views/bargainMsg/index')
  }
  //   ]
  // }
]
