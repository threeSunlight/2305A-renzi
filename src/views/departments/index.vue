<template>
  <div>
    <el-button @click="addOrUpdate">新增</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120"> </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300"> </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="addOrUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      节约性能消耗
			我控制v-if让页面显示,
			那么弹出就行,
			弹框弹出后,我在弹框上,点击确定和取消按钮,通知父组件,v-if设为false,就会从dom上清空,
			传递参数的时候,获取dom实例,调用子组件方法,传递参数
	 -->
    <DepartmentsAddOrUpdate
      v-if="dialogFormVisible"
      ref="departmentsRef"
      @closeAddOrUpdateDialog="closeAddOrUpdateDialog"
    />
  </div>
</template>

<script>
import DepartmentsAddOrUpdate from "./DepartmentsAddOrUpdate.vue"
export default {
  name: "indexView",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],
      // 控制弹框显隐
      dialogFormVisible: false,
      /**点击表格当前行信息 */
      clickSigleTableInfo: {}
    }
  },
  components: {
    DepartmentsAddOrUpdate
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    /**
     * 新增和修改,弹出弹框
     */
    addOrUpdate(info) {
      console.log(info, "111")
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.departmentsRef.init(info)
      })
    },
    /**
     * 接受子节点传递过来的数据
     */
    closeAddOrUpdateDialog() {
      this.dialogFormVisible = false
    }
  }
}
</script>
