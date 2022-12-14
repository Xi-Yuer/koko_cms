<script setup lang="ts">
import { getBannerList } from '@/service/api/banner/index'
import { onMounted, ref } from 'vue'

const bannerList = ref()
const dialogVisible = ref(false)

const title = ref()

onMounted(() => {
  getBannerList().then(res => {
    bannerList.value = res.data
  })
})

const handleClose = () => {}
</script>

<template>
  <div>
    <!-- 轮播图 -->
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-bold">客户端轮播图预览</span>
          <el-button type="primary" @click="dialogVisible = true">
            <el-icon><Plus /></el-icon>
            新建轮播图
          </el-button>
        </div>
      </template>
      <el-carousel :interval="1500" type="card" height="300px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.imgUrl" alt="" class="bg-contain" />
        </el-carousel-item>
      </el-carousel>
    </el-card>
    <!-- 表格 -->
    <el-card class="mt-4">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-bold">图片列表</span>
        </div>
      </template>
      <el-table :data="bannerList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="imgUrl" label="图片预览">
          <template #default="{ row }">
            <img :src="row.imgUrl" />
          </template>
        </el-table-column>
        <el-table-column
          prop="filename"
          label="名称"
          width="300"
          class="overflow-ellipsis whitespace-nowrap"
        />
        <el-table-column prop="mimetype" label="类型" />
        <el-table-column prop="size" label="文件大小(Byte)" />
        <el-table-column prop="title" label="图片标题" />
        <el-table-column label="操作" align="center">
          <el-button type="primary" plain>
            <el-icon><EditPen /></el-icon>
            <span class="text">修改标题</span>
          </el-button>
          <el-button type="danger" plain>
            <el-icon><Delete /></el-icon>
            <span class="text">删除</span>
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="新建"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <span>图片标题</span>
        <el-input v-model="title" placeholder="请输入图片标题" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.text {
  margin-left: 8px;
}
</style>
