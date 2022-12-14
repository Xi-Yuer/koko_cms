<script setup lang="ts">
import { useUIStore } from '@/store/ui'
import { storeToRefs } from 'pinia'
const { isCollapse } = storeToRefs(useUIStore())
</script>

<template>
  <div
    class="w-full content"
    :style="{ width: !isCollapse ? 'calc(100vw - 210px)' : 'calc(100vw - 60px)' }"
  >
    <RouterView />
  </div>
</template>

<style scoped lang="less">
.content {
  height: calc(100% - 50px);
  padding: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
