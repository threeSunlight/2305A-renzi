<template>
  <div class="home">
    <!--   侧边栏 -->
    <aside v-if="$route.path != '/login'" :style="flag ? 'width: 64px' : 'width: 200px'">
      <NavBar></NavBar>
    </aside>
    <!-- 右边内容区域 -->
    <div class="content" :style="flag ? 'width:calc(100vw - 64px)' : 'width:calc(100vw - 200px)'">
      <!--  头部 -->
      <header v-if="$route.path != '/login'">
        <SiderBar></SiderBar>
      </header>

      <!--   内容 -->
      <article>
        <div style="width: 100%">
          <router-view></router-view>
        </div>

        <div style="width: 100%; text-align: center; color: #aaa; margin-top: 20px">
          copyright © 2018 IHRM 系统 版权所有
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import NavBar from "../layout/common/NavBar.vue"
import SiderBar from "../layout/common/SiderBar.vue"
// import a from "../components/theme.vue"
import { EventBus } from "@/eventbus"

export default {
  components: {
    NavBar,
    SiderBar
  },
  data() {
    return {
      flag: false
    }
  },
  created() {
    EventBus.$on("Collapse", (flag) => {
      this.flag = flag
    })
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.home {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  aside {
    height: 100%;
    background-color: #4a7afb;
    transition: all 0.3s;
  }

  .content {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    header {
      width: 100%;
      height: 40px;
      background-color: #4979fa;
    }
    article {
      width: 100%;
      height: calc(100vh - 40px);
      overflow-y: auto;
      background-color: #edeff2;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
