import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/shouye", // 重定向:重新指向其它path,会改变网址
    component: HomeView,
    children: [
      {
        path: "/shouye",
        name: "shouye",
        component: () => import("../views/ShouYe.vue")
      },
      {
        path: "/zuzhi",
        name: "zuzhi",
        component: () => import("../views/ZuZhi.vue")
      },
      {
        path: "/yuangong",
        name: "yuangong",
        component: () => import("../views/YuanGong.vue")
      },
      {
        path: "/gongsishezhi",
        name: "gongsishezhi",
        component: () => import("../views/GongSiSheZhi.vue")
      },
      {
        path: "/quanxian",
        name: "quanxian",
        component: () => import("../views/QuanXian.vue")
      },
      {
        path: "/kaoqin",
        name: "kaoqin",
        component: () => import("../views/KaoQin.vue")
      },
      {
        path: "/gongzi",
        name: "gongzi",
        component: () => import("../views/GongZi.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/loginView.vue")
  }
]

const router = new VueRouter({
  routes
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
