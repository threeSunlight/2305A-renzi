<template>
  <div>
    <el-form ref="form" :model="obj" label-width="80px">
      <el-form-item label="企业名称">
        <el-input v-model="obj.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="obj.companyAddress" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公司电话">
        <el-input v-model="obj.companyPhone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="obj.mailbox" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="obj.remarks" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { companyApi } from "../api/api"
export default {
  data() {
    return {
      obj: {}
    }
  },
  created() {
    companyApi().then((res) => {
      // console.log(res);
      this.obj = res.data
    })
  }
}
</script>

<style lang="scss" scoped></style>
