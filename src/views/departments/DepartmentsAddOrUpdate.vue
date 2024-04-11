<template>
  <el-dialog :title="!form.zip ? '新增项目' : '修改项目'" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="日期">
        <el-input v-model="form.date" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-input v-model="form.province" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="市区">
        <el-input v-model="form.city" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    clickSigleTableInfo: {
      requied: true
    }
  },
  data() {
    return {
      form: {},
      dialogFormVisible: true
      // dialogFormVisible: false,
    }
  },
  methods: {
    init(info) {
      if (info.zip) {
        this.form = { ...info }
      }
    }
  }
}
</script>
