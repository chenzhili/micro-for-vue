import Layout from "@/layout"
import microConRoutes from './microConRoutes'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export default [
  {
    path: "/",
    component: Layout,
    name: 'layout',
    redirect: "/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/Home/index.vue"),
        name: "home",
        meta: { title: "首页" }
      },
      /* 微前端 宿主路由 */
      ...microConRoutes
      /*,
      {
        path: "m-message",
        component: () => import("@/views/Message/index.vue"),
        name: "message",
        meta: { title: "消息中心" }
      } ,
      {
        path: "example",
        component: () => import("@/views/Example/index.vue"),
        name: "example",
        meta: { title: "示例" }
      },
      {
        path: "personalCenter",
        component: () => import("@/views/PersonalCenter/index.vue"),
        name: "personalCenter",
        redirect: { name: 'myPracticalTraining' },
        meta: { title: "个人中心" },
        children: [
          {
            path: "myPracticalTraining",
            component: () => import("@/views/PersonalCenter/component/myPracticalTraining/index.vue"),
            name: "myPracticalTraining",
            meta: { title: "个人中心-我的实训" }
          },
          {
            path: "myRace",
            component: () => import("@/views/PersonalCenter/component/myRace/index.vue"),
            name: "myRace",
            meta: { title: "个人中心-我的竞赛" }
          },
          {
            path: "record",
            component: () => import("@/views/PersonalCenter/component/record/index.vue"),
            name: "record",
            meta: { title: "个人中心-做题记录" }
          },
          {
            path: "myCollection",
            component: () => import("@/views/PersonalCenter/component/myCollection/index.vue"),
            name: "myCollection",
            meta: { title: "个人中心-我的收藏" }
          },
          {
            path: "myInterest",
            component: () => import("@/views/PersonalCenter/component/myInterest/index.vue"),
            name: "myInterest",
            meta: { title: "个人中心-我的关注" }
          },
          {
            path: "dataSet",
            component: () => import("@/views/PersonalCenter/component/dataSet/index.vue"),
            name: "dataSet",
            meta: { title: "个人中心-资料设置" }
          }
        ]
      } */
    ]
  },

  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    name: "login",
    meta: { title: "登录" }
  },
  {
    path: "/bindMobile",
    component: () => import("@/views/Login/bindMobile.vue"),
    name: "bindMobile",
    meta: { title: "用户认证" }
  },
  {
    path: "/thirdLogin",
    component: () => import("@/views/Login/ThirdLogin.vue"),
    name: "thirdLogin",
    meta: { title: "第三方登录" }
  },
  {
    path: "/forget",
    component: () => import("@/views/Login/forgetView.vue"),
    name: "forget",
    meta: { title: "忘记密码" }
  },
  {
    path: "/register",
    component: () => import("@/views/Login/registerView.vue"),
    name: "register",
    meta: { title: "注册账号" }
  },
  // {
  //   path: "/education",
  //   component: () => import("@/views/Education/index.vue"),
  //   name: "education",
  //   redirect: "/education/system",
  //   children: [
  //     {
  //       path: "system",
  //       component: () => import("@/views/Education/TrainSystem.vue"),
  //       name: "system",
  //       meta: { title: "实训系统" }
  //     }, {
  //       path: "productionCoop",
  //       component: () => import("@/views/Education/ProductionCoop.vue"),
  //       name: "productionCoop",
  //       meta: { title: "产学合作" }
  //     },
  //     {
  //       path: "channelsCoop",
  //       component: () => import("@/views/Education/ChannelsCoop.vue"),
  //       name: "channelsCoop",
  //       meta: { title: "渠道合作" }
  //     },
  //     {
  //       path: "tryApply",
  //       component: () => import("@/views/Education/TryApply.vue"),
  //       name: "tryApply",
  //       meta: { title: "产品试用申请" }
  //     }
  //   ]
  // },

  // 网络错误的页面是独立的页面还是包含在页面框架里？
  {
    path: "/networkerror",
    component: () => require("@/views/NetWorkError.vue").default,
    name: "networkerror",
    meta: { title: "网络错误" }
  }
  // 这个 需要去掉，在 加载 微应用的 时候 会匹配得到 这里，需要 在路由钩子 中处理
  /* ,
  {
    path: "/:any(.*)*",
    component: () => import("@/views/404.vue")
  } */
]
