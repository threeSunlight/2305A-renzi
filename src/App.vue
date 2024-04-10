<template>
  <div id="app"></div>
</template>
<script>
import { setToken } from "./utils/auth"
export default {
  created() {
    const data = {
      mobile: 13800000002,
      password: "hm#qd@23!"
    }
    this.$http.post(this.$http.adUrl("/sys/login"), data).then((res) => {
      setToken(res.data)
    })
  }
}
</script>
<style lang="scss"></style>
