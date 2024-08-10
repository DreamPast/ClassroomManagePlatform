<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="0">
    </el-menu-item>
    <el-menu-item index="1">登录</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
// ...

</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
