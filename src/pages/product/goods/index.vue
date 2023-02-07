<script setup lang="ts">
import {
  getProductList,
  createProduct,
  editProduct,
  deleteProduct,
} from '@/service/api/product/index'
import { IResponseData } from '@/service/api/user'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { rules } from './index'
import AreaSelect from '@/components/areaSelect.vue'
import Upload from '@/components/upload.vue'
import { ElForm, UploadUserFile } from 'element-plus'
import { clearObj } from '@/utils/clearobj'

const router = useRouter()
const ProductListData = ref([])
const showDiaLog = ref(false)
const file = ref()
const previewFileList = ref<UploadUserFile[]>([])
const count = ref(0)
const formRef = ref<InstanceType<typeof ElForm>>()
const isEdit = ref(false)

const limit = ref(5)
const offset = ref(1)
const productType = ref(0)
const asc = ref(0)

const query = computed(() => ({
  limit: limit.value,
  offset: (offset.value - 1) * limit.value,
  type: productType.value,
  asc: asc.value,
}))

onMounted(() => initData())

// 初始化数据
const initData = () => {
  const { limit, offset, type, asc } = query.value
  getProductList(limit, offset, asc, type).then((res: IResponseData) => {
    ProductListData.value = res.data
    count.value = res.count as number
  })
}

watch(
  () => query.value,
  () => initData()
)

let form: { [key: string]: string | string[] | number } = reactive({
  product_name: '',
  price: '',
  old_price: '',
  freight: 0,
  description: '',
  product_address: [],
  stock: '',
  stock_unit: 'kg',
  publice_status: '',
  type: '',
})

const producrtConfirm = () => {
  formRef.value?.validate(isvalidate => {
    if (isvalidate) {
      const result = new FormData()
      for (const key in form) {
        if (isEdit.value || key != 'picture') {
          result.append(key, form[key] as string)
        }
      }
      if (file.value) {
        result.append('picture', file.value)
      }
      const fn = isEdit.value ? editProduct : createProduct
      fn(result).then(() => {
        showDiaLog.value = false
        isEdit.value = false
        initData()
      })
    } else {
      return
    }
  })
}

interface IRow {
  id: string
  product_name: string
  price: string
  freight: number
  old_price: string
  description: string
  product_address: string[]
  stock: string
  stock_unit: string
  publice_status: string
  type: string
}
// 删除
const delRowData = (row: IRow) => {
  deleteProduct(row.id).then(() => initData())
}

// 编辑
const editHandle = (row: any) => {
  isEdit.value = true
  previewFileList.value = [
    {
      name: '预览图片',
      url: row.picture,
    },
  ]
  form = row
  showDiaLog.value = true
}

const newClick = () => {
  clearObj(form)
  previewFileList.value = []
  showDiaLog.value = true
  isEdit.value = false
}

const goToBannerPage = (id: string) => {
  router.push({
    name: 'Picture',
    params: { id: id, type: 'product' },
  })
}
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <span class="font-bold">商品列表</span>
            <el-form>
              <el-form-item label="请选择商品类型">
                <el-select v-model="productType" placeholder="商品类型">
                  <el-option label="甲鱼" :value="0" />
                  <el-option label="砂糖橘" :value="1" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="flex justify-center items-center">
            <el-button type="primary" plain @click="initData">
              <el-icon>
                <Refresh />
              </el-icon>
            </el-button>
            <el-button type="primary" plain @click="newClick">
              <el-icon>
                <Plus />
              </el-icon>
              新建商品
            </el-button>
          </div>
        </div>
      </template>
      <!-- 表格 -->
      <div class="flex justify-center flex-col items-center">
        <el-table :data="ProductListData" border style="width: 100%">
          <el-table-column fixed prop="id" label="ID" width="180" />
          <el-table-column fixed prop="product_name" label="名称" width="180" />
          <el-table-column fixed prop="price" label="现价" width="100">
            <template #default="{ row }">
              <span class="text-red-500 font-bold">￥{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="old_price" label="原价" width="100">
            <template #default="{ row }">
              <span class="text-red-500 font-bold line-through"
                >￥{{ row.old_price }}</span
              >
            </template>
          </el-table-column>
          <el-table-column fixed prop="old_price" label="运费" width="100">
            <template #default="{ row }">
              <span class="text-red-500 font-bold"
                >￥{{ row.freight }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="预览" width="200" align="center">
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
          <el-table-column prop="description" label="描述" width="300" />
          <el-table-column prop="publice_status" label="状态">
            <template #default="{ row }">
              <el-button
                v-if="row.publice_status === 1"
                primary
                plain
                type="success"
                size="small"
                >上架</el-button
              >
              <el-button v-else primary plain type="danger" size="small"
                >下架</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="生产地址" width="200">
            <template #default="{ row }">
              <span class="text-sm">{{ row.product_address }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="库存" width="100" />
          <el-table-column prop="sale_count" label="销量" width="100" />
          <el-table-column prop="create_time" label="创建时间" width="180">
            <template #default="{ row }">
              <span v-format class="text-sm">{{ row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="update_time" label="更新时间" width="180">
            <template #default="{ row }">
              <span v-format class="text-sm">{{ row.update_time }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="320">
            <template #default="{ row }">
              <el-button type="primary" plain @click="goToBannerPage(row.id)"
                >轮播图管理</el-button
              >
              <el-button type="primary" plain @click="editHandle(row)"
                >编辑</el-button
              >
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
        <div class="pt-10">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="count"
            v-model:current-page="offset"
            v-model:page-size="limit"
          />
        </div>
      </div>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      v-model="showDiaLog"
      :title="isEdit ? '编辑' : '新建'"
      width="40%"
      append-to-body
      draggable
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        label-width="120px"
        :rules="rules"
        ref="formRef"
        style="max-width: 460px"
      >
        <el-form-item label="商品名称" prop="product_name">
          <el-input v-model="form.product_name" />
        </el-form-item>
        <el-form-item label="原价￥" prop="old_price">
          <el-input v-model="form.old_price" type="number" />
        </el-form-item>
        <el-form-item label="现价￥" prop="price">
          <el-input v-model="form.price" type="number" />
        </el-form-item>
        <el-form-item label="运费￥" prop="price">
          <el-input v-model="form.freight" type="number" />
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input v-model="form.description" autosize type="textarea" />
        </el-form-item>
        <el-form-item label="生产地址" prop="product_address">
          <AreaSelect v-model:area="form.product_address" />
        </el-form-item>
        <div class="flex">
          <el-form-item label="库存" prop="stock">
            <el-input v-model="form.stock" type="number" :min="0" />
          </el-form-item>
          <el-form-item label="库存单位" prop="stock_unit">
            <el-select v-model="form.stock_unit" placeholder="请选择库存单位">
              <el-option value="kg"></el-option>
              <el-option value="件"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="商品状态" prop="publice_status">
          <el-select v-model="form.publice_status" placeholder="状态">
            <el-option :value="1" label="上架">上架</el-option>
            <el-option :value="0" label="下架">下架</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品类型" prop="type">
          <el-select v-model="form.type" placeholder="类型">
            <el-option :value="0" label="甲鱼">甲鱼</el-option>
            <el-option :value="1" label="砂糖橘">砂糖橘</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="file">
          <Upload
            v-model:fileResult="file"
            :fileListProps="previewFileList"
            url="/product/create"
            name="picture"
            :limit="1"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDiaLog = false">取消</el-button>
          <el-button type="primary" @click="producrtConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less"></style>
