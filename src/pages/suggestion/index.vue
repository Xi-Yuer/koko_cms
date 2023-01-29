<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { getSuggestionList } from '@/service/api/suggestion';

const list = ref([])
const isLoading = ref(false)

const initDate = () => {
    isLoading.value = true
    getSuggestionList().then(res => {
        list.value = res.data
    }).finally(()=>{
        isLoading.value = false
    })
}
onMounted(() => initDate())
</script>

<template>
  <div>
      <el-card>
          <template #header>
              <div class='flex justify-between items-center'>
                  <span class='font-bold'>意见反馈</span>
                  <el-button icon="Refresh" circle type='primary' @click='initDate'></el-button>
              </div>
          </template>
          <el-table :data='list' border style="width: 100%" v-loading='isLoading'>
              <el-table-column prop="id" label="ID" width="180"></el-table-column>
              <el-table-column prop="contact" label="联系方式" width="180"></el-table-column>
              <el-table-column prop="content" label="建议内容"></el-table-column>
              <el-table-column label="创建时间" width="280">
                  <template #default='{row}'>
                    <span v-format>{{ row.create_time }}</span>
                  </template>
              </el-table-column>
          </el-table>
      </el-card>
  </div>
</template>

<style scoped lang="less"></style>
