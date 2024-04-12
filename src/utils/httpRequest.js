/***
 * 进度条 ngprojess
 *
 *
 * 封装axios 我们准备做什么工作
 * 1. 下载
 * 2. 引入axios
 * 3. 创建并实例化axios,封装根路径
 * 4. 请求拦截器
 * 		封装token
 * 5. 响应拦截器
 * 		1. 封装401过期
 *    2. 封装状态码

 * 6. 封装一个方法动态拼接代理标识
 *
 * 7. 挂载到全局
 */

/**第一步: 引入 */
import axios from "axios"
/**引入读取token的方法 */
import { getToken, removeToken } from "./auth.js"
/**引入路由 */
import router from "@/router"
/**引入message弹框 */
import { MessageBox } from "element-ui"

/**第二步: 创建实例 */
const http = axios.create({
  // 根目录
  baseURL: "/",
  /**超时时间 */
  timeout: 36 * 1000,
  /**开启跨域凭证 */
  withCredentials: true,
  /**配置headers请求方式 */
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
})

/**封装请求拦截器 */
http.interceptors.request.use(
  (config) => {
    /**用来封装token,要从auth.js文件中,把读取token方法引入
     * X-Access-Token: 和后端约定俗成起名字的方法
     */
    config.headers["Authorization"] = "Bearer" + " " + getToken()

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

/**封装响应拦截器 */
http.interceptors.response.use(
  (response) => {
    // 在这封装401过期,token失效
    if (response.data.code === 10002 && response.status == 200) {
      // 返回登录页面重新登录,并且清楚当前token信息,需要清楚保存到本地的个人信息
      /**
       * TODO: 需要清楚保存到本地的个人信息
       */
      router.push({
        path: "/login"
      })
      removeToken()
    }
    return response.data
  },
  (error) => {
    let tilte = ""
    let message = error.response.data
    console.log(error, "71")
    // 因为状态码返回有两种情况,一种是正常的code码,401,200,302
    // 还有一种是非正常的状态码,如" 没有或者返回英文字母
    // 获取返回报错的状态码:  error.code
    // 获取返回的报错信息: error.message
    // 在这封装状态码
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          tilte = "资源未授权"
          break
        case 400:
          tilte = "错误请求"
          break
        case 403:
          tilte = "禁止访问"
          break
        case 404:
          tilte = "未找到所请求的资源"
          break
        case 405:
          tilte = "不允许使用该方法"
          break
        case 408:
          tilte = "请求超时"
          break
        case 500:
          tilte = "内部服务器错误"
          break
        case 501:
          tilte = "未实现"
          break
        case 502:
          tilte = "网关错误"
          break
        case 503:
          tilte = "服务不可用"
          break
        case 504:
          tilte = "网关超时"
          break
        case 505:
          tilte = "HTTP版本不受支持"
          break
        default:
          tilte = error.response.status
          return MessageBox.alert(message, tilte, {
            type: "warning"
          })
      }
    } else {
      return MessageBox.alert("请联系系统管理员, 或稍后再试!", "未知错误", {
        type: "error"
      })
    }
  }
)

/**动态拼接代理标识 */
http.adUrl = (url) => {
  console.log(process.env.VUE_APP_BASE_API, "process.env.VUE_APP_BASE_API")
  return process.env.VUE_APP_BASE_API + url
}

export default http
