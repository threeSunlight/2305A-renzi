<template>
  <div class="rili">
    <el-calendar v-model="value" class="calendar"> </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.rili {
  width: 100%;

  ::v-deep .el-calendar-table .el-calendar-day {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::v-deep .el-calendar-table td {
    border: 0;
  }
}
</style>
