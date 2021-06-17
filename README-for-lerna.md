# 2021 如何使用 lerna

```md
<!--
  1、scope 指定 启动某个包
  2、parallel 输出所有包的 信息；
 -->

lerna run --scope react15 start --parallel
```

## 由于 重复包的关系，需要用到 yarn workspaces 这个功能，统一 规划安装包 https://classic.yarnpkg.com/en/docs/workspaces#search

在 root 的 package.json

```json
"workspaces": [
  "packages/*"
]
```

使用 yarn workspaces 后无法直接 yarn add <pkg_name> 或 yarn remove <pkg_name>，需要指定工作区。

安装根工作区（workspace root）的依赖
安装所有工作区都可以使用的依赖，不会被添加到包（子工作区）的 package.json 中
例如：yarn add jest -D -W
jest - Facebook 的单元测试工具
-D - 作为开发依赖安装
-W - --ignore-workspace-root-check 表示安装到工作区的根目录
官方命令文档 或 使用 yarn help add 在命令行查看
给指定的工作区（包）安装单独的依赖
安装某个包的依赖，不需要切换到这个包的目录下，直接在根目录执行命令
例如：yarn workspace button add lodash@4
button - workspace_name 包名，package.json 中设置的 name，不是文件夹名
给所有工作区安装依赖
当项目从 git 仓库中下载后，直接执行 yarn [install] 就可以安装所有依赖
包括每个包各自的依赖，不需要依次去每个包的目录下执行安装命令。
如果多个包引入了相同的依赖，会走动把依赖的包提升到根目录的 node_modules 中，防止重复下载，节省硬盘空间，不需要存储在每个包的 node_modules 中。
yarn [install] 可以在项目根目录下执行，也可以在任何一个工作区目录下执行，效果一样。
删除依赖
工作区根目录：yarn remove <pkg_name> -W
指定工作区：yarn workspace <workspace_name> remove <pkg_name>
pkg_name 依赖名，不加版本号
执行指定工作区的 scripts 命令
yarn workspace <workspace_name> run <script_name>
这样就不需要进入到工作区的目录才能执行它的脚本
这些命令建议在根目录执行

## 引出 有关与 插件开发 的 依赖 在 package.json  中的 意义 --- peerDependencies
意义：
1、防止 依赖的 重复安装，只会在 跟 node_modules 上 安装一次；
2、保证 运用的 库 和 当前目录的 版本 匹配一致，不至于 由于 版本的 差异导致出错；
***************
npm3中不会再要求peerDependencies所指定的依赖包被强制安装，相反npm3会在安装结束后检查本次安装是否正确，如果不正确会给用户打印警告提示
peerDependencies 中的依赖如果node_modules中没有或版本不匹配，不是安装，而是在控制台打印警告
***************

## lerna 的意义 以及 和 yarn 的 细微区别
假设组件库开发完毕，想要把所有组件提交到 Github 和 npm 上。

可以使用 Lerna，它可以统一发布项目中的所有包。

Lerna 是 babel 维护自己的 monorepo，并开源出的一个项目。
Lerna 是一种工具，用于优化使用git和npm管理多包存储库的工作流程。
用于管理具有多个包的 JavaScript 项目。
它可以一键把代码提交到 git 和 npm 仓库。
Lerna 也可以管理包的依赖，它可以选择使用 npm 还是 yarn，需要单独配置。
如果使用 yarn，可以开启 yarn workspaces。
一般会把 Leran 和 yarn workspaces 结合使用。
使用 Lerna 发布，使用 yarn workspaces 管理包的依赖。


# 需要 做的事情
1、多项目如何 集成 eslint，以及 相关的 配置 包括 ignore 以及 相关配置；问题： 就是 多项目 如何 在 大项目中 做 eslint
2、全局注入 git 的 钩子以及 提交方式；
3、对于 运用 lerna 相关 cli 导致 卡顿的问题
4、完善 vue.config.js 相关的 配置文件；
5、集成 vue3，vue-router，element-plus，vuex，axios

## 前期业务 相关；
1、vue-router 如何 动态 权限 配置，404，网络配置，基本路由的 一致性，导航首位 等 的 完善；
2、vuex 相关的 集成，namespace 方式的；
3、将 打包的组件 以 什么方式进行混入；混入方式的考虑；
4、请求相关 钩子的 完善；

## 管理端用 git://github.com/rcyj-FED/vue3-composition-admin.git


# 20210308 对于lerna 中使用 相关 规范东西的配置：https://blog.csdn.net/mjzhang1993/article/details/112578295
1、将 lint(包括 eslint，stylelint) 以及 提交规范 加入到了 项目；
2、判定 husky 不起作用的 问题，就看 .git/hooks 中 对应的 钩子文件 是否是 husky 的文件，可能 yorkie 会影响到，那就重新安装一次；


## 搭建 portal 端的相关 逻辑；
在对应的 portal，安装对应的包：
yarn workspace portal add vue-router@4

