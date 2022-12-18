<script setup lang="ts">
import { getProductList, createProduct } from '@/service/api/product/index'
import { IResponseData } from '@/service/api/user'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, computed } from 'vue'
import AreaSelect from '@/components/areaSelect.vue'
import Upload from '@/components/upload.vue'

const ProductListData = ref([])
const showDiaLog = ref(false)

onMounted(() => initData())

// 初始化数据
const initData = () => {
  getProductList(100, 0, 0, 0).then((res: IResponseData) => {
    ProductListData.value = res.data
  })
}
const form: { [key: string]: any } = reactive({
  product_name: '',
  price: '',
  old_price: '',
  description: '',
  product_address: '',
  stock: '',
  stock_unit: 'kg',
  publice_status: '',
  type: '',
})

const file = ref()

const hidenUpload = computed(() => 'none')

const producrtEdit = () => {
  const result = new FormData()
  for (const key in form) {
    result.append(key, form[key])
  }
  result.append('picture', file.value)
  createProduct(result).then(res => {
    showDiaLog.value = false
  })
}
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-bold">商品列表</span>
          <div>
            <el-button type="primary" plain @click="initData">
              <el-icon>
                <Refresh />
              </el-icon>
            </el-button>
            <el-button type="primary" plain @click="() => (showDiaLog = true)">
              <el-icon>
                <Plus />
              </el-icon>
              新建商品
            </el-button>
          </div>
        </div>
      </template>
      <!-- 表格 -->
      <el-table :data="ProductListData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" fixed />
        <el-table-column prop="product_name" label="名称" width="180" fixed />
        <el-table-column prop="price" label="现价" width="100" fixed>
          <template #default="{ row }">
            <span class="text-red-500 font-bold">￥{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="old_price" label="原价" width="100">
          <template #default="{ row }">
            <span class="text-red-500 font-bold line-through"
              >￥{{ row.old_price }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="预览">
          <template #default="{ row }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.picture"
              :preview-src-list="[row.picture]"
              :hide-on-click-modal="true"
              fit="cover"
              :preview-teleported="true"
              lazy
            />
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="product_address" label="生产地址" />
        <el-table-column prop="stock" label="库存" width="100" />
        <el-table-column prop="sale_count" label="销量" width="100" />
        <el-table-column prop="create_time" label="创建时间">
          <template #default="{ row }">
            <span v-format>{{ row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间">
          <template #default="{ row }">
            <span v-format>{{ row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" plain>编辑</el-button>
            <el-button type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      v-model="showDiaLog"
      title="新建"
      width="40%"
      destroy-on-close
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-width="120px" style="max-width: 460px">
        <el-form-item label="商品名称">
          <el-input v-model="form.product_name" />
        </el-form-item>
        <el-form-item label="原价￥">
          <el-input v-model="form.old_price" />
        </el-form-item>
        <el-form-item label="现价￥">
          <el-input v-model="form.price" />
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.description" autosize type="textarea" />
        </el-form-item>
        <el-form-item label="生产地址">
          <AreaSelect v-model:area="form.product_address" />
        </el-form-item>
        <div class="flex">
          <el-form-item label="库存">
            <el-input v-model="form.stock" type="number" :min="0" />
          </el-form-item>
          <el-form-item label="库存单位">
            <el-select v-model="form.stock_unit" placeholder="请选择库存单位">
              <el-option value="kg"></el-option>
              <el-option value="件"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="商品状态">
          <el-select v-model="form.publice_status" placeholder="状态">
            <el-option value="1" label="上架">上架</el-option>
            <el-option value="0" label="下架">下架</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="form.type" placeholder="类型">
            <el-option value="0" label="甲鱼">甲鱼</el-option>
            <el-option value="1" label="砂糖橘">砂糖橘</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <Upload
            v-model:fileResult="file"
            url="/product/create"
            name="picture"
            :limit="1"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDiaLog = false">取消</el-button>
          <el-button type="primary" @click="producrtEdit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.el-upload--picture-card {
  display: v-bind(hidenUpload);
}
</style>
