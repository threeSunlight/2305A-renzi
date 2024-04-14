<template>
  <div class="gonggao">
    <h3>公告</h3>

    <div class="content">
      <div>
        <img src="../assets/苹果.jpeg" alt="" />
      </div>
      <div>
        <p><span>朱继柳</span> 发布了 第1期“传智大讲堂”互动讨论获奖名单公布</p>
        <p>2018-07-21 15:21:38</p>
      </div>
    </div>
    <div class="content">
      <div>
        <img src="../assets/苹果.jpeg" alt="" />
      </div>
      <div>
        <p><span>朱继柳</span> 发布了 第1期“传智大讲堂”互动讨论获奖名单公布</p>
        <p>2018-07-21 15:21:38</p>
      </div>
    </div>
    <div class="content">
      <div>
        <img src="../assets/苹果.jpeg" alt="" />
      </div>
      <div>
        <p><span>朱继柳</span> 发布了 第1期“传智大讲堂”互动讨论获奖名单公布</p>
        <p>2018-07-21 15:21:38</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.gonggao {
  width: 100%;
  padding: 40px;
  background: #fff;
  box-sizing: border-box;
  margin-top: 20px;
  h3 {
    border-bottom: 1px solid #cccccc;
    padding-bottom: 20px;
  }
  .content {
    width: 90%;
    margin: auto;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
      margin-top: 10px;
    }
    span {
      color: #97a0f8;
    }
  }
}
</style>
