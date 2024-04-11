<template>
  <div class="siderbar">
    <div class="left">
      <i :class="flag ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="Collapse"></i>
      &emsp;
      <p>江苏传智播客教育科技股份有限公司</p>
      &emsp;
      <span>体验版</span>
    </div>

    <div class="right">00</div>
  </div>
</template>

<script>
import { EventBus } from "@/eventbus"
export default {
  data() {
    return {
      flag: false
    }
  },
  methods: {
    //兄弟组件NavBar侧边栏展开隐藏
    Collapse() {
      this.flag = !this.flag
      EventBus.$emit("Collapse", this.flag)
    }
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
