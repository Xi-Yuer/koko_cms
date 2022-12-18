<script setup lang="ts">
import { delUserById, getAllUser } from '@/service/api/user'
import { Refresh } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'

const allUser = ref([])

interface IRow {
  adress: string | null
  asign: string | null
  avatar: string | null
  birthday: string | null
  gender: number
  id: string
  is_admin: number
  is_vip: number
  name: string | null
  password: string | null
  phone_number: string | null
}

onMounted(() => initData())

const initData = () => {
  getAllUser().then(res => {
    allUser.value = res.data
  })
}

const deleteUserHandle = (row: IRow) => {
  delUserById(row.id).then(res => {
    initData()
  })
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-bold">用户列表</span>
        <el-button
          type="primary"
          plain
          :icon="Refresh"
          circle
          @click="initData"
        />
      </div>
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
          <el-button type="primary" plain disabled
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-popconfirm
            title="确定删除该用户?"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteUserHandle(row)"
          >
            <template #reference>
              <el-button type="danger" plain
                ><el-icon><Delete /></el-icon>删除</el-button
              >
            </template>
          </el-popconfirm>
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
