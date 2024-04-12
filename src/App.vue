<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { setToken } from "./utils/auth"
export default {
  created() {
    const data = {
      mobile: 13800000002,
      password: "hm#qd@23!"
    }
    this.$http.post(this.$http.adUrl("/sys/login"), data).then((res) => {
      setToken(res.data)
    })
  }
}
</script>
<style lang="scss"></style>

<!-- 需求步骤

1. 新建一个layout文件夹
2. 在当前文件夹下面 新建一个siderbar.vue文件,用来储存左侧菜单路由信息
3. 新建一个Navbar.vue页面,用来存放顶部菜单栏的信息
4. 在新建一个index.vue页面,把siderbar.vue和Navbar.vue页面引入进来
5. 在路由文件夹下面,router.js文件里面去引入layout,变相引入layout下面的index.vue
6. 编写路由进行完整引入


-->
