<template>
  <div class="login">
    <div class="box">
      <p>iHRM 后台登陆系统</p>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入您的手机号">
            <i slot="prefix" class="el-icon-user-solid"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" show-password placeholder="请输入您的密码">
            <i slot="prefix" class="el-icon-s-goods"></i>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            style="width: 100%; height: 64px; background-color: #407ffe; border: 0; color: #fff; font-size: 18px"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>

      <span>仅用于T培训教学使用，为保障续的个人信息安全，请勿向平台录入任何个人教感信息(如手机,号、身份证号等)!</span>
    </div>
  </div>
</template>

<script>
// 引入api
import { loginApi } from "../../api/api"
import { setCookie } from "../../utils/auth"
export default {
  data() {
    return {
      // 表单数据
      ruleForm: {
        mobile: "13800000002",
        password: "888itcast.CN764%..."
      },
      // 表单验证规则
      rules: {
        mobile: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    }
  },

  methods: {
    // 提交登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用登录接口
          loginApi(this.ruleForm).then((res) => {
            console.log(res)

            if (res.code === 10000) {
              // 登录成功后，将token保存到cookie中
              setCookie(res.data)
              // 跳转到首页
              this.$router.replace("/")
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url(https://ihrm.itheima.net/static/img/login.c75bab6d.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 500px;
    height: 450px;
    p {
      color: #fefeff;
      font-size: 48px;
      text-align: center;
      margin-bottom: 30px;
    }
    ::v-deep .el-input__inner {
      height: 50px;
    }
    ::v-deep .el-input__prefix {
      padding-top: 5px;
    }
    span {
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
