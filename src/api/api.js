import axios from "../utils/http"

// 动态拼接代理标识
const api = process.env.VUE_APP_BASE_API
//登录
export const loginApi = (data) => {
  return axios.post(`${api}/sys/login`, data)
}
