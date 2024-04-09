import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue")
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
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
  } else {
    if (localStorage.getItem("token")) {
      next()
    } else {
      next("/login")
    }
  }
})

export default router
