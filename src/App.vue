<template>
  <div id="app"></div>
</template>
<script>
import http from "./utils/httpRequest"
import { setToken } from "./utils/auth"
export default {
  created() {
    const data = {
      mobile: 13800000002,
      password: "888itcast.CN764%...."
    }
    http.post("/api/sys/login", data).then((res) => {
      console.log(res, "*****")
      setToken(res.data)
    })
  }
}
</script>
<style lang="scss"></style>
