<script setup lang="ts">
import { useUIStore } from '@/store/ui'

const { isCollapse, changeCollapse } = useUIStore()
const changeFold = () => changeCollapse()
</script>

<template>
  <div
    class="w-full h-[50px] shadow flex flex-col justify-center cursor-pointer"
  >
    <div class="icon ml-2" @click="changeFold">
      <el-icon size="large">
        <component :is="!isCollapse ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
