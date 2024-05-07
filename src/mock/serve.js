// 启动node,用express启动node
/**
 * 使用express搭建node服务
 * 1. 引入express
 * 2. 实例化express
 * 3. 启动监听接口
 * 4. 引入mock数据,编写接口,返回数据值
 *
 *
 */
/**第一步: 引入express */
let express = require("express")
//实例化express
let app = express()

/**引入mockjs */
let Mock = require("mockjs")

/**编写接口 */

//登录
let LoginData = require("./common/LoginDate.json")
app.use("/sys/login", function (req, res) {
  res.json(Mock.mock(LoginData))
})

//获取用户基本资料
let ProfileInfo = require("./common/ProfileInfo.json")
app.use("/sys/profile", function (req, res) {
  res.json(Mock.mock(ProfileInfo))
})

//获取公司组织结构
let ZuZhi = require("./common/ZuZhi.json")
app.use("/company/department", function (req, res) {
  res.json(Mock.mock(ZuZhi))
})

//获取部门负责人
let FuzeRen = require("./common/FuzeRen.json")
app.use("/sys/user/simple", function (req, res) {
  res.json(Mock.mock(FuzeRen))
})

/**第三步: 设置监听接口*/
app.listen("8090", () => {
  console.log("监听端口 8090")
})
