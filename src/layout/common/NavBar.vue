<template>
  <div class="nav-bar">
    <div :class="flag ? 'box1' : 'box2'">
      <img src="../../assets/ihrm.png" alt="" style="width: 80%; height: 80%" />
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      text-color="#fff"
      background-color="#4a7afb"
      active-text-color="#63b9fe"
      :collapse="flag"
      router
    >
      <el-menu-item v-for="item in mentList"  :index="item.path">
        <i :class="item.meta.icon" color="#fff"></i>
        <span slot="title">{{item.meta.title  }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { EventBus } from "@/eventbus"

export default {
  data() {
    return {
      flag: false,
			mentList: []
    }
  },

  methods: {},
  created() {
		console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
		this.mentList = JSON.parse(sessionStorage.getItem('resultMenulits'))
		console.log(this.mentList)
		console.log("&&&&&&&&&&&&&&&&&&&&&&&&");

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
