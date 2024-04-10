let express = require("express")

// 引入mockjs
let Mock = require("mockjs")
let loginData = require("./common/loginData.json")
let app = express() // 创建一个express实例
// 登录接口
app.use("/sys/login", (req, res) => {
  res.json(Mock.mock(loginData))
})
//设置监听接口
app.listen(8888, () => {
  console.log("监听端口 8888")
})
