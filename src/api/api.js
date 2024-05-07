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
//获取员工页面列表
export const userlistApi = (data) => {
  return axios.get(`${api}/sys/user?page=${data.page}&size=${data.size}`)
}

//获取公司设置页面角色管理列表
export const rolelistApi = (data) => {
  return axios.get(`${api}/sys/role?page=${data.page}&pagesize=${data.pagesize}`)
}
//添加角色
export const addroleApi = (data) => {
  return axios.post(`${api}/sys/role`, data)
}
//获取公司信息
export const companyApi = () => {
  return axios.get(`${api}/company/1?id=1`)
}
//获取权限设置菜单
export const quanxianApi = () => {
  return axios.get(`${api}/sys/permission?type=1&pid=0`)
}
//添加菜单
export const addquanxianApi = (data) => {
  return axios.post(`${api}/sys/permission`, data)
}

//获取考勤部门
export const kaoqinbumenApi = () => {
  return axios.get(`${api}/company/department`)
}
//获取考勤页面员工信息
export const kaoqinuserApi = (data) => {
  return axios.get(`${api}/attendances?page=${data.page}&pagesize=${data.pagesize}`)
}

//获取工资页面部门
export const gongzibumenApi = () => {
  return axios.get(`${api}/company/department`)
}
//获取工资页面员工信息
export const gongziuserApi = (data) => {
  return axios.post(`${api}/salarys/list`, data)
}
