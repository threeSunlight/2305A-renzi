import axios from "../utils/http"

// 动态拼接代理标识
const api = process.env.VUE_APP_BASE_API
//登录
export const loginApi = (data) => {
  return axios.post(`${api}/sys/login`, data)
}
//获取用户基本资料
export const profileApi = (data) => {
  return axios.post(`${api}/sys/profile`, data)
}
//获取公告信息
