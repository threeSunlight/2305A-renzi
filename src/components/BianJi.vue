<template>
  <div>
    <el-dialog title="编辑部门" :visible.sync="flag" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="部门名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="部门编码" label-width="100px">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="部门负责人" label-width="100px">
          <el-select v-model="form.manager" placeholder="请选择">
            <el-option v-for="item in list" :key="item.id" :label="item.username" :value="item.username"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门介绍" label-width="100px">
          <el-input v-model="form.introduce" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fuzerenApi, addbumenApi, editbumenApi } from "../api/api"
import { Message } from "element-ui"
export default {
  props: ["detail", "id"],
  data() {
    return {
      flag: true,
      //部门负责人
      list: [],
      //表单数据
      form: this.detail == {} ? {} : this.detail
    }
  },
  methods: {
    //点击取消给父组件传值让父组件销毁该组件
    quxiao() {
      this.$emit("quxiao", false)
    },

    add() {
      //添加
      console.log(this.detail)
      if (!this.detail.id) {
        addbumenApi({ pid: this.id, ...this.form }).then((res) => {
          if (res.code == 10000) {
            Message({
              message: "添加成功",
              type: "success"
            })
            //调用父组件刷新页面并销毁子组件
            this.$emit("add")
          }
        })
      }
      //编辑
      else {
        editbumenApi({ pid: this.id, ...this.form }).then((res) => {
          console.log(res)
          if (res.code == 10000) {
            alert("编辑成功")
            //调用父组件刷新页面并销毁子组件
            this.$emit("add")
          }
        })
      }
    }
  },
  created() {
    //获取部门负责人
    fuzerenApi().then((res) => {
      // console.log(res)
      this.list = res.data
    })
  }
}
</script>

<style></style>
