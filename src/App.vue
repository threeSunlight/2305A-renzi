<template>
  <div class="app">
    <!--  头部 -->
    <header v-if="$route.path != '/login'">
      <headerView></headerView>
    </header>
    <!-- 右边区域 -->
    <div class="right">
      <!--   侧边栏 -->
      <aside v-if="$route.path != '/login'">
        <asideView></asideView>
      </aside>
      <!--   内容 -->
      <article>
        <router-view></router-view>
      </article>
    </div>
  </div>
</template>

<script>
import headerView from "./components/layout/headerView.vue"
import asideView from "./components/layout/asideView.vue"
export default {
  components: {
    headerView,
    asideView
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.app {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  header {
    width: 200px;
    height: 100%;
    background-color: #4979fa;
  }
  .right {
    width: calc(100vw - 200px);
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    aside {
      width: 100%;
      height: 60px;
      background-color: #4a7afb;
    }
    article {
      width: 100%;
      height: calc(100vh - 60px);
      background-color: #ccc;
    }
  }
}
</style>
