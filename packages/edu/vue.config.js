/*
 * @Description:配置文件
 * @Author: ZY
 * @Date: 2020-12-07 11:41:22
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 15:17:29
 */
const { resolve } = require("path")
const path = require("path")
const dayjs = require("dayjs")
const time = dayjs().format("YYYY-M-D HH:mm:ss")
process.env.VUE_APP_UPDATE_TIME = time

const modules = require('./src/modulesViews')
const { name } = require('./package.json')

const modulesAlias = Object.keys(modules).reduce((prev, next) => {
  prev[next] = resolve(modules[next])
  return prev
}, {})

module.exports = {
  // publicPath: "/",
  assetsDir: "static",
  outputDir: "edu",
  lintOnSave: process.env.NODE_ENV === "development",

  devServer: {
    hot: true,
    port: "9520",
    noInfo: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      "/test": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      css: {
        modules: {
          compileType: 'icss' // 修正在 navbar中 js中找不到 scss 的 变量
        }
      },
      sass: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  pluginOptions: {},
  configureWebpack () {
    return {
      output: {
        library: `${name}-[name]`,
        libraryTarget: 'umd', // 把微应用打包成 umd 库格式
        // jsonpFunction: `webpackJsonp_${name}`,// webpack 5中 删除此属性，会 自动内部识别package.json
      },
      resolve: {
        /* webpack5.0 以后 默认 不 增加新的 pollyfill， 这里需要手动添加和安装 */
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          path: require.resolve('path-browserify')
        },
        alias: {
          "@": resolve("src"),
          crypto: false,
          ...modulesAlias
        }
      },
      module: {},
      plugins: []
    }
  },
  chainWebpack (config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("preload")
    config.plugins.delete("prefetch")

    config.module.rules.delete("svg") // 重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single")
    })
  }
}
