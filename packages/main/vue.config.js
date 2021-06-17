/*
 * @Description:配置文件
 * @Author: ZY
 * @Date: 2020-12-07 11:41:22
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 15:17:29
 */
const { resolve } = require("path")
// const path = require("path")
const dayjs = require("dayjs")
const time = dayjs().format("YYYY-M-D HH:mm:ss")
process.env.VUE_APP_UPDATE_TIME = time

module.exports = {
  publicPath: "/",
  assetsDir: "static",
  outputDir: "mainFC",
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    hot: true,
    port: "9600",
    noInfo: false,
    proxy: {
      "/api": {
        target: "http://localhost:8062", // 岳哥环境
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  pluginOptions: {},
  configureWebpack () {
    return {
      resolve: {
        /* webpack5.0 以后 默认 不 增加新的 pollyfill， 这里需要手动添加和安装 */
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          path: require.resolve('path-browserify')
        },
        alias: {
          "@": resolve(__dirname, "src"),
          crypto: false
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

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
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
