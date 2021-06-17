import scenarios1 from '@/assets/education/sys_scenarios1.png'
import scenarios2 from '@/assets/education/sys_scenarios2.png'
import scenarios3 from '@/assets/education/sys_scenarios3.png'
const scenariosList = [scenarios1, scenarios2, scenarios3]
const MARKET = {
  intro: [
    {
      title: "云服务部署",
      subTitle:
          "云端部署，自动升级优化，运行稳定、高效，提供7*24小时运维支持",
      icon: "sys_icon1",
      className: "icon-sys_icon1",
      size: '49-31'
    },
    {
      title: "全市场投资品种",
      subTitle:
          "沪深证券、债券、基金、期货、外汇、期权、保险、固定资产等多种交易品种",
      icon: "sys_icon2",
      className: "icon-sys_icon2",
      size: '49-47'
    },
    {
      title: "多种交易模式",
      subTitle: "传统自主下单、智能AI交易、量化自动交易",
      icon: "sys_icon3",
      className: "icon-sys_icon3",
      size: '39-39'
    },
    {
      title: "沉浸式模拟体验",
      subTitle:
          "100%还原真实交易，从三方存管到证券开户、期货开户、外汇开户业务全真模拟。",
      icon: "sys_icon4",
      className: "icon-sys_icon4",
      size: '49-49'
    }
  ],
  scenarios: [
    '财商教学培养',
    '活动竞赛平台',
    '课程实训建设'
  ],
  product: [
    [
      '乾隆沪深A股模拟智投平台',
      '乾隆沪深债券模拟智投平台',
      '乾隆商品期货模拟智投平台',
      '乾隆外汇虚盘模拟智投平台',
      '乾隆期权模拟智投平台',
      '乾隆地产模拟平台'
    ],
    [
      '乾隆沪深基金模拟智投平台',
      '乾隆金融期货模拟智投平台',
      '乾隆外汇实盘模拟智投平台',
      '乾隆融资融券模拟智投平台',
      '乾隆保险模拟平台',
      '乾隆沪深A股模拟智投平台'
    ]
  ]
}

const JOBS = {
  intro: [
    {
      title: "金融岗位模拟",
      subTitle:
          "涵盖银行、券商、期货、基金等各类金融机构的岗位工作模拟，仿真模拟工作环境，线上完成各岗位工作内容模拟。",
      icon: "sys_icon5",
      className: "icon-sys_icon5",
      size: '49-49'
    },
    {
      title: "银行场景模拟",
      subTitle:
          "对公业务、对私业务，全方位模拟操作，掌握银证、银期、等业务关系。",
      icon: "sys_icon6",
      className: "icon-sys_icon6",
      size: '49-46'
    },
    {
      title: "证券场景模拟",
      subTitle:
          "客户经理、投资顾问、分析师、柜员等券商专业岗位与常规岗位工作内容模拟，券商岗位工作技能培训。",
      icon: "sys_icon7",
      className: "icon-sys_icon7",
      size: '47-47'
    },
    {
      title: "基金场景模拟",
      subTitle:
          "团队角色分工，完成基金组建，基金发行，基金路演，基金运作等工作内容模拟。",
      icon: "sys_icon8",
      className: "icon-sys_icon8",
      size: '43-44'
    }
  ],
  scenarios: [
    '各类金融场景模拟实训',
    '教学线上社会实践',
    '金融从业认知教育'
  ],
  product: [
    [
      '乾隆银行岗位实训平台',
      '乾隆基金岗位实训平台'
    ],
    [
      '乾隆证券岗位实训平台',
      '乾隆期货岗位实训平台'
    ]
  ]
}

const EMPLOYMENT = {
  intro: [
    {
      title: "金融行业百科",
      subTitle:
          "金融全行业知识背景，从行业背景、业务范围、行业企业、行业岗位、招聘消息等多方面进行讲解。",
      icon: "sys_icon9",
      className: "icon-sys_icon9",
      size: '45-46'
    },
    {
      title: "岗位能力训练",
      subTitle:
          "金融业各岗位能力训练。",
      icon: "sys_icon10",
      className: "icon-sys_icon10",
      size: "44-46"
    },
    {
      title: "从业考证训练",
      subTitle:
          "金融从业相关证书模拟考试与练习。",
      icon: "sys_icon11",
      className: "icon-sys_icon11",
      size: "43-46"
    }
  ],
  scenarios: [
    '金融教学课前预习',
    '金融岗位能力训练',
    '金融从业考证训练'
  ],
  product: [
    [
      '金融从业能力训练平台'
    ]
  ]
}

export {
  scenariosList,
  MARKET,
  JOBS,
  EMPLOYMENT
}
