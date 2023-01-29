<script setup lang='ts'>
import { onMounted, ref, reactive } from 'vue'
import { getNotify, createNotify, updateNotify, deleteNotify } from '@/service/api/notify';
import { ElForm } from 'element-plus';

const formRef = ref<InstanceType<typeof ElForm>>()
const notify = ref([])
const isLoading = ref(true)
const showDiaLog = ref(false)
const isUpdate = ref(false)

const form = reactive({
  id:'',
  notify:''
})

const initData = () => {
  isLoading.value = true
  getNotify().then(res => {
    const notifyResult = res.data
    notify.value = notifyResult
  }).finally(()=>{
    isLoading.value = false
  })
}

onMounted(() => initData())

const Confirm = () => {
  formRef?.value?.validate(isvalidate => {
    if( isvalidate ){
      if(isUpdate.value){
        updateNotify(form.id, form.notify).then(()=>{
          isUpdate.value = false
          initData()
         })
      }else {
        createNotify(form.notify).then(()=>{
          initData()
        })
      }
    }
  })
  showDiaLog.value = false
}
const create = () => {
  isUpdate.value = false
  form.notify = ''
  form.id = ''
  showDiaLog.value = true
}

const update = (row: any) => {
  isUpdate.value = true
  form.id = row.id
  form.notify = row.notify
  showDiaLog.value = true
}

const del = (row: any) => {
  isLoading.value = true
  deleteNotify(row.id).then(() => {
    initData()
    isLoading.value = false
  })
}

</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class='flex justify-between items-center'>
          <span class='font-bold'>通告</span>
          <span>
            <el-button type='primary' plain icon="Plus" @click='create' :disabled='isLoading'>新增</el-button>
            <el-button type='primary' plain icon="Refresh" circle @click='initData'></el-button>
          </span>
        </div>
      </template>
      <el-table :data='notify' border style="width: 100%" v-loading='isLoading'>
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="notify" label="内容"/>
        <el-table-column label="操作" width='200'>
          <template #default='{row}'>
            <el-button type='primary' plain @click='update(row)'>修改</el-button>
            <el-button type='danger' plain @click='del(row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="showDiaLog"
      width="30%"
      :title="isUpdate ? '修改' : '新增'"
      append-to-body
      draggable
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
    <el-form
        :model="form"
        label-width="120px"
        ref="formRef"
        style="max-width: 460px"
      >
      <el-form-item label="通告内容" prop="notify" required>
          <el-input type="textarea" v-model="form.notify" />
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDiaLog = false">取消</el-button>
          <el-button type="primary" @click="Confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
