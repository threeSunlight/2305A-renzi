<template>
  <div class="gongzi">
    <div class="top">
      <div class="top-left">
        <el-tag>
          <i class="el-icon-info"></i>
          本月：入职 离职 调薪 未定薪
        </el-tag>
      </div>
      <div class="top-right">设置&emsp;2020 03月报表</div>
    </div>

    <!-- 部门 -->
    <div class="org">
      <!-- 聘用形式 -->
      <div class="statu">
        <div class="statu-left">
          <h4>聘用形式:</h4>
          <el-checkbox v-model="checked">正式</el-checkbox>
          <el-checkbox v-model="checked">非正式</el-checkbox>
        </div>
        <div class="statu-right">
          <h4>员工状态:</h4>
          <el-checkbox v-model="checks">在职</el-checkbox>
          <el-checkbox v-model="checks">离职</el-checkbox>
        </div>
      </div>
      <!-- 部门 -->
      <div class="depts">
        <h4>部门:</h4>
        <div class="check">
          <el-checkbox v-model="checked" v-for="item in OrgList" :key="item.id">{{ item.name }}</el-checkbox>
        </div>
      </div>
    </div>

    <!-- 薪资表格 -->
    <el-table :data="tableData" style="width: 100%" height="400">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="mobile" label="手机" width="200"> </el-table-column>
      <el-table-column prop="workNumber" label="工号"> </el-table-column>
      <el-table-column label="聘用形式"> </el-table-column>
      <el-table-column prop="departmentName" label="部门"> </el-table-column>
      <el-table-column prop="timeOfEntry" label="入职时间"> </el-table-column>
      <el-table-column label="工资基数">
        <template slot-scope="scope">
          {{ scope.row.currentBasicSalary + scope.row.currentPostWage }}
        </template>
      </el-table-column>
      <el-table-column label="津贴方案"> </el-table-column>
      <el-table-column label="操作" width="200px">
        <template>
          <el-button type="primary" size="mini">调薪</el-button>
          <el-button size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="gzuser"
      @current-change="gzuser"
      :current-page.sync="form.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { gongzibumenApi, gongziuserApi } from "../api/api"
import { Message } from "element-ui"
export default {
  data() {
    return {
      checked: false,
      checks: false,
      OrgList: [],
      tableData: [],
      form: { page: 1, pageSize: 10 },
      total: 0
    }
  },
  methods: {
    gzbm() {
      gongzibumenApi().then((res) => {
        // console.log(res)
        if (res.code == 10000) {
          this.OrgList = res.data.depts
        } else {
          Message.error(res.message)
        }
      })
    },
    gzuser() {
      gongziuserApi(this.form).then((res) => {
        console.log(res)
        if (res.code == 10000) {
          this.tableData = res.data.rows
          this.total = res.data.total
        } else {
          Message.error(res.message)
        }
      })
    }
  },
  created() {
    this.gzbm()
    this.gzuser()
  }
}
</script>

<style lang="scss" scoped>
.gongzi {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .org {
    background-color: #fff;
    margin: 20px 0;
    .statu {
      display: flex;
      padding: 10px;
      .statu-left {
        display: flex;
        margin-right: 20px;
        h4 {
          margin: 0 10px;
        }
      }
      .statu-right {
        display: flex;
        h4 {
          margin: 0 10px;
        }
      }
    }
    .depts {
      display: flex;
      padding: 10px;

      h4 {
        margin: 0 10px;
      }
      .check {
        flex: 1;
      }
    }
  }
}
</style>
