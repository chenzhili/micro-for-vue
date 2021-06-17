/**
 * 对于市场 模块的划分
 */
const RP = './src/modulesViews'
module.exports = {
  moduleA: `${RP}/moduleA`,
  option: `${RP}/option`, // 期权
  securitiesMargin: `${RP}/securitiesMargin`, // 融资融券
  hkStocks: `${RP}/hkStocks`, // 港股
  aShareMarket: `${RP}/aShareMarket`, // A股
  stockFund: `${RP}/stockFund`, // 沪深基金
  hsBond: `${RP}/hsBond`, // 沪深债券,
  shBShares: `${RP}/shBShares`, // 沪B股
  szBShares: `${RP}/szBShares`, // 深B股
  financialFutures: `${RP}/financialFutures`, // 金融期货
  commodityFutures: `${RP}/commodityFutures`, // 商品期货
  forexFirm: `${RP}/forexFirm`, // 外汇实盘
  forexNonfirm: `${RP}/forexNonfirm` // 外汇虚盘
}
