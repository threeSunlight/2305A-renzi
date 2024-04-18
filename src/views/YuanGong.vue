<template>
  <div class="yuangong">
    <div class="top">
      <el-button type="primary" size="small" @click="outExcel">导出</el-button>
      <el-button type="primary" size="small" @click="add">+新增员工</el-button>
    </div>

    <div class="bottom">
      <el-table :data="tableData" border style="width: 98%" height="400px">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="手机号"> </el-table-column>
        <el-table-column prop="workNumber" label="工号"> </el-table-column>
        <el-table-column prop="formOfEmployment" label="聘用形势"> </el-table-column>
        <el-table-column prop="departmentName" label="部门"> </el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间"> </el-table-column>
        <el-table-column prop="inServiceStatus" label="是否在职"> </el-table-column>
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
//导出
import { xlsx } from "../utils/xlsx"
import { Message } from "element-ui"

export default {
  data() {
    return {
      form: {
        size: 5,
        page: 1
      },
      tableData: [],
      total: 0,
      listHander: {
        username: "姓名",
        mobile: "手机号",
        workNumber: "工号",
        formOfEmployment: "聘用形式",
        departmentName: "部门",
        timeOfEntry: "入职时间",
        inServiceStatus: "是否在职",
        enableState: "状态"
      }
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
    },
    //导出
    outExcel() {
      // this.tableData是要导出的数据内容（表格里的内容），
      // this.listHander对应要导出内容的表头
      // 员工信息：指向的是excel文件名
      xlsx(this.tableData, this.listHander, "员工信息")
    },

    //新增员工
    add() {
      Message({
        message: "演示系统，暂不支持该操作",
        type: "error"
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
