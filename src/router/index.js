import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "@/layout"
import http from "@/utils/http"
import {getCookie} from '@/utils/auth'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
Vue.use(VueRouter)
NProgress.configure({ showSpinner: false })
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
 * 如果不登录,可以直接通过改变路由的形式,进入首页,所以要在路由独享
 * 守卫中去校验,是否有token,如果没有token,就要跳转到登录页面进行登录
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
		// beforeEnter(to, from, next){
		// 		let token = getCookie()
		// 		console.log(token,'token');
		// 		/**判断token不存在,就让他跳转到登录页面 */
		// 		if(!token) {
		// 			next({ name: 'login' })
		// 		}
		// }
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
		提前定义一个对象
		obj = {
			settings: "首页",
			social_securitys: "ddd"
		}
		obj[item]
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
// 提前定义中文名字
const routeObj = {
	settings: "公司设置",
	social_securitys: "社保",
	permissions: "权限设置",
	approvals: "审批",
	departments: "部门管理",
	salarys: "工资",
	employees: "员工",
	attendances: "考勤"
}

/**树形菜单,每一个树形的单独形象 */

function initRoute(menuItem) {
	return  {
		path: "/"+ menuItem,
		name: menuItem,
		component: () => import(`../views/${menuItem}.vue`),
		meta: {
			title: routeObj[menuItem],
			icon: "el-icon-menu",
		}
	}
}

/**将一维数组处理成我们想要的路由数据格式*/
function createTreeRoutes(menusList=[], resultMenulits=[]) {
	for (let index = 0; index < menusList.length; index++) {
		const item = menusList[index]
		const element = initRoute(item)
		resultMenulits.push(element)
		router.addRoute("main",element)
	}
	/**将首页添加至第一位 */
	resultMenulits.unshift(homeRoutes)
	return resultMenulits
}


/**
 * 按钮显示与隐藏: v-if,v-show
 * 封装公共方法,方法名叫isAuth()
 * 1. 封装一个函数方法,判断传入的权限按钮标识,是否包含在当前数组中,如果包含,就返回true,不包含返回false
 * 2. 封装一个自定义指令,在指令去控制dom元素的显隐藏,根本也是判断当前传入的标识,是否包含在当前数组中
 *
*/
router.beforeEach((to,form,next) => {
	NProgress.start()
	http.post(http.adUrl('/sys/profile')).then(res => {
		if(res.code === 10000) {
			res.data.roles.permissions = ['role:add', 'role:update', 'role:put', 'user:export']

			/**获取到最终的处理数据结果,最终的路由信息 */
			let menuList = createTreeRoutes(res.data.roles.menus)

			// roles: ['user:list', 'user:add']
			sessionStorage.setItem('resultMenulits',JSON.stringify(menuList))
			/**储存权限标识 */
			sessionStorage.setItem("permissions",JSON.stringify(res.data.roles.permissions))
		}
	}).catch( e => {
		console.log(
			`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`,
			'color:blue'
		)
		next({ path: '/login' })
		NProgress.done()
	})
	next()
})

/**全局后置路由守卫钩子 */
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
export default router



/**
 * 路由表的编写
 * 1. 先声明不需要以侧边栏作为入口的静态路由,比如登录,404,401等页面
 * 2. 又单独声明了以侧边栏作为入口静态路由,首页
 * 3. 声明静态主入口路由,routes
 * 4. 实例化理由,将静态和动态路由,通过concat合并起来
 * 5. 在前置路由导航钩子中,请求接口,因为后端返回的是一维数组,所以我们需要一维
 *    数组处理成我们需要的数据格式,处理完成后,使用addRoute的方法,将动态路由
 *    和静态路由合并起来
 *
 *
 *
*/
