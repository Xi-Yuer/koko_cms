<script setup lang="ts">
import Upload from '@/components/upload.vue'
import {
  getBannerList,
  deleteBanner,
  updateBanner,
} from '@/service/api/banner/index'
import { Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

const bannerList = ref()
const uploadRef = ref<InstanceType<typeof Upload>>()
const dialogVisible = ref(false)
const showTitleDialog = ref(false)
const edit = ref()

interface IRow {
  filename: string
  id: string
  imgUrl: string
  mimetype: string
  size: string
  title: string
}

onMounted(() => initData())

const initData = () => {
  getBannerList().then(res => {
    bannerList.value = res.data
  })
}

const uploadHandle = async () => {
  await uploadRef.value?.submitUpload()
  dialogVisible.value = false
  ElMessage({
    message: '上传成功',
    type: 'success',
  })
  initData()
}

const deleteBannerHandle = (row: IRow) => {
  deleteBanner(row.id).then(res => {
    ElMessage({
      message: res.message,
      type: 'success',
    })
    initData()
  })
}

// 修改轮播图标题
const updateTitleHandle = () => {
  updateBanner(edit.value.id, edit.value.title).then(res => {
    initData()
    showTitleDialog.value = false
  })
}

// 打开弹窗
const updateBannerTitle = (row: IRow) => {
  edit.value = row
  showTitleDialog.value = true
}
</script>

<template>
  <div>
    <!-- 轮播图 -->
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-bold">客户端轮播图预览</span>
          <el-button
            :icon="Refresh"
            type="primary"
            plain
            circle
            title="刷新"
            @click="() => initData()"
          />
        </div>
      </template>
      <template v-if="bannerList?.length">
        <el-carousel :interval="3000" type="card">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img
              :src="item.imgUrl"
              alt=""
              class="bg-contain"
              :title="item.title"
            />
          </el-carousel-item>
        </el-carousel>
      </template>
      <template v-else>
        <el-empty description="暂无数据" />
      </template>
    </el-card>
    <!-- 表格 -->
    <el-card class="mt-4">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-bold">图片列表</span>
          <el-button type="primary" @click="dialogVisible = true">
            <el-icon><Plus /></el-icon>
            新建轮播图
          </el-button>
        </div>
      </template>
      <el-table :data="bannerList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="imgUrl" label="图片预览">
          <template #default="{ row }">
            <el-image
              style="width: 100px; height: 60px"
              :src="row.imgUrl"
              :preview-teleported="true"
              :preview-src-list="[row.imgUrl]"
              fit="cover"
            />
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
          <template #default="{ row }">
            <el-button type="primary" plain @click="updateBannerTitle(row)">
              <el-icon><EditPen /></el-icon>
              <span class="text">修改标题</span>
            </el-button>
            <el-popconfirm
              title="确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteBannerHandle(row)"
            >
              <template #reference>
                <el-button type="danger" plain>
                  <el-icon><Delete /></el-icon>
                  <span class="text">删除</span>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹窗 -->

    <el-dialog
      v-model="dialogVisible"
      title="新建"
      width="30%"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="w-full h-full flex justify-center items-center">
        <Upload url="/banners/upload" name="banner" ref="uploadRef" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="uploadHandle"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="showTitleDialog"
      title="修改标题"
      width="30%"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="w-full h-full flex justify-center items-center">
        <el-input v-model="edit.title" placeholder="请输入标题" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showTitleDialog = false">取消</el-button>
          <el-button type="primary" @click="updateTitleHandle">
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
