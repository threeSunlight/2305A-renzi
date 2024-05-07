<template>
  <div class="siderbar">
    <div class="left">
      <i :class="flag ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="Collapse"></i>
      &emsp;
      <p>江苏传智播客教育科技股份有限公司</p>
      &emsp;
      <span>体验版</span>
    </div>

    <div class="right">
      <!-- 全局黑白主题 -->
      <el-switch v-model="value" active-color="#2c2c2c" inactive-color="#ccc" @change="Elswitch"> </el-switch>&emsp;
      <!-- 全屏 -->
      <svg-icon :icon-class="screenfullflag ? 'suoxiao' : 'fangda'" @click="fangdasuoxiao"></svg-icon>&emsp;
      <!-- 国际化组件 -->
      <gjh></gjh>&emsp;
      <!-- 修改主题组件 -->
      <ThemeColor></ThemeColor>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/eventbus"
import ThemeColor from "../../components/ThemeColor"
import gjh from "../../components/lang/indexView"
import screenfull from "screenfull"

export default {
  components: {
    ThemeColor,
    gjh
  },
  data() {
    return {
      flag: false,
      screenfullflag: false,
      value: false,
      theme: "light" // 初始主题为白天模式
    }
  },
  methods: {
    //兄弟组件NavBar侧边栏展开隐藏
    Collapse() {
      this.flag = !this.flag
      EventBus.$emit("Collapse", this.flag)
    },
    //全屏
    fangdasuoxiao() {
      screenfull.toggle()
      if (screenfull.isEnabled) {
        screenfull.on("change", () => {
          if (screenfull.isEnabled) {
            this.screenfullflag = screenfull.isFullscreen
          }
        })
      }
    },

    //全局黑白主题
    Elswitch() {}
  }
}
</script>

<style lang="scss" scoped>
.siderbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  .left {
    width: 500px;
    display: flex;
    align-items: center;
    color: #fbfcfe;
    span {
      background-color: #84a9fe;
      padding: 7px;
      border-radius: 7px;
      font-size: 12px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: right;
  }
}
</style>
