<script setup lang="ts">
import { menuList } from '@/config/menuList'
import { useRoute, useRouter } from 'vue-router'
import { computed } from '@vue/reactivity'
import { useUIStore } from '@/store/ui'
import { storeToRefs } from 'pinia'

const router = useRouter()
const { isCollapse } = storeToRefs(useUIStore())

const handleOpen = (key: string, keyPath: string[]) => {
  router.push(key)
}
const handleClose = () => {}

// 获取当前路由的 path
const route = useRoute()
const path = computed(() => route.path)
</script>

<template>
  <div class="h-screen menu" :style="{ width: !isCollapse ? '210px' : '60px' }">
    <div class="font-bold text-lg py-3 flex items-center">
      <img
        src="@/assets/img/turple.png"
        class="w-[25px] h-[25px] bg-contain mx-1"
        alt=""
      />
      <h2 v-if="!isCollapse">龙山生态甲鱼</h2>
    </div>
    <el-menu
      :default-active="path"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      background-color="#001529"
      text-color="#a6bdc3"
      class="el-menu"
      unique-opened
      :collapse-transition="false"
    >
      <template v-for="item in menuList">
        <template v-if="item.children.length">
          <el-sub-menu :index="item.path">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="iten in item.children">
              <el-menu-item :index="iten.path">
                <el-icon>
                  <component :is="iten.icon"></component>
                </el-icon>
                <template #title>
                  <span>{{ iten.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.menu {
  @apply flex items-center flex-col w-full transition-all;
  background-color: #001529;
  color: #a6bdc3;
  white-space: nowrap;
  overflow: hidden;
}
.el-menu {
  @apply flex justify-center flex-col;
  width: 100%;
  border: none;
}
span {
  margin-left: 8px;
}
svg {
  width: 20px;
  height: 20px;
}
.is-active {
  background-color: #0a60bd;
  color: #eee;
}
</style>
