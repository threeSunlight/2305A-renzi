<template>
  <div class="quanxian">
    <p style="background-color: #fff; height: 60px; text-align: right; line-height: 60px">
      <el-button type="primary" size="mini" class="el-icon-edit" @click="flag = true">添加菜单</el-button>&emsp;
    </p>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="菜单名称"> </el-table-column>
      <el-table-column prop="code" label="权限标识"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <div>
            <el-button type="text" size="small">添加权限点</el-button>
            <el-button type="text" size="small">查看api权限</el-button>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑部门" :visible.sync="flag">
      <el-form :model="form">
        <el-form-item label="权限名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" label-width="100px">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" label-width="100px">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业可见" label-width="100px">
          <template>
            <div>
              <el-switch
                v-model="form.enVisible"
                active-text="可见"
                inactive-text="不可见"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="菜单顺序" label-width="100px">
          <el-input v-model="form.menuOrder" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单icon" label-width="100px">
          <el-input v-model="form.menuIcon" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flag = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui"
import { quanxianApi, addquanxianApi } from "../api/api"
export default {
  data() {
    return {
      tableData: [],
      form: {
        type: 1,
        name: "",
        code: "",
        description: "",
        enVisible: 0,
        menuOrder: "",
        menuIcon: ""
      },
      flag: false
    }
  },
  methods: {
    //添加权限菜单
    add() {
      console.log(this.form)
      addquanxianApi(this.form).then((res) => {
        // console.log(res)
        this.flag = false
        if (res.code === 10000) {
          Message({
            message: "添加成功",
            type: "success"
          })
        } else {
          Message({
            message: res.message,
            type: "error"
          })
        }
      })
    }
  },
  created() {
    quanxianApi().then((res) => {
      console.log(res)
      this.tableData = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.quanxian {
  width: 100%;
}
</style>
