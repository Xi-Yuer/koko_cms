<script setup lang="ts">
import areaData from '@/assets/constant/area.json'

import { ref } from 'vue'

const emits = defineEmits(['update:area'])
const value = ref([])

const props = {
  expandTrigger: 'hover',
  value: 'label',
  label: 'label',
}

const handleChange = (value: any) => {
  const result = Object.values(value).join('·')
  emits('update:area', result)
}
</script>

<template>
  <el-cascader
    v-model="value"
    :options="areaData"
    :props="props"
    placeholder="请选择生产地址"
    @change="handleChange"
  />
</template>

<style scoped lang="less"></style>
