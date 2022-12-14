<script setup lang="ts"></script>

<template>
  <div class="flex justify-center items-center flex-col w-full h-full">
    <el-empty description="页面不存在" />
    <el-button type="primary" @click="$router.back()">返回</el-button>
  </div>
</template>

<style scoped lang="less"></style>
