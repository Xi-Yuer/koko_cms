<script setup lang="ts"></script>

<template>
  <div class="w-full content">
    <RouterView />
  </div>
</template>

<style scoped lang="less">
.content {
  height: calc(100% - 50px);
}
</style>
