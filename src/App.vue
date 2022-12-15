<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
</script>
<template>
  <el-config-provider :z-index="3000">
    <suspense>
      <router-view />
    </suspense>
  </el-config-provider>
</template>
