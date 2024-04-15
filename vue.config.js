const { defineConfig } = require("@vue/cli-service")
console.log(process.env.VUE_APP_BASE_API)
console.log(process.env.VUE_APP_BASE_URL, "---")
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 项目的根目录访问路径
  publicPath: "/",
  // 出口文件
  outputDir: "dits",
  // 放置静态资源，统一配置文件
  assetsDir: "assets",
  //用来配置跨域,启动项目端口号,启动项目是否直接打开浏览器,以及http配置
  devServer: {
    // 端口号
    port: "5137",
    //启动项目直接打开浏览器
    open: true,
    // 开发运行时域名，设置成'0.0.0.0',在同一个局域网下，如果你的项目在运行，同时可以通过你的http://ip:port/...访问你的项目
    host: "0.0.0.0",
    // 是否启用 https
    https: false,
    // 配置代理
    proxy: {
      //   // 代理标识
      //   "/api": {
      //     // 代理路径
      //     target: "https://www.baidu.com",
      //     //是否开启代理
      //     changeOrigin: true,
      //     // 如果是http接口，需要配置该参数
      //     secure: false,
      //     //路径重写
      //     pathRewrite: {
      //       "^/api": ""
      //     }
      //   }
      // 动态代理标识
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: " "
        }
      }
    }
  }
})
