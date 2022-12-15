<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { userInfo } = storeToRefs(useUserStore())
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-bold">我的资料</span>
          <el-button type="primary" plain>
            <el-icon><Edit /></el-icon>
            修改资料
          </el-button>
        </div>
      </template>
      <!-- 资料卡片 -->
      <div>
        <el-descriptions :column="4" size="large" border>
          <el-descriptions-item :span="24">
            <template #label>
              <div class="cell-item">
                <el-icon><CameraFilled /></el-icon>
                头像
              </div>
            </template>
            <el-image
              style="width: 100px; height: 100px"
              :src="userInfo.avatar"
              fit="fill"
            />
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <user />
                </el-icon>
                昵称
              </div>
            </template>
            {{ userInfo.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Female /></el-icon>
                性别
              </div>
            </template>
            {{ userInfo.gender ? '男' : '女' }}</el-descriptions-item
          >
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <iphone />
                </el-icon>
                手机号
              </div>
            </template>
            {{ userInfo.phone_number }}</el-descriptions-item
          >
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><FolderOpened /></el-icon>
                权限
              </div>
            </template>
            <el-tag>
              {{ !userInfo.is_admin ? '非管理员' : '管理员' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Location /></el-icon>
                地址
              </div>
            </template>
            {{ userInfo.adress || '暂无填写' }}</el-descriptions-item
          >
          <el-descriptions-item :span="2">
            <template #label>
              <div class="cell-item">
                <el-icon><Postcard /></el-icon>
                签名
              </div>
            </template>
            {{ userInfo.asign }}</el-descriptions-item
          >
        </el-descriptions>
      </div>
      <!-- 弹窗 -->
    </el-card>
  </div>
</template>

<style scoped lang="less">
.cell-item {
  @apply flex items-center;
  i {
    margin-right: 12px;
  }
}
</style>
