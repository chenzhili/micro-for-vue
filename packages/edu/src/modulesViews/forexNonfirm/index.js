export default [
  // {
  //   path: '/forexNonfirm',
  //   name: 'forexNonfirm',
  //   component: () => import('forexNonfirm/views/index'),
  //   redirect: '/forexNonfirm/wareHouse',
  //   children: [
  {
    path: 'wareHouse', // 外汇虚盘下单
    name: 'wareHouse',
    component: () => import('forexNonfirm/views/wareHouse/index')
  },
  {
    path: 'nonfirmQueryRepeal', // 外汇虚盘查撤委托
    name: 'nonfirmQueryRepeal',
    component: () => import('forexNonfirm/views/nonfirmQueryRepeal/index')
  },
  {
    path: 'nonfirmDelegationMsg', // 外汇虚盘委托信息
    name: 'nonfirmDelegationMsg',
    component: () => import('forexNonfirm/views/nonfirmDelegationMsg/index')
  },
  {
    path: 'nonfirmBargainMsg', // 外汇虚盘成交信息
    name: 'nonfirmBargainMsg',
    component: () => import('forexNonfirm/views/nonfirmBargainMsg/index')
  },
  {
    path: 'goodsEdition', // 外汇虚盘商品品种
    name: 'goodsEdition',
    component: () => import('forexNonfirm/views/goodsEdition/index')
  },
  {
    path: 'nonfirmBankSecurities', // 外汇虚盘银汇转账
    name: 'nonfirmBankSecurities',
    component: () => import('forexNonfirm/views/nonfirmBankSecurities/index')
  }
  //   ]
  // }
]
