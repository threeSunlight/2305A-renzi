<template>
  <div class="gongsishezhi">
    <div class="top">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">角色管理</el-menu-item>
        <el-menu-item index="2">公司信息</el-menu-item>
      </el-menu>
    </div>

    <div class="bottom">
      <UserManage v-if="activeIndex == 1"></UserManage>
      <CorpInfo v-else></CorpInfo>
    </div>
  </div>
</template>

<script>
import UserManage from "../components/UserManage"
import CorpInfo from "../components/CorpInfo"
export default {
  components: {
    UserManage,
    CorpInfo
  },
  data() {
    return {
      activeIndex: "1"
    }
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key
    }
  }
}
</script>

<style lang="scss" scoped>
.gongsishezhi {
  width: 100%;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  .bottom {
    padding: 30px;
    box-sizing: border-box;
  }
}
</style>
