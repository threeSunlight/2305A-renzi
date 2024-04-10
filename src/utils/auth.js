import Cookies from "js-cookie"

/**后面的名字要和接口文档对齐 */
const token = "Authorization"
/***
 * 需求: 是将token风道cookie中,
 * set 设置
 * get 读取
 * remove 移除
 */

/**获取token */
export const getToken = () => {
  return Cookies.get(token)
}

/**设置token */
export const setToken = (value) => {
  Cookies.set(token, value)
}

/**移除token */
export const removeToken = () => {
  Cookies.remove(token)
}
