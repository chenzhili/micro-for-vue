/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
/**
 * 模块相关路由
 */
import layout from '@/layout'
import moduleA from 'moduleA'
import option from 'option'
import securitiesMargin from 'securitiesMargin'
import hkStocks from 'hkStocks'
import aShareMarket from 'aShareMarket'
import stockFund from 'stockFund'
import hsBond from 'hsBond'
import shBShares from 'shBShares'
import szBShares from 'szBShares'
import financialFutures from 'financialFutures'
import commodityFutures from 'commodityFutures'
import forexFirm from 'forexFirm'
import forexNonfirm from 'forexNonfirm'

console.log(option)
export default [
  {
    path: '/',
    component: layout,
    redirect: '/raceEnter',
    children: [
      {
        path: 'home',
        component: () => import('@/publicViews/home')
      },
      {
        path: 'raceEnter',
        component: () => import('@/publicViews/raceEnter')
      },
      // ...securitiesMargin, // 融资融券
      // ...option, // 期权
      // ...hkStocks, // 港股
      // ...aShareMarket, // A股
      // ...stockFund, // 沪深基金
      // ...hsBond, // 沪深债券
      // ...shBShares, // 沪B股
      // ...szBShares, // 深B股
      // ...financialFutures, // 金融期货
      // ...commodityFutures, // 商品期货
      // ...forexFirm, // 外汇实盘
      // ...forexNonfirm, // 外汇虚盘
      // {
      //   path: 'selfSelection',
      //   component: () => import('@/publicViews/selfSelection')
      // },
      {
        path: 'myRace',
        // redirect: '/myRace/profit',
        component: () => import('@/publicViews/myRace/MyRace'),
        children: [
          ...securitiesMargin, // 融资融券
          ...option, // 期权
          ...hkStocks, // 港股
          ...aShareMarket, // A股
          ...stockFund, // 沪深基金
          ...hsBond, // 沪深债券
          ...shBShares, // 沪B股
          ...szBShares, // 深B股
          ...financialFutures, // 金融期货
          ...commodityFutures, // 商品期货
          ...forexFirm, // 外汇实盘
          ...forexNonfirm, // 外汇虚盘
          {
            path: 'profit',
            name: 'profit',
            component: () => import('@/publicViews/myScore/profit')
          }, {
            path: 'holding',
            name: 'holding',
            component: () => import('@/publicViews/myScore/holding')
          }, {
            path: 'distribute',
            name: 'distribute',
            component: () => import('@/publicViews/myScore/distribute')
          }, {
            path: 'rank',
            name: 'rank',
            component: () => import('@/publicViews/myScore/rank')
          }, {
            path: 'score',
            name: 'score',
            component: () => import('@/publicViews/myScore/score')
          }, {
            path: 'risk',
            name: 'risk',
            component: () => import('@/publicViews/myScore/risk')
          },
          {
            path: 'myPosition',
            name: "myPosition",
            component: () => import('@/publicViews/myPosition')
          },
          {
            path: 'selfSelection',
            name: "selfSelection",
            component: () => import('@/publicViews/selfSelection')
          },
          {
            path: 'raceRank',
            name: "raceRank",
            component: () => import('@/publicViews/raceRank')
          },
          {
            path: 'evaluateScore',
            name: "evaluateScore",
            component: () => import('@/publicViews/evaluate/evaluateScore')
          },
          {
            path: 'labReport',
            name: "labReport",
            component: () => import('@/publicViews/evaluate/labReport')
          }
        ]
      },
      {
        path: 'myPractice',
        component: () => import('@/publicViews/myPractice')
      },
      {
        path: 'myAccount',
        component: () => import('@/publicViews/myAccount')
      }
    ]
  },
  // 网络错误的页面是独立的页面还是包含在页面框架里？
  {
    path: "/networkerror",
    component: () => require("@/publicViews/NetWorkError.vue").default,
    name: "networkerror",
    meta: { title: "网络错误" }
  },
  // {
  //   path: "/:any(.*)*",
  //   component: () => import("@/publicViews/404.vue")
  // },
  ...moduleA
]
