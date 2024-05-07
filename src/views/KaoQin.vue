<template>
  <div class="kaoqin">
    <div class="top">
      <p>
        <el-button type="primary" size="mini">导入</el-button>
        &ensp;
        <el-badge is-dot class="item">
          <el-button type="primary" size="mini">提醒</el-button>
        </el-badge>
        &ensp;
        <el-button type="primary" size="mini">设置</el-button>
        <el-button type="primary" size="mini">历史归档</el-button>
        <el-button type="primary" size="mini">3月份报表</el-button>
      </p>
      <div class="bumen">
        <div class="bumen-l"><b>部门：</b></div>
        <div class="bumen-r">
          <el-checkbox-group v-model="deplist">
            <el-checkbox v-for="item in deplist" :key="item.id" :label="item.name"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="status">
        <div class="status-l"><b>考勤状态：</b></div>
        <div class="status-r">
          <el-radio-group v-model="statuslist">
            <el-radio label="正常"></el-radio>
            <el-radio label="矿工"></el-radio>
            <el-radio label="事假"></el-radio>
            <el-radio label="调休"></el-radio>
            <el-radio label="迟到"></el-radio>
            <el-radio label="早退"></el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="workNumber" label="工号"> </el-table-column>
      <el-table-column prop="departmentName" label="部门"> </el-table-column>
      <el-table-column prop="mobile" label="手机"> </el-table-column>
      <el-table-column v-for="item in 31" :label="`3/${item}`" :key="item">
        <template>
          <div>矿工</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="userlist"
      @current-change="userlist"
      :current-page.sync="page.page"
      :page-sizes="[10, 15, 20, 30]"
      :page-size.sync="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { kaoqinbumenApi, kaoqinuserApi } from "../api/api"
import { Message } from "element-ui"

export default {
  data() {
    return {
      deplist: [],
      statuslist: [],
      page: {
        pagesize: 10,
        page: 1
      },
      tableData: [],
      total: 0
    }
  },
  methods: {
    userlist() {
      kaoqinuserApi(this.page).then((res) => {
        // console.log(res)
        if (res.code == 10000) {
          this.tableData = res.data.data.rows
          this.total = res.data.data.total
        } else {
          Message.error(res.message)
        }
      })
    }
  },
  created() {
    kaoqinbumenApi().then((res) => {
      // console.log(res)
      this.deplist = res.data.depts
    })
    this.userlist()
  }
}
</script>

<style lang="scss" scoped>
.kaoqin {
  width: 100%;
  height: 100%;
  .top {
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    margin-bottom: 20px;
    p {
      text-align: right;
    }
    .bumen {
      display: flex;
      line-height: 100%;
      padding: 20px;
      box-sizing: border-box;
      height: 120px;
      .bumen-l {
        width: 10%;
      }
      .bumen-r {
        width: 90%;
        .el-checkbox-group {
          height: 100%;
          display: flex;
          align-content: space-between;
          flex-wrap: wrap;
        }
      }
    }
    .status {
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      .status-l {
        width: 10%;
      }
      .status-r {
        width: 90%;
      }
    }
  }
}
</style>
