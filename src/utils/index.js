/**
 * 封装权限按钮标识方法
 * 1. 封装一个函数方法,判断传入的权限按钮标识,是否包含在当前数组中,如果包含,就返回true,不包含返回false
*/

 export function isAuth(value) {
	// 1. 需要我们从本地吧权限标识数组取出来
	let allAuth = JSON.parse(sessionStorage.getItem('permissions'))
	return allAuth.includes(value)
}
