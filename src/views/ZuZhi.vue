<template>
  <div class="zuzhi">
    <div class="nav">
      <span>组织结构</span>
    </div>

    <div class="box">
      <div class="title">
        <div class="title-left">{{ obj.companyName }}</div>
        <div class="title-right">
          <span>负责人</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <el-tree :data="arr" node-key="id" default-expand-all :props="{ label: 'name' }">
        <span class="custom-tree-node" slot-scope="{ data }">
          <span class="left">
            <i class="el-icon-s-custom"></i>
            {{ data.name }}
          </span>
          <span class="right">
            <span> {{ data.manager }} </span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" v-if="data.pid == ''">
                <el-dropdown-item :command="{ methods: 'add', id: data.id }">添加子部门</el-dropdown-item>
                <el-dropdown-item :command="data">查看部门</el-dropdown-item>
                <el-dropdown-item :command="{ methods: 'del', id: data.id }">删除部门</el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu slot="dropdown" v-else>
                <el-dropdown-item :command="data">查看部门</el-dropdown-item>
                <el-dropdown-item :command="{ methods: 'del', id: data.id }">删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </span>
      </el-tree>
    </div>

    <!-- 编辑组件 -->
    <bianji v-if="flag" @quxiao="quxiao" :id="id" :detail="detail" @add="add"></bianji>
  </div>
</template>

<script>
//引入api接口
import { zuzhiApi, delbumenApi } from "../api/api"
//引入编辑组件
import bianji from "../components/BianJi.vue"
export default {
  components: { bianji },
  data() {
    return {
      obj: {},
      arr: [],
      flag: false,
      id: "",
      detail: {}
    }
  },
  methods: {
    aaa() {
      zuzhiApi().then((res) => {
        this.arr = []
        this.obj = res.data
        //将公司组织结构加工成为树形结构
        // 1.获取pid为空的数据为父类，加一个children存放子类
        res.data.depts.forEach((item) => {
          if (item.pid == "") {
            this.arr.push({ ...item, children: [] })
          }
        })
        //判断子类pid==父类id加入父类children数组里
        this.arr.forEach((item) => {
          res.data.depts.forEach((ele) => {
            if (ele.pid == item.id) {
              item.children.push(ele)
            }
          })
        })
        // console.log(this.arr)
      })
    },
    //销毁子组件
    quxiao(val) {
      this.flag = val
    },
    handleCommand(command) {
      //添加
      if (command.methods == "add") {
        //显示子组件
        this.flag = true
        //将该行的pid保存
        this.id = command.id
        this.detail = {}
      }
      //删除
      else if (command.methods == "del") {
        if (confirm("确定删除吗")) {
          delbumenApi(command.id).then((res) => {
            if (res.code == 10000) {
              console.log(res)
              alert("删除成功")
              //刷新页面
              this.aaa()
            }
          })
        }
      }
      //编辑部门
      else {
        this.flag = true
        this.detail = command
      }
    },
    add() {
      this.aaa()
      this.flag = false
    }
  },
  created() {
    //获取公司组织结构
    this.aaa()
  }
}
</script>

<style>
.zuzhi {
  width: 100%;
  background-color: #fff;
  padding: 50px;
  box-sizing: border-box;
  .nav {
    border-bottom: 3px solid #e4e7ed;
    color: #409eff;
    padding-bottom: 10px;
    span {
      border-bottom: 3px solid #409eff;
      padding-bottom: 10px;
    }
  }
  .box {
    padding: 0 50px;
    margin-top: 30px;
    .title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      margin-bottom: 10px;

      .title-left {
        font-weight: 900;
      }
      .title-right {
        width: 150px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #000000;
      }
    }

    .custom-tree-node {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .left {
        font-size: 14px;
        color: #000000;
      }
      .right {
        font-size: 14px;
        width: 300px;
        display: flex;
        justify-content: space-between;
        color: #000000;
        > span {
          width: 65%;
          text-align: right;
        }
      }
    }
  }
}
</style>
