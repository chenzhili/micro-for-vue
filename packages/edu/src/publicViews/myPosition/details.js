
/**
   * 获取我的持仓页面里面的 资金持仓 和 持仓明细属性
   * @param val 市场类型
   * @param date isDalCredit 融资融券中是否是信用交易 默认为普通交易
   */
export function handleFundsDetails (val, isDalCredit = false) {
  // 根据市场类型markettype来进行字段的区分
  let fundsPositionsKey = []
  let fundsDetailsKey = []
  // 进入case之前处理val值
  if ((val >= 1 && val <= 5) || (val === 11 && !isDalCredit)) {
    val = 1
  }
  if (val === 11 && isDalCredit) {
    val = 11
  }
  switch (val) {
    // 证券市场 和融资融券中的普通交易
    case 1:
      fundsPositionsKey = [
        { label: '币种', props: 'moneydetail' },
        { label: '初始资金', props: 'intialasset' },
        { label: '冻结资金', props: 'balance' },
        { label: '可用余额', props: 'total' },
        { label: '可取金额', props: 'outbal' },
        { label: '总资产', props: 'totalalasset' },
        { label: '参考市值', props: 'totalmarketvalue' },
        { label: '账户盈亏', props: 'accountprofit' }
      ]
      fundsDetailsKey = [
        { label: '证券代码', props: 'stockcode' },
        { label: '证券名称', props: 'stockname' },
        { label: '持仓数量', props: 'holdamount' },
        { label: '可卖数量', props: 'enableamount' },
        { label: '持仓均价', props: 'avbuyprice' },
        { label: '最新价', props: 'lastprice' },
        { label: '证券市值', props: 'marketvalue' },
        { label: '浮动盈亏', props: 'avincomebalance' },
        { label: '盈亏比例', props: 'profitratio' }
      ]
      break
      // 金融期货
    case 6:
      fundsPositionsKey = []
      break
      // 商品期货
    case 7:
      console.log(val, 'vall', isDalCredit)
      fundsPositionsKey = [
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
      ]
      fundsDetailsKey = [
        { label: '合约代码', props: 'code' },
        { label: '合约名称', props: 'name' },
        { label: '买卖方向', props: 'entrustbs' },
        { label: '总持仓', props: 'totalposition' },
        { label: '今仓', props: 'todaypositon' },
        { label: '昨仓', props: 'yesposition' },
        { label: '持仓均价', props: 'price' },
        { label: '总保证金', props: 'totalbond' },
        { label: '昨仓保证金', props: 'yesbond' },
        { label: '今仓保证金', props: 'todaybond' },
        { label: '逐笔浮盈', props: 'profit' },
        { label: '盈亏比例', props: 'ratio' },
        { label: '交易市场', props: 'exchange' }
      ]
      break
      // 外汇实盘
    case 8:
      fundsPositionsKey = [
        { label: '币种', props: '美元' },
        { label: '初始资金', props: 'initamt' },
        { label: '美元余额', props: 'amt' },
        { label: '总浮动盈亏', props: 'ptl' },
        { label: '盈亏比例', props: 'plratio' },
        { label: '总市值', props: 'marketvalue' },
        { label: '总资产', props: 'totalusd' }
      ]
      fundsDetailsKey = [
        { label: '货币代码', props: 'code' },
        { label: '货币名称', props: 'name' },
        { label: '金额', props: 'amt' },
        { label: '最新价格', props: 'newprice' },
        { label: '美元市值', props: 'usdmarketvalue' }
      ]
      break
      // 外汇虚盘
    case 9:
      fundsPositionsKey = [
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
      ]
      fundsDetailsKey = [
        { label: '商品代码', props: 'code' },
        { label: '商品名称', props: 'name' },
        { label: '总持仓', props: 'num' },
        { label: '买卖方向', props: 'entrustbs' },
        { label: '买入价格', props: 'price' },
        { label: '最新价', props: 'now' },
        { label: '止盈价格', props: 'profit' },
        { label: '止损价格', props: 'loss' },
        { label: '策略状态', props: 'state' },
        { label: '占用保证金', props: 'totalbond' },
        { label: '盈亏点数', props: 'point' },
        { label: '持仓盈亏', props: 'poprofit' },
        { label: '过夜利息', props: 'overnightfee' }
      ]
      break
      // 融资融券   信用交易
    case 11:
      fundsPositionsKey = [
        { label: '币种', props: '人民币' },
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
      ]
      fundsDetailsKey = [
        { label: '商品代码', props: 'code' },
        { label: '商品名称', props: 'name' },
        { label: '总持仓', props: 'num' },
        { label: '买卖方向', props: 'entrustbs' },
        { label: '买入价格', props: 'price' },
        { label: '最新价', props: 'now' },
        { label: '止盈价格', props: 'profit' },
        { label: '止损价格', props: 'loss' },
        { label: '策略状态', props: 'state' },
        { label: '占用保证金', props: 'totalbond' },
        { label: '盈亏点数', props: 'point' },
        { label: '持仓盈亏', props: 'poprofit' },
        { label: '过夜利息', props: 'overnightfee' }
      ]
      break
      // 期权
    case 12:
      fundsPositionsKey = [
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
        { label: '总收益率', props: 'rate' }
      ]
      // 期权持仓明细
      fundsDetailsKey = [
        { label: '合约代码', props: 'code' },
        { label: '合约名称', props: 'name' },
        { label: '期权类别', props: 'type' },
        { label: '持仓类别', props: 'holdtype' },
        { label: '昨日余额', props: 'yesnum' },
        { label: '可用数量', props: 'avalnum' },
        { label: '实际持仓', props: 'holdnum' },
        { label: '最新价', props: 'newprice' },
        { label: '成本价', props: 'openprice' },
        { label: '市值', props: 'marketvalue' },
        { label: '浮动盈亏', props: 'profit' },
        { label: '行权盈亏', props: 'income' },
        { label: '保证金', props: 'bond' }
      ]
      break
    default:
      fundsPositionsKey = []
      fundsDetailsKey = []
      break
  }
  return { fundsPositionsKey, fundsDetailsKey }
}
