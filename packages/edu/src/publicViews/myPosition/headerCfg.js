const arr = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
const HS = {
  position: [
    { label: '币种', props: 'moneydetail' },
    { label: '初始资金', props: 'intialasset' },
    { label: '冻结资金', props: 'balance' },
    { label: '可用余额', props: 'total' },
    { label: '可取金额', props: 'outbal' },
    { label: '总资产', props: 'totalalasset' },
    { label: '参考市值', props: 'totalmarketvalue' },
    { label: '账户盈亏', props: 'accountprofit' }
  ],
  details: [
    { attrs: { prop: "order", label: "序号" }, custom: true },
    { attrs: { prop: "stockcode", label: "证券代码" } },
    { attrs: { prop: "stockname", label: "证券名称" } },
    { attrs: { prop: "holdamount", label: "持仓数量" } },
    { attrs: { prop: "enableamount", label: "可卖数量" } },
    { attrs: { prop: "avbuyprice", label: "持仓均价" } },
    { attrs: { prop: "lastprice", label: "最新价" } },
    { attrs: { prop: "marketvalue", label: "证券市值" } },
    { attrs: { prop: "avincomebalance", label: "浮动盈亏" }, custom: true },
    { attrs: { prop: "profitratio", label: "盈亏比例" }, custom: true }
  ],
  decimal: {
    position: {
      reverse: true,
      props: ['moneydetail']
    },
    details: {
      reverse: false,
      props: ['avbuyprice', 'lastprice', 'marketvalue', 'avincomebalance', 'profitratio']
    }
  }
}

const FUTURES = {
  position: [
    { label: '币种', props: 'moneydetail' },
    { label: '初始资金', props: 'initmoney' },
    { label: '上日结存', props: 'yesstore' },
    { label: '当日结存', props: 'todaystore' },
    { label: '客户权益', props: 'totalrights' },
    { label: '可用资金', props: 'aval' },
    { label: '可取资金', props: 'outbal' },
    { label: '冻结资金', props: 'freeze' },
    { label: '总保证金', props: 'totalmargin' },
    { label: '追加保证金', props: 'addFund' },
    { label: '今日手续费', props: 'fee' },
    { label: '风险度', props: 'risk' },
    { label: '总盈亏', props: 'totalpro' },
    { label: '总收益率', props: 'totalratio' },
    { label: '今日盈亏', props: 'todayprofit' },
    { label: '当日收益率：', props: 'todayradio' },
    { label: '今日入金', props: 'todayincome' },
    { label: '今日出金', props: 'todaypay' }
  ],
  details: [
    { attrs: { prop: "order", label: "序号" }, custom: true },
    { attrs: { prop: "code", label: "合约代码" } },
    { attrs: { prop: "name", label: "合约名称" } },
    { attrs: { prop: "entrustbs", label: "买卖方向" } },
    { attrs: { prop: "totalposition", label: "总持仓" } },
    { attrs: { prop: "todaypositon", label: "今仓" } },
    { attrs: { prop: "yesposition", label: "昨仓" } },
    { attrs: { prop: "price", label: "持仓均价" } },
    { attrs: { prop: "totalbond", label: "总保证金" } },
    { attrs: { prop: "yesbond", label: "昨仓保证金" } },
    { attrs: { prop: "todaybond", label: "今仓保证金" } },
    { attrs: { prop: "profit", label: "逐笔浮盈" }, custom: true },
    { attrs: { prop: "ratio", label: "盈亏比例" }, custom: true },
    { attrs: { prop: "exchange", label: "交易市场" } }
  ],
  decimal: {
    position: {
      reverse: true,
      props: ['todayradio', 'totalratio', 'risk']
    },
    details: {
      reverse: false,
      props: ['price', 'totalbond', 'yesbond', 'todaybond', 'profit']
    }
  }
}

const FOREX_FIRM = {
  position: [
    { label: '币种', props: '美元' },
    { label: '初始资金', props: 'initamt' },
    { label: '美元余额', props: 'amt' },
    { label: '总浮动盈亏', props: 'ptl' },
    { label: '盈亏比例', props: 'plratio' },
    { label: '总市值', props: 'marketvalue' },
    { label: '总资产', props: 'totalusd' }
  ],
  details: [
    { attrs: { prop: "order", label: "序号" }, custom: true },
    { attrs: { prop: "code", label: "货币代码" } },
    { attrs: { prop: "name", label: "货币名称" } },
    { attrs: { prop: "amt", label: "金额" } },
    { attrs: { prop: "newprice", label: "最新价格" } },
    { attrs: { prop: "usdmarketvalue", label: "美元市值" } }
  ],
  decimal: {
    position: {
      reverse: true,
      props: ['plratio']
    },
    details: {
      reverse: false,
      props: ['amt', 'newprice', 'usdmarketvalue']
    }
  }
}
const FOREX_NO_FIRM = {
  position: [
    { label: '币种', props: '美元' },
    { label: '初始资金', props: 'initmoney' },
    { label: '账面余额', props: 'aval' },
    { label: '实际净值', props: 'networth' },
    { label: '盈亏比例', props: 'profitrate' },
    { label: '当日平仓盈亏', props: 'todayprofit' },
    { label: '持仓盈亏', props: 'positionprofit' },
    { label: '可用保证金', props: 'avalbond' },
    { label: '占用保证金', props: 'bond' },
    { label: '可用保证金比例', props: 'bondrate' },
    { label: '总盈亏', props: 'totalprofit' }
  ],
  details: [
    { attrs: { prop: "order", label: "序号" }, custom: true },
    { attrs: { prop: "code", label: "商品代码" } },
    { attrs: { prop: "name", label: "商品名称" } },
    { attrs: { prop: "num", label: "总持仓" } },
    { attrs: { prop: "entrustbs", label: "买卖方向" }, custom: true },
    { attrs: { prop: "price", label: "买入价格" } },
    { attrs: { prop: "now", label: "最新价" } },
    { attrs: { prop: "profit", label: "止盈价格" } },
    { attrs: { prop: "loss", label: "止损价格" } },
    { attrs: { prop: "state", label: "策略状态" } },
    { attrs: { prop: "totalbond", label: "占用保证金" } },
    { attrs: { prop: "point", label: "盈亏点数" } },
    { attrs: { prop: "poprofit", label: "持仓盈亏" } },
    { attrs: { prop: "overnightfee", label: "过夜利息" } }
  ],
  decimal: {
    position: {
      reverse: true,
      props: ['']
    },
    details: {
      reverse: false,
      props: ['totalbond', 'point', 'poprofit', 'overnightfee']
    }
  }
}

const MARGIN_TRADING = {
  position: [
    { label: '币种', props: 'currency' },
    { label: '维持担保品比例', props: 'dbpbl', percent: true },
    { label: '可用保证金', props: 'kybond' },
    { label: '可用金额', props: 'kymoney' },
    { label: '净资产', props: 'netassets' },
    { label: '总资产', props: 'totalassets' },
    { label: '现金资产', props: 'cashassets' },
    { label: '持仓总盈亏', props: 'totalpal' },
    { label: '总负债', props: 'totalfz' },
    { label: '融资负债金额', props: 'rzfzmoney' },
    { label: '融券负债金额', props: 'rqfzmoney' },
    { label: '利息总负债', props: 'costfz' },
    { label: '融资已用额度', props: 'rzused' },
    { label: '融券已用额度', props: 'rqused' },
    { label: '融资可用额度', props: 'rzuseable' },
    { label: '融券可用额度', props: 'rquseable' }
  ],
  details: [
    { attrs: { prop: "order", label: "序号" }, custom: true },
    { attrs: { prop: "code", label: "证券代码" } },
    { attrs: { prop: "name", label: "证券名称" } },
    { attrs: { prop: "holdamount", label: "持仓数量" } },
    { attrs: { prop: "enableamount", label: "可卖数量" } },
    { attrs: { prop: "avbuyprice", label: "持仓均价" } },
    { attrs: { prop: "lastprice", label: "最新价" } },
    { attrs: { prop: "marketvalue", label: "证券市值" } },
    { attrs: { prop: "avincomebalance", label: "浮动盈亏" }, custom: true },
    { attrs: { prop: "profitratio", label: "盈亏比例" }, custom: true }
  ],
  navList: [
    { label: '信用持仓', value: 0 },
    { label: '融资负债', value: 1 },
    { label: '融券负债', value: 2 }
  ],
  decimal: {
    position: {
      reverse: true,
      props: ['currency']
    },
    details: {
      reverse: false,
      props: ['avbuyprice', 'lastprice', 'marketvalue', 'avincomebalance']
    }
  }
}

const OPTION = {
  position: [
    { label: '币种', props: '人民币' },
    { label: '初始资金', props: 'init' },
    { label: '总资产', props: 'totalfund' },
    { label: '期权风险度', props: 'risk' },
    { label: '期权总资产', props: 'optfund' },
    { label: '期权总市值', props: 'totalmav' },
    { label: '期权可用保证金', props: 'avalbond' },
    { label: '期权已用保证金', props: 'totalbond' },
    { label: '期权冻结金', props: 'frozen' },
    { label: '证券总资产', props: 'stocktotal' },
    { label: '证券可用资金', props: 'stockaval' },
    { label: '证券总盈亏', props: 'stockprofit' },
    { label: '期权总盈亏', props: 'optprofit' },
    { label: '持仓总盈亏', props: 'totalprofit' },
    { label: '总收益率', props: 'rate', percent: true }
  ],
  details: [
    { attrs: { prop: "order", label: "序号" }, custom: true },
    { attrs: { prop: "code", label: "合约代码" } },
    { attrs: { prop: "name", label: "合约名称" } },
    { attrs: { prop: "type", label: "期权类别" } },
    { attrs: { prop: "holdtype", label: "持仓类别" } },
    { attrs: { prop: "yesnum", label: "昨日余额" } },
    { attrs: { prop: "avalnum", label: "可用数量" } },
    { attrs: { prop: "holdnum", label: "实际持仓" } },
    { attrs: { prop: "newprice", label: "最新价" } },
    { attrs: { prop: "openprice", label: "成本价" } },
    { attrs: { prop: "marketvalue", label: "市值" } },
    { attrs: { prop: "profit", label: "浮动盈亏" }, custom: true },
    { attrs: { prop: "income", label: "行权盈亏" } },
    { attrs: { prop: "bond", label: "保证金" } }
  ],
  navList: [
    { label: '期权持仓明细', value: 0 },
    { label: '证券持仓明细', value: 1 }
  ],
  decimal: {
    position: {
      reverse: true,
      props: ['message', 'succflag', 'risk', 'rate']
    },
    details: {
      reverse: false,
      props: ['newprice', 'openprice', 'marketvalue', 'profit', 'income', 'bond']
    }
  }
}

const HS_ID = [1, 2, 3, 4, 5, 13]
const FUTURES_ID = [6, 7]

export const summarize = id => {
  if (HS_ID.indexOf(id) !== -1) {
    return HS
  } else if (FUTURES_ID.indexOf(id) !== -1) {
    return FUTURES
  } else if (id === 8) {
    return FOREX_FIRM
  } else if (id === 9) {
    return FOREX_NO_FIRM
  } else if (id === 11) {
    return MARGIN_TRADING
  } else if (id === 12) {
    return OPTION
  }
}
