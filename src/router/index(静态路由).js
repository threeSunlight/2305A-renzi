import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "@/layout"

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
  path: "/shouye",
  name: "shouye",
  meta: {
    title: "首页",
    icon: "el-icon-menu"
  },
  component: () => import("../views/ShouYe.vue")
}

/**动态路由表, 我们写死 */
const addRouters = [
  {
    path: "/zuzhi",
    name: "zuzhi",
    meta: {
      title: "组织架构",
      icon: "el-icon-setting"
    },
    component: () => import("../views/ZuZhi.vue")
  },
  {
    path: "/yuangong",
    name: "yuangong",
    meta: {
      title: "用户管理",
      icon: "el-icon-setting"
    },
    component: () => import("../views/YuanGong.vue")
  },
  {
    path: "/gongsishezhi",
    name: "gongsishezhi",
    meta: {
      title: "菜单管理",
      icon: "el-icon-setting"
    },
    component: () => import("../views/GongSiSheZhi.vue")
  },
  {
    path: "/quanxian",
    name: "quanxian",
    meta: {
      title: "权限管理",
      icon: "el-icon-setting"
    },
    component: () => import("../views/QuanXian.vue")
  },
  {
    path: "/kaoqin",
    name: "kaoqin",
    meta: {
      title: "考勤管理",
      icon: "el-icon-setting"
    },
    component: () => import("../views/KaoQin.vue")
  },
  {
    path: "/gongzi",
    name: "gongzi",
    meta: {
      title: "工资管理",
      icon: "el-icon-setting"
    },
    component: () => import("../views/GongZi.vue")
  }
]

/**将首页添加到动态路由表的第一个 */
addRouters.unshift(homeRoutes)

export const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/shouye", // 重定向:重新指向其它path,会改变网址
    component: Layout,
    children: [...addRouters]
  },
]

const router = new VueRouter({
  routes: [...globalRoutes,...routes]
})

//路由守卫登录
//引入Cookie
import { getCookie } from "../utils/auth"
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
  } else {
    if (getCookie()) {
      next()
    } else {
      next("/login")
    }
  }
})

export default router
