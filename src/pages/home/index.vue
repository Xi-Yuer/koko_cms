<script setup lang="ts">
import { useUIStore } from '@/store/ui'
import { storeToRefs } from 'pinia';
import Main from './components/main.vue'
import Menu from './components/menu.vue'
import Nav from './components/nav.vue'

const { isCollapse } = storeToRefs(useUIStore())
</script>

<template>
  <div class="main">
    <div class="left transition-all duration-500" :style="{ width: !isCollapse ? '210px' : '60px' }">
      <Menu />
    </div>
    <div class="right">
      <Nav />
      <Main />
    </div>
  </div>
</template>

<style scoped lang="less">
.main {
  @apply w-screen h-screen flex overflow-hidden;
  .right {
    flex: 1;
  }
}
</style>
