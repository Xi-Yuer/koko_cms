<script setup lang="ts">
import { useUIStore } from '@/store/ui'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { isCollapse } = storeToRefs(useUIStore())
const { changeCollapse } = useUIStore()

const changeFold = () => changeCollapse()

const isFold = computed({
  get: () => (isCollapse.value ? 'Fold' : 'Expand'),
  set: () => ({}),
})
</script>

<template>
  <div
    class="w-full h-[50px] shadow flex flex-col justify-center cursor-pointer px-[15px]"
  >
    <div class="icon ml-2" @click="changeFold">
      <el-icon size="large">
        <component :is="isFold"></component>
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
