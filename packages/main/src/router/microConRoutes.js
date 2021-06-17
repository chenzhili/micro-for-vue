/**
 * 微前端 方式 嵌入的 路由 宿主环境
 * 严格意义 必须加入 name
 */
export default [
  // 测试微前端
  {
    path: "race",
    component: () => import("@/viewsFMicro/race/index.vue"),
    name: "race",
    meta: { title: "高校智慧云" }
  },
  {
    path: "vue",
    component: () => import("@/viewsFMicro/vue/index.vue"),
    name: "vue",
    meta: { title: "测试" }
  }
]
