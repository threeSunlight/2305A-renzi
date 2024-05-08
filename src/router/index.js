import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "@/layout"
import http from "@/utils/http"
import {getToken} from '@/utils/auth'

Vue.use(VueRouter)

/**
 * 路由:
 * 分为 静态路由
 *     动态路由
 *
 * 静态路由: 所有人都可以访问的路由,不会变化的路由
 * 					1. 登录,404,401,
 * 					2. 首页是需要以菜单栏作为入口,
 * 动态路由: 有权限的路由,必须要登陆以后才能访问的路由,或者说是当前角色下面管控的路由
 * 					用户管理页面
 * 					角色管理页面
 *          菜单管理页面
 *           ....
 *
 * 因此:  我们的路由表,分为了动态路由和静态路由两种
 * 路由的导航钩子
 * 全局
 * 	全局前置路由守卫
 *  全局后置路由守卫
 *  全局解析守卫
 * 组件内
 * 路由独享守卫
 *
 */

/**静态路由,第一种全局路由,不需要以侧边栏作为入口的路由 */
const globalRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/loginView.vue")
  },
  {
    path: "/404",
    name: "404"
  },
  {
    path: "/401",
    name: "401"
  }
]

/**静态路由表, 第二种,需要以侧边栏作为入口的路由,首页 */
const homeRoutes = {
  path: "/dashboard",
  name: "dashboard",
  meta: {
    title: "首页",
    icon: "el-icon-menu"
  },
  component: () => import("../views/ShouYe.vue")
}

/**主入口路由(需嵌套上左右整体布局)
 * 静态布局方式,登录后,无论有没有权限,都能看到首页
*/
export const routes = [
  {
    path: "/",
    name: "main",
		redirect: { path: 'dashboard' }, // 重定向:重新指向其它path,会改变网址
    component: Layout,
    children: [{
			path: "/dashboard",
			name: "dashboard",
			meta: {
				title: "首页",
				icon: "el-icon-menu"
			},
			component: () => import("../views/ShouYe.vue")
		}],
  },
]
console.log(globalRoutes.concat(routes),'globalRoutes.concat(routes)');

const router = new VueRouter({
  routes:globalRoutes.concat(routes)
})

/**动态请求接口,请求动态路由
 * 全局前置路由守卫中,获取接口,请求动态路由
 * 前端的路由信息,需要包含
 *  "menus": [
                "settings",
                "social_securitys",
                "permissions",
                "approvals",
                "departments",
                "salarys",
                "employees",
                "user12345",
                "attendances"
            ],
 * {
 *   path: "/xxx",
 *   name: "xxxx",
 *   component: () => import("../views/xxxx.vue")
 *	 meta: {
				title: "首页",
				icon: "el-icon-menu"
		 },
 * }
 * 请求的接口  /api/sys/profile
 * 请求接口:
 * 	第一步: 先引入http,进行请求,处理数据,变成动态路由
 *  第二步: 将首页添加至数组的第一位
 *  第三步: 将动态路由,合并到我们已经准备好的静态表中 addRoute\
 *
 * 作业: 1.请求接口
 *      2. 把本地文件夹的名称进行修改,并且引入
*/
router.beforeEach((to,form,next) => {

	http.post(http.adUrl('/sys/profile')).then(res => {
		if(res.code === 10000) {
			let menuList = res.data.roles.menus
			/**处理过后的最终的动态路由结果 */
			const resultMenulits = []
			for (let index = 0; index < menuList.length; index++) {
				const item = menuList[index]
				const element = {
					path: "/"+ item,
					name: item,
					component: () => import(`../views/${item}.vue`),
					meta: {
						title: item,
						icon: "el-icon-menu"
					}
				}
				resultMenulits.push(element)
			}
			/**将首页添加至第一位 */
			resultMenulits.unshift(homeRoutes)
			console.log("**************");
			console.log(resultMenulits);
			console.log("-------------");
			router.addRoute(resultMenulits)
		}
	})
	next()
})

export default router
