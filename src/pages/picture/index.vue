<script setup lang="ts">
import { getBannerList, delBannerById, IDataType } from '@/service/api/picture'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Upload from '@/components/upload.vue'

const router = useRouter()
const route = useRoute()

const { type, id } = route.params
const url = `/${type}/banner`

const dataList = ref<IDataType[]>()
const uploadRef = ref<InstanceType<typeof Upload>>()
const showDialog = ref(false)
const data = ref({
  productId: id,
})

const navBack = () => router.back()

onMounted(() => initData())

const initData = () => {
  getBannerList(type as string, id as string).then(res => {
    dataList.value = res.data
  })
}

const delRowData = (row: IDataType) => {
  delBannerById(type as string, row.id).then(res => initData())
}

// 新建
const menuConfirm = async () => {
  await uploadRef.value?.submitUpload()
  showDialog.value = false
  initData()
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-bold">
          <el-button type="primary" plain @click="navBack">
            <el-icon>
              <Back />
            </el-icon>
            返回
          </el-button>
        </span>
        <span>
          <el-button type="primary" plain @click="initData">
            <el-icon><RefreshLeft /></el-icon>
          </el-button>
          <el-button type="primary" plain @click="showDialog = true">
            <el-icon><Plus /></el-icon>
            新建
          </el-button>
        </span>
      </div>
    </template>
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="menu_id" label="MenuID" />
      <el-table-column label="预览">
        <template #default="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.pic_url"
            :preview-src-list="[row.pic_url]"
            :hide-on-click-modal="true"
            fit="cover"
            :preview-teleported="true"
            lazy
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-popconfirm
            title="你确定要删除么?"
            @confirm="delRowData(row)"
            confirm-button-text="确定"
            cancel-button-text="取消"
          >
            <template #reference>
              <el-button type="danger" plain>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
    v-model="showDialog"
    append-to-body
    :destroy-on-close="true"
    :close-on-click-modal="false"
    width="30%"
  >
    <Upload :url="url" name="banner" :limit="9" ref="uploadRef" :data="data" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="menuConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
