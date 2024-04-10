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
 *    3. 进度条ß
 */

/**第一步: 引入 */
import axios from "axios"
/**引入读取token的方法 */
import { getToken, removeToken } from "./auth.js"
/**引入路由 */
import router from "@/router"

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
    console.log(response)
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
    console.log(error)
    // 在这封装状态码

    return error
  }
)

export default http
