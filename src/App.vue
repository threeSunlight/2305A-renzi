<template>
  <div><router-view></router-view></div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
/* nprogress进度条自定义颜色 */
#nprogress .bar {
  background: red !important;
  height: 2px !important;
}
</style>
