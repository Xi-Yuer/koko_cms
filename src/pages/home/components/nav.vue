<script setup lang="ts">
import Breadcrumb from '@/components/breadcrumb.vue'
import { Action, ElMessage, ElMessageBox } from 'element-plus'
import { useUIStore } from '@/store/ui'
import { useUserStore } from '@/store/user'
import local from '@/utils/local'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { isCollapse } = storeToRefs(useUIStore())
const { changeCollapse } = useUIStore()
const { userInfo } = storeToRefs(useUserStore())
const router = useRouter()

const changeFold = () => changeCollapse()

const isFold = computed({
  get: () => (isCollapse.value ? 'Fold' : 'Expand'),
  set: () => ({}),
})

type ICommand = 'update' | 'logout'

const handleCommand = (command: ICommand) => {
  if (command == 'logout') {
    ElMessageBox.confirm('确定要退出登录么', '退出', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      local.clear()
      router.push('/login')
    })
  } else {
    router.push('/profile')
  }
}
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
      <el-dropdown @command="handleCommand">
        <div class="flex justify-center items-center">
          <span class="text-dark-50 font-bold">{{ userInfo.name }}</span>
          <span class="mr-4 text-gray-400 text-sm">
            ({{ userInfo.phone_number }})
          </span>
          <el-avatar :src="userInfo.avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="update">修改资料</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
