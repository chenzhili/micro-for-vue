import { clone } from "@/utils"
// A股
const BASE_CONFIG = [
  {
    label: "委托下单",
    hasChildren: true,
    name: 'order',
    children: {
      fName: 'order'
    }
  },
  { label: "我的自选", name: "selfSelection" },
  { label: "我的持仓", name: "myPosition" },
  { label: "龙虎榜", name: "raceRank" },
  {
    label: "我的战绩",
    hasChildren: true,
    name: 'myScore',
    children: {
      list: [
        { label: "我的收益", name: "profit" },
        { label: "当前仓位", name: "holding" },
        { label: "资产分布", name: "distribute" },
        { label: "资产排名", name: "rank" },
        { label: "综合评分", name: "score" },
        { label: "风险指标", name: "risk" }
      ],
      fName: 'myScore'
    }
  },
  {
    label: "考评得分",
    hasChildren: true,
    name: 'evaluate',
    children: {
      list: [
        { label: "考评得分", name: "evaluateScore" },
        { label: "实验报告", name: "labReport" }
      ],
      fName: 'evaluate'
    }
  }
]
// A股
const A_MARKET = [
  { label: "买入卖出", name: "aStocksDeal" },
  { label: "查撤委托", name: "aQueryRepeal" },
  { label: "委托信息", name: "aDelegationMsg" },
  { label: "成交信息", name: "aBargainMsg" },
  { label: "资金流水", name: "aFundCondition" },
  { label: "查询交割单", name: "deliveryOrder" },
  { label: "银证转账", name: "aBankSecurities" }
]
// 沪深基金
const HS_FUND = [
  { label: "买入卖出", name: "HSDeal" },
  { label: "查撤委托", name: "HSQueryRepeal" },
  { label: "委托信息", name: "HSDelegationMsg" },
  { label: "成交信息", name: "HSBargainMsg" },
  { label: "资金流水", name: "HSFundCondition" },
  { label: "查询交割单", name: "HSDeliveryOrder" },
  { label: "银证转账", name: "HSBankSecurities" }
]
// 沪深债券
const HS_BOND = [
  { label: "买入卖出", name: "bondDeal" },
  { label: "查撤委托", name: "bondQueryRepeal" },
  { label: "委托信息", name: "bondDelegationMsg" },
  { label: "成交信息", name: "bondBargainMsg" },
  { label: "资金流水", name: "bondFundCondition" },
  { label: "查询交割单", name: "bondDeliveryOrder" },
  { label: "银证转账", name: "bondBankSecurities" }
]
// 沪B股
const H_B_STOCK = [
  { label: "买入卖出", name: "shDeal" },
  { label: "查撤委托", name: "shQueryRepeal" },
  { label: "委托信息", name: "shDelegationMsg" },
  { label: "成交信息", name: "shBargainMsg" },
  { label: "资金流水", name: "shFundCondition" },
  { label: "查询交割单", name: "shDeliveryOrder" },
  { label: "银证转账", name: "shBankSecurities" }
]
// 深B股
const S_B_STOCK = [
  { label: "买入卖出", name: "szDeal" },
  { label: "查撤委托", name: "szQueryRepeal" },
  { label: "委托信息", name: "szDelegationMsg" },
  { label: "成交信息", name: "szBargainMsg" },
  { label: "资金流水", name: "szFundCondition" },
  { label: "查询交割单", name: "szDeliveryOrder" },
  { label: "银证转账", name: "szBankSecurities" }
]
// 金融期货
const FINANCIAL_FUTURES = [
  { label: "三键下单", name: "financialNewOrder" },
  { label: "传统下单", name: "financialOldOrder" },
  { label: "查撤委托", name: "financialQueryRepeal" },
  { label: "委托信息", name: "financialDelegationMsg" },
  { label: "成交信息", name: "financialBargainMsg" },
  { label: "合约品种", name: "financialContract" },
  { label: "银证转账", name: "financialBankSecurities" }
]
// 商品期货
const COMMODITY_FUTURES = [
  { label: "三键下单", name: "commodityNewOrder" },
  { label: "传统下单", name: "commodityOldOrder" },
  { label: "查撤委托", name: "commodityQueryRepeal" },
  { label: "委托信息", name: "commodityDelegationMsg" },
  { label: "成交信息", name: "commodityBargainMsg" },
  { label: "合约品种", name: "commodityContract" },
  { label: "银证转账", name: "commodityBankSecurities" }
]
// 外汇实盘
const FOREX_FIRM = [
  { label: "下单", name: "firmOfferOrder" },
  { label: "查撤委托", name: "realityQueryRepeal" },
  { label: "委托信息", name: "realityDelegationMsg" },
  { label: "成交信息", name: "realityBargainMsg" },
  { label: "点差参数", name: "realitySpread" },
  { label: "银汇转账", name: "realityBankSecurities" }
]
// 外汇虚盘
const FOREX_NO_FIRM = [
  { label: "下单", name: "wareHouse" },
  { label: "查撤委托", name: "nonfirmQueryRepeal" },
  { label: "委托信息", name: "nonfirmDelegationMsg" },
  { label: "成交信息", name: "nonfirmBargainMsg" },
  { label: "商品品种", name: "goodsEdition" },
  { label: "银汇转账", name: "nonfirmBankSecurities" }
]
// 融资融券
const MARGIN_TRADING = {
  list: [
    { label: "担保品买卖", name: "collateralTrading" },
    { label: "融资买入", name: "financingBuy" },
    { label: "融券卖出", name: "securitiesSell" },
    { label: "买券还券", name: "securityReturn" },
    { label: "卖券还款", name: "fundReturn" },
    { label: "直接还款/券", name: "directReturn" },
    { label: "查撤委托", name: "queryRepeal" },
    { label: "委托信息", name: "delegationMsg" },
    { label: "成交信息", name: "bargainMsg" },
    { label: "资金流水", name: "fundCondition" },
    { label: "担保品划转", name: "collateralTransfer" }
  ],
  list1: [
    { label: "买入卖出", name: "generalDeal" },
    { label: "查撤委托", name: "generalQueryRepeal" },
    { label: "委托信息", name: "generalDelegationMsg" },
    { label: "成交信息", name: "generalBargainMsg" },
    { label: "资金流水", name: "generalFundCondition" },
    { label: "查询交割单", name: "generalDeliveryList" },
    { label: "银证转账", name: "generalBankSecurities" }
  ]
}

// 期权
const OPTION = [
  { label: '期权交易', name: 'optionTrading' },
  { label: '股票交易', name: 'stockTrading' },
  { label: '锁定/解锁', name: 'lockStock' },
  { label: '行权', name: 'exercise' },
  { label: '查撤委托', name: 'cancelAttorney' },
  { label: '委托信息', name: 'optionDelegationMsg' },
  { label: '成交信息', name: 'optionBargainMsg' },
  { label: '期权合约', name: 'optionContract' },
  { label: '行权结果', name: 'exerciseResult' },
  { label: '证衍转账', name: 'stockTransaction' }
]
// 港股
const HK_STOCKS = [
  { label: "买入卖出", name: "hkStocksDeal" },
  { label: "查撤委托", name: "hkQueryRepeal" },
  { label: "委托信息", name: "hkDelegationMsg" },
  { label: "成交信息", name: "hkBargainMsg" },
  { label: "资金流水", name: "hkFundCondition" },
  { label: "银证转账", name: "hkBankSecurities" }
]

const navSummar = {
  1: A_MARKET,
  2: HS_FUND,
  3: HS_BOND,
  4: H_B_STOCK,
  5: S_B_STOCK,
  6: FINANCIAL_FUTURES,
  7: COMMODITY_FUTURES,
  8: FOREX_FIRM,
  9: FOREX_NO_FIRM,
  11: MARGIN_TRADING,
  12: OPTION,
  13: HK_STOCKS
}

export const getNavList = marketId => {
  const newConfig = clone(BASE_CONFIG)
  if (marketId === 11) {
    newConfig[0].children = {
      ...navSummar[11],
      fName: 'order'
    }
  } else {
    newConfig[0].children.list = navSummar[marketId]
  }
  return newConfig
}
