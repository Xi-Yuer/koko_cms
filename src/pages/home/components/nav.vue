<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
import { useUIStore } from '@/store/ui'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { isCollapse } = storeToRefs(useUIStore())
const { changeCollapse } = useUIStore()
const { userInfo } = storeToRefs(useUserStore())

const changeFold = () => changeCollapse()

const isFold = computed({
  get: () => (isCollapse.value ? 'Fold' : 'Expand'),
  set: () => ({}),
})
</script>

<template>
  <div class="nav relative">
    <div class="fold">
      <el-icon size="large" @click="changeFold" class="cursor-pointer">
        <component :is="isFold"></component>
      </el-icon>
    </div>
    <div class="breadcrumb">
      <Breadcrumb />
    </div>
    <div
      class="absolute right-[30px] flex items-center justify-center cursor-pointer"
    >
      <span class="mx-4 text-dark-50">{{ userInfo.name }}</span>
      <el-avatar :src="userInfo.avatar" />
    </div>
  </div>
</template>

<style scoped lang="less">
.nav {
  @apply w-full shadow flex items-center px-[15px];
  height: 50px;
}
.fold {
  @apply mx-5 flex items-center justify-center;
}
</style>
