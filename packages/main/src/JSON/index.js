export default [
  {
    menuId: 1004,
    parentId: 0,
    name: "模拟投资",
    alias: "race",
    orderNum: 2,
    linkUrl: "",
    type: 1,
    children: []
  },
  {
    menuId: 1005,
    parentId: 0,
    name: "岗位实训",
    alias: "train",
    orderNum: 3,
    linkUrl: "",
    type: 1,
    children: []
  },
  {
    menuId: 1006,
    parentId: 0,
    name: "从业认证",
    alias: "jobcertify",
    orderNum: 4,
    linkUrl: "",
    type: 0,
    children: [
      {
        menuId: 1007,
        parentId: 1006,
        name: "行业介绍",
        alias: "jobcertifyIntro",
        orderNum: 1,
        linkUrl: "",
        type: 1,
        children: []
      },
      {
        menuId: 1008,
        parentId: 1006,
        name: "岗位详情",
        alias: "jobcertifyJobdetail",
        orderNum: 2,
        linkUrl: "",
        type: 1,
        children: []
      }
    ]
  },
  {
    menuId: 1009,
    parentId: 0,
    name: "校园招聘",
    alias: "campusjob",
    orderNum: 5,
    linkUrl: "",
    type: 0,
    children: []
  },
  {
    menuId: 1010,
    parentId: 0,
    name: "乾隆教育",
    alias: "education",
    orderNum: 6,
    linkUrl: "",
    type: 0,
    children: [
      {
        menuId: 1011,
        parentId: 1010,
        name: "产学合作",
        alias: "educationPcc",
        orderNum: 1,
        linkUrl: "",
        type: 1,
        children: []
      },
      {
        menuId: 1012,
        parentId: 1010,
        name: "渠道合作",
        alias: "educationCc",
        orderNum: 1,
        linkUrl: "",
        type: 1,
        children: []
      },
      {
        menuId: 1013,
        parentId: 1010,
        name: "产品试用申请",
        alias: "educationPt",
        orderNum: 1,
        linkUrl: "",
        type: 1,
        children: []
      }
    ]
  },
  {
    menuId: 1014,
    parentId: 0,
    name: "系统消息",
    alias: "message",
    orderNum: 7,
    linkUrl: "",
    type: 0,
    children: []
  }
]
