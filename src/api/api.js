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
//获取公司组织结构
export const zuzhiApi = () => {
  return axios.get(`${api}/company/department`)
}
//获取部门负责人
export const fuzerenApi = () => {
  return axios.get(`${api}/sys/user/simple`)
}
//添加部门
export const addbumenApi = (data) => {
  return axios.post(`${api}/company/department`, data)
}
//删除部门
export const delbumenApi = (data) => {
  return axios.delete(`${api}/company/department/${data}`)
}
//编辑部门
export const editbumenApi = (data) => {
  return axios.put(`${api}/company/department${data.id}`, data)
}
//获取角色列表
export const userlistApi = (data) => {
  return axios.get(`${api}/sys/user?page=${data.page}&size=${data.size}`)
}
