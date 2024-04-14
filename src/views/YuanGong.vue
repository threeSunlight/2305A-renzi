<template>
  <div class="yuangong">
    <div class="top">
      <el-button type="primary" size="small">员工</el-button>
      <el-button type="primary" size="small">+新增员工</el-button>
    </div>

    <div class="bottom">
      <el-table :data="tableData" border style="width: 98%" height="400px">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="手机号"> </el-table-column>
        <el-table-column prop="workNumber" label="工号"> </el-table-column>
        <el-table-column prop="" label="聘用形势"> </el-table-column>
        <el-table-column prop="departmentName" label="部门"> </el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间"> </el-table-column>
        <el-table-column prop="" label="是否在职"> </el-table-column>
        <el-table-column prop="enableState" label="状态"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="aaa"
        @current-change="aaa"
        :current-page.sync="form.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size.sync="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { userlistApi } from "../api/api"
export default {
  data() {
    return {
      form: {
        size: 5,
        page: 1
      },
      tableData: [],
      total: 0
    }
  },

  methods: {
    aaa() {
      userlistApi(this.form).then((res) => {
        console.log(this.form)
        // console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
      })
    }
  },
  created() {
    this.aaa()
  }
}
</script>

<style lang="scss" scoped>
.yuangong {
  width: 100%;
  .top {
    width: 100%;
    height: 60px;
    background-color: #fff;
    text-align: right;
    line-height: 60px;
    padding-right: 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .bottom {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>
