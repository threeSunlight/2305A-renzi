import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
/***获取http请求**/
import http from '@/utils/httpRequest'
/*获取token信息,和移除token方法**/
import { getToken, removeToken } from '@/utils/auth'

Vue.use(Router)

NProgress.configure({ showSpinner: false }) // NProgress Configuration

/* Layout */
// 路由懒加载 https://router.vuejs.org/zh-cn/advanced/lazy-loading.html
const Layout = () => import('../layout/Main')
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  {
    path: '/404',
    component: () => import('@/views/common/404'),
    name: '404',
    meta: { title: '404未找到' }
  },
  {
    path: '/login',
    component: () => import('@/views/common/login'),
    name: 'login',
    meta: { title: '登录' }
  }
]

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
// Home
/**固定主路由*/
const homeRouter = {
  path: '/dashboard',
  redirect: { path: 'dashboard' },
  name: '/dashboard',
  meta: { title: 'dashboard', icon: 'tachometer-alt' }
}

// 主入口路由(需嵌套上左右整体布局)
const mainRouters = {
  path: '/',
  component: Layout,
  name: 'main',
  redirect: { path: 'dashboard' },
  // meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iFrameUrl: 是否通过iFrameUrl嵌套展示内容, '以http[s]://开头': 是, '': 否
    {
      path: '/dashboard',
      component: () => import('@/views/common/dashboard'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'tachometer-alt' }
    },
    {
      path: '/demo-01',
      component: null, // 如需要通过iFrameUrl嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
      name: 'demo-01',
      meta: {
        title: '我是一个通过iFrameUrl嵌套展示内容, 并通过tab打开 demo',
        isTab: true,
        iFrameUrl: 'http://localhost:8080/'
      }
    }
  ],
  beforeEnter(to, from, next) {
    const token = getToken()
    if (!token || !/\S/.test(token)) {
      resetLoginInfo()
      next({ name: 'login' })
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
    next()
  }
}

/**创建路由 */
const createRouter = () =>
  new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRouters) // 合并后的三个数组
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
/****重置路由,解决路由多次重复的问题***/
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

/**
 * 清除登录信息
 */
 export function resetLoginInfo() {
  removeToken()
  resetRouter()
  router.options.isAddDynamicMenuRoutes = false
}

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (
    router.options.isAddDynamicMenuRoutes ||
    fnCurrentRouteType(to, globalRoutes) === 'global'
  ) {
    next()
  } else {
    http({
      url: http.adornUrl('/api/menus/nav'),
      method: 'get',
      params: http.adornParams()
    })
      .then(({ data }) => {
        if (data && data.status === 0) {
          fnCreateDynamicRouters(data.list)
          router.options.isAddDynamicMenuRoutes = true
          // sessionStorage.setItem('menuList', JSON.stringify(data.list || '[]'))
          sessionStorage.setItem(
            'permissions',
            JSON.stringify(data.extra.permissions || '[]')
          )
          next({ ...to, replace: true })
        } else {
          // sessionStorage.setItem('menuList', '[]')
          sessionStorage.setItem('permissions', '[]')
          next()
        }
      })
      .catch(e => {
        console.log(
          `%c${e} 请求菜单列表和权限失败，跳转至登录页！！`,
          'color:blue'
        )
        resetLoginInfo()
        next({ name: 'login' })
        NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      })
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 * @param globalRoutes
 */
function fnCurrentRouteType(route, globalRoutes = []) {
  let temp = []
  for (let i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (
      globalRoutes[i].children &&
      globalRoutes[i].children.length >= 1
    ) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 初始化路由
 * @returns {{path: *, component: null, name: *, meta: {icon: *, menuId: *, title: *, isDynamic: boolean, iFrameUrl: string}}}
 * @param menuItem
 */
function initRoute(menuItem) {
  return {
    path: menuItem.url,
    component: null,
    name: menuItem.url,
    meta: {
      icon: menuItem.icon,
      menuId: menuItem.menuId,
      title: menuItem.name,
      isDynamic: true,
      iFrameUrl: ''
    }
  }
}

/**
 * 设置子路由
 * @param route
 * @param childrenRoute
 */
function setChildren(route, childrenRoute) {
  // 三级路由, path前没有加'/', 需新建router-view来渲染
  if (!/^\/.*/.test(route.path)) {
    route['component'] = {
      template: `
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>`
    }
  } else {
    // 二级路由, 直接使用layout渲染
    route['component'] = Layout
  }
  route['children'] = childrenRoute
}

/**
 * 递归路由
 * @param menuList
 * @param parentPath
 * @returns {Array}
 */
function createTreeRoutes(menuList = [], parentPath = '') {
  const childrenRoutes = []
  for (let i = 0; i < menuList.length; i++) {
    const menuItem = menuList[i]
    const route = initRoute(menuItem)
    // 如果含有子menuList, 递归
    if (menuItem.menuList && menuItem.menuList.length >= 1) {
      const path =
        parentPath && parentPath.length > 0
          ? parentPath + '/' + route.path
          : route.path
      route['name'] = path.route,
			createTreeRoutes(menuItem.menuList, path)
    } else {
      // url以http[s]://开头, 通过iFrame展示
      if (isURL(menuList[i].url)) {
        /* menuItem.url = getZkUiUri(menuList[i].url) */
        route['path'] = `i-${menuItem.menuId}`
        route['name'] = `${parentPath}/i-${menuItem.menuId}`
        route['component'] = {
          template: `
          <iframe
            src="${menuItem.url}"
            width="100%" height="1000px" frameborder="0" scrolling="yes">
          </iframe>`
        }
      } else {
        try {
          route['name'] = `${parentPath}/${menuItem.url}`
          route['component'] = () => import(`@/views${route.name}`) || null
        } catch (e) {
          console.debug(e.message)
        }
      }
    }
    childrenRoutes.push(route)
  }
  return childrenRoutes
}

/**
 * create dynamic router
 * @param {*} menuList 菜单列表
 */
function fnCreateDynamicRouters(menuList = []) {
  // 将一维数组处理成树形结构数据
  const routers = createTreeRoutes(menuList)
  // console.log(routers)
  routers.unshift(homeRouter)
  routers.push({ path: '*', redirect: { name: '404' }, hidden: true })
  router.addRoute(routers)
  sessionStorage.setItem('dynamicRouters', JSON.stringify(routers || '[]'))
  console.log(
    '\n%c!<-------------------- 动态(菜单)路由 s -------------------->',
    'color:blue'
  )
  console.log(routers)
  console.log(
    '%c!<-------------------- 动态(菜单)路由 e -------------------->\n\n',
    'color:blue'
  )
}

export default router
