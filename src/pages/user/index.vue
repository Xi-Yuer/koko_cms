<script setup lang="ts">
import { getAllUser } from '@/service/api/user'
import { onMounted, ref } from 'vue'

const allUser = ref([])

onMounted(() => {
  getAllUser().then(res => {
    allUser.value = res.data
  })
})
</script>

<template>
  <el-card>
    <template #header>
      <span class="font-bold">用户列表</span>
    </template>
    <el-table :data="allUser" border style="width: 100%">
      <el-table-column label="昵称" width="100">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">
            {{ row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="phone_number" label="手机号" width="150" />
      <el-table-column label="性别" width="80">
        <template #default="{ row }">
          <template v-if="row.gender">
            <el-icon color="#409eff"><Female /></el-icon>男
          </template>
          <template v-else>
            <el-icon color="pink"><Male /></el-icon>女
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="asign" label="签名" />
      <el-table-column label="创建日期" width="180">
        <template #default="{ row }">
          <span v-format>{{ row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" width="100">
        <template #default="{ row }">
          <el-tag>
            {{ row.is_admin ? '管理员' : '非管理员' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="会员" width="100">
        <template #default="{ row }">
          <el-tag>
            {{ row.is_vip ? '会员' : '非会员' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="adress" label="地址" />
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <el-button type="primary" plain
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-button type="danger" plain
            ><el-icon><Delete /></el-icon>删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped lang="less">
.cell {
  @apply flex items-center justify-center flex-nowrap;
  i {
    margin-right: 5px;
  }
}
</style>
