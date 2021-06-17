/**
 * moduleA 的 路由
 */
export default [
  {
    path: "/moduleA",
    component: () => import("moduleA/views/test"),
    name: "moduleA",
    meta: { title: "moduleA" }
  }
]
