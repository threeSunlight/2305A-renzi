import Cookies from "js-cookie"

const token = "token"

// 获取token
export function getCookie() {
  return Cookies.get(token)
}

// 设置token
export function setCookie(value) {
  return Cookies.set(token, value)
}

// 删除token
export function removeCookie() {
  return Cookies.remove(token)
}
