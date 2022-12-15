<script setup lang="ts">
import { ref } from 'vue'

import type { UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
import { useUserStore } from '@/store/user'

const props = defineProps<{
  url: String
  name: String
}>()

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const uploadRef = ref<UploadInstance>()

const { token } = useUserStore()

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
// 手动提交上传
const submitUpload = () => {
  uploadRef.value!.submit()
}

defineExpose({ submitUpload })

const baseURL = import.meta.env.VITE_BASE_URL
const actionURL = baseURL + props.url
</script>

<template>
  <el-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :action="actionURL"
    :headers="{ Authorization: token }"
    :auto-upload="false"
    :name="props.name"
    :limit="10"
    :multiple="true"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style scoped lang="less"></style>
