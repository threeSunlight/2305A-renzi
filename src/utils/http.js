import axios from "axios"
//引入cookie
import { getCookie, removeCookie } from "./auth"
/**引入message弹框 */
import { MessageBox } from "element-ui"
const instance = axios.create({
  // 设置请求的基础地址
  baseURL: "/",
  // 设置请求超时时间（毫秒）
  timeout: 36 * 1000,
  /**开启跨域凭证 */
  withCredentials: true,
  // 设置请求头
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = "Bearer" + " " + getCookie()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    let tilte = ""
    let message = error.response.data
    //封装401过期处理
    if (error.response.data.code == 10002 && error.response.status == 401) {
      //清除token
      removeCookie()
      //跳转到登录页
      window.location.href = "/login"
    }

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
    return Promise.reject(error)
  }
)

export default instance
