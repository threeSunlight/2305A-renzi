<template>
  <div class="shenfen">
    <img src="../assets/头像.jpg" alt="" />
    <div>
      <h3>早安，管理员，祝你开心每一天！</h3>
      <p>{{ data.username }} | {{ data.company }}</p>
    </div>
  </div>
</template>

<script>
//引入接口
import { profileApi } from "../api/api"
export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    //请求用户基本资料
    profileApi().then((res) => {
      this.data = res.data
      console.log(res.data)
    })
  }
}
</script>

<style lang="scss" scoped>
.shenfen {
  width: 100%;
  height: 150px;
  background-color: #fff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  img {
    margin: 0 10px 0 20px;
  }
  p {
    color: #999;
    margin-top: 10px;
  }
}
</style>
