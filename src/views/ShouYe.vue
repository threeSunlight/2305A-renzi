<template>
  <div class="shouye">
    <!-- 头部身份信息 -->
    <div class="article-top">
      <ShenFen></ShenFen>
    </div>
    <!-- 内容左侧区域 -->
    <div class="article-left">
      <!--工作日历组件 -->
      <RiLi></RiLi>
      <!-- 公告 -->
      <GongGao></GongGao>
    </div>
    <!-- 内容右侧区域 -->
    <div class="article-right">
      {{ $t("test.name") }}
    </div>
  </div>
</template>

<script>
import RiLi from "../components/RiLi.vue"
import ShenFen from "../components/ShenFen.vue"
import GongGao from "../components/GongGao.vue"

export default {
  components: {
    RiLi,
    ShenFen,
    GongGao
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.shouye {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .article-top {
    width: 100%;
  }
  .article-left {
    width: 60%;
  }
  .article-right {
    width: 38%;
  }
}
</style>
