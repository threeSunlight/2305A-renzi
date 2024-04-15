<template>
  <div>
    <el-button type="primary" size="mini" @click="dialogFormVisible = !dialogFormVisible">+ 新增角色</el-button>
    <br />
    <br />
    <el-table :data="tableData" border style="width: 95%" height="400">
      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column prop="name" label="角色名"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template>
          <el-button type="text" size="small">分配权限</el-button>
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="aaa"
      @current-change="aaa"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rolelistApi, addroleApi } from "../api/api"
import { Message } from "element-ui"
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      form: {},
      page: 1,
      pagesize: 10,
      total: 0
    }
  },
  methods: {
    aaa() {
      rolelistApi({ page: this.page, pagesize: this.pagesize }).then((res) => {
        // console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
      })
    },
    addRole() {
      //添加角色
      addroleApi(this.form).then((res) => {
        // console.log(res)
        if (res.code == 10000) {
          Message({
            message: "添加成功",
            type: "success"
          })
          // 添加成功后关闭弹窗
          this.dialogFormVisible = false
          // 添加成功后清空表单
          this.form = {}
          // 添加成功后重新渲染页面
          this.aaa()
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
    this.aaa()
  }
}
</script>
