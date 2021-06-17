export const MARKET_FORMATTER = {
  1: '沪深A股',
  2: '沪深基金',
  3: '沪深债券',
  4: '沪B股',
  5: '深B股',
  6: '金融期货',
  7: '商品期货',
  8: '外汇实盘',
  9: '外汇虚盘',
  10: '外汇期货',
  11: '融资融券',
  12: '期权',
  13: '港股'
}

export const RACE_STATUS = {
  1: { text: "比赛中", color: "#E0585B" },
  2: { text: "未开赛", color: "#8D8D8D" },
  3: { text: "竞赛结束", color: "#8D8D8D" },
  4: { text: "比赛暂停", color: "#8D8D8D" },
  5: { text: "报名中", color: "#3A6FD9" }
}

export const TAB_STATUS = [
  { label: '报名中', value: 5 },
  { label: '未开赛', value: 2 },
  { label: '比赛中', value: 1 },
  { label: '比赛暂停', value: 4 },
  { label: '竞赛结束', value: 3 }
]

export const SIGN_STATUS = {
  0: '未报名',
  1: '报名参加',
  2: '提交审核',
  3: '审核中',
  4: '已报名',
  5: '审核失败'
}

export const TABLE_HEADER = [
  { attrs: { prop: "racename", label: "竞赛名称", width: '200' } },
  { attrs: { prop: "market", label: "竞赛类型", width: '120' }, custom: true },
  { attrs: { prop: "organizer", label: "举办者", width: '120' } },
  { attrs: { prop: "signUpDate", label: "报名起止日", width: '190' }, custom: true },
  { attrs: { prop: "raceDate", label: "竞赛起止日", width: '190' }, custom: true },
  { attrs: { prop: "intialasset", label: "初始资金", width: '120' } },
  { attrs: { prop: "isstand", label: "竞赛模式", width: '100' }, custom: true },
  { attrs: { prop: "matchstat", label: "竞赛状态", width: '100' }, custom: true },
  { attrs: { prop: "signupstatus", label: "报名状态" }, custom: true },
  { attrs: { prop: "coop", label: "操作" }, custom: true }
]

export const TABLE_DATA = {
  data: {
    records: [
      {
        intialasset: 500000.00000,
        signupstatus: 1,
        starttime: "2021/04/16",
        markettype: 1,
        isstand: "0",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "沪深A股",
        endtime: "2021/05/02",
        market: "沪深A股",
        organizer: "成都乾隆",
        matchstat: "5"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 2,
        starttime: "2021/04/16",
        markettype: 2,
        isstand: "1",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "沪深基金",
        endtime: "2021/05/02",
        market: "沪深基金",
        organizer: "成都乾隆",
        matchstat: "4"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 3,
        starttime: "2021/04/16",
        markettype: 3,
        isstand: "1",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "沪深债券",
        endtime: "2021/05/02",
        market: "沪深债券",
        organizer: "成都乾隆",
        matchstat: "3"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 4,
        starttime: "2021/04/16",
        markettype: 4,
        isstand: "0",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "沪B股",
        endtime: "2021/05/02",
        market: "沪B股",
        organizer: "成都乾隆",
        matchstat: "2"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 5,
        starttime: "2021/04/16",
        markettype: 5,
        isstand: "1",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "深B股",
        endtime: "2021/05/02",
        market: "沪深A股",
        organizer: "深B股",
        matchstat: "1"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 5,
        starttime: "2021/04/16",
        markettype: 6,
        isstand: "0",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "金融期货",
        endtime: "2021/05/02",
        market: "金融期货",
        organizer: "成都乾隆",
        matchstat: "1"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 4,
        starttime: "2021/04/16",
        markettype: 7,
        isstand: "0",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "商品期货",
        endtime: "2021/05/02",
        market: "商品期货",
        organizer: "成都乾隆",
        matchstat: "1"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 4,
        starttime: "2021/04/16",
        markettype: 8,
        isstand: "0",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "外汇实盘",
        endtime: "2021/05/02",
        market: "外汇实盘",
        organizer: "成都乾隆",
        matchstat: "1"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 4,
        starttime: "2021/04/16",
        markettype: 9,
        isstand: "0",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "外汇虚盘",
        endtime: "2021/05/02",
        market: "外汇虚盘",
        organizer: "成都乾隆",
        matchstat: "1"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 4,
        starttime: "2021/04/16",
        markettype: 11,
        isstand: "0",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "融资融券",
        endtime: "2021/05/02",
        market: "融资融券",
        organizer: "成都乾隆",
        matchstat: "1"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 4,
        starttime: "2021/04/16",
        markettype: 12,
        isstand: "0",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "期权",
        endtime: "2021/05/02",
        market: "期权",
        organizer: "成都乾隆",
        matchstat: "1"
      },
      {
        intialasset: 500000.00000,
        signupstatus: 4,
        starttime: "2021/04/16",
        markettype: 13,
        isstand: "0",
        enrollstart1: 1618531200000,
        enrollstart: "2021/04/16",
        enrollend: "2021/05/02",
        raceid: "2c9f8525784da8270178d875837f4559",
        racename: "港股",
        endtime: "2021/05/02",
        market: "港股",
        organizer: "成都乾隆",
        matchstat: "3"
      }
    ],
    size: 10,
    total: 13
  },
  page: { start: 0, size: 10, responsenum: 10, responsetotal: 40 },
  message: "处理成功",
  succflag: 0
}
