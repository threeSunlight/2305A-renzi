<template>
  <div class="nav-bar">
    <div :class="flag ? 'box1' : 'box2'">
      <img src="../../assets/ihrm.png" alt="" style="width: 80%; height: 80%" />
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#4979fa"
      text-color="#fff"
      active-text-color="#63b9fe"
      :collapse="flag"
      router
    >
      <el-menu-item index="/shouye">
        <i class="el-icon-menu" color="#fff"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/zuzhi">
        <i class="el-icon-menu"></i>
        <span slot="title">组织架构</span>
      </el-menu-item>
      <el-menu-item index="/yuangong">
        <i class="el-icon-menu"></i>
        <span slot="title">员工</span>
      </el-menu-item>
      <el-menu-item index="/gongsishezhi">
        <i class="el-icon-setting"></i>
        <span slot="title">公司设置</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">权限设置</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">社保</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-menu"></i>
        <span slot="title">考勤</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span slot="title">工资</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-menu"></i>
        <span slot="title">审批</span>
      </el-menu-item>
    </el-menu>
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

  methods: {},
  created() {
    EventBus.$on("Collapse", (flag) => {
      this.flag = flag
    })
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  .el-menu-vertical-demo {
    transition: all 0.3s;
  }
  //去除边框
  ::v-deep .el-menu {
    border: 0;
  }

  //导航文字居左
  ::v-deep .el-menu-item {
    display: flex;
    align-items: center;
  }
  //设置图标颜色
  ::v-deep .el-menu-item i {
    color: #fff;
  }
}
.box1 {
  width: 54px;
  height: 30px;
  margin: 10px;
}
.box2 {
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
