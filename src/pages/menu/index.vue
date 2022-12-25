<script setup lang="ts">
import {
  getMenuList,
  IResponse,
  createMenu,
  editMenu,
  deleteMenu,
} from '@/service/api/menu/index'
import { IResponseData } from '@/service/api/menu'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm, UploadUserFile } from 'element-plus'
import { rules } from './index'
import { clearObj } from '@/utils/clearobj'

const router = useRouter()
const menuList = ref<IResponseData[]>([])
const formRef = ref<InstanceType<typeof ElForm>>()
const showDiaLog = ref(false)
const isEdit = ref(false)
const file = ref()
const previewFileList = ref<UploadUserFile[]>([])

const limit = ref(1)
const offset = ref(1)
const asc = ref(0)
const count = ref(0)

const query = computed(() => ({
  limit: limit.value,
  offset: (offset.value - 1) * limit.value,
  asc: asc.value,
}))

let form: { [key: string]: string[] | string | null } = reactive({
  menu_name: '',
  price: '',
  discount: '',
  description: '',
  material: '',
  taste: [],
  makein: '',
})

onMounted(() => initData())

const initData = () => {
  getMenuList(query.value).then((res: IResponse) => {
    menuList.value = res.data.map(i => {
      return {
        ...i,
        taste: (i.taste as string).split(','),
      }
    })
    count.value = res.count
  })
}

watch(
  () => query.value,
  () => initData()
)

const editHandle = (row: any) => {
  form = row
  isEdit.value = true
  showDiaLog.value = true
  previewFileList.value = [
    {
      name: '预览图片',
      url: row.picture,
    },
  ]
}
const delRowData = (row: any) => {
  deleteMenu(row.id).then(() => initData())
}

const newClick = () => {
  clearObj(form)
  previewFileList.value = []
  showDiaLog.value = true
  isEdit.value = false
}

const menuConfirm = () => {
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
      const fn = isEdit.value ? editMenu : createMenu
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

const goToBannerPage = (id: string) =>
  router.push({
    name: 'Picture',
    params: { id: id, type: 'menu' },
  })
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <div>
          <span class="font-bold">菜单列表</span>
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
            新建菜单
          </el-button>
        </div>
      </div>
    </template>
    <div class="flex justify-center flex-col items-center">
      <el-table :data="menuList" border style="width: 100%">
        <el-table-column
          fixed
          prop="menu_name"
          label="名称"
          width="150"
        ></el-table-column>
        <el-table-column fixed prop="price" label="价格">
          <template #default="{ row }">
            <span class="text-red-500 font-bold">￥{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed prop="discount" label="折扣">
          <template #default="{ row }">
            <span class="text-yellow-500 font-bold">￥-{{ row.discount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="description"
          label="菜单描述"
          width="200"
        ></el-table-column>
        <el-table-column fixed label="预览" width="200">
          <template #default="{ row }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.picture"
              :preview-src-list="[row.picture]"
              :hide-on-click-modal="true"
              fit="cover"
              :preview-teleported="true"
              lazy
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="makein"
          label="制作方式"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="material"
          label="用料"
          width="150"
        ></el-table-column>
        <el-table-column prop="taste" label="口味" width="150">
          <template #default="{ row }">
            <el-tag v-for="i in row.taste" class="m-1">{{ i }}</el-tag>
          </template>
        </el-table-column>
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
      <el-form-item label="菜单名称" prop="menu_name">
        <el-input v-model="form.menu_name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input
          v-model="form.price"
          type="number"
          placeholder="请输入菜单价格"
        />
      </el-form-item>
      <el-form-item label="折扣" prop="discount">
        <el-input v-model="form.discount" type="number" placeholder="折扣" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="form.description"
          autosize
          type="textarea"
          placeholder="请输入菜单描述"
        />
      </el-form-item>
      <el-form-item label="用料" prop="material">
        <el-input v-model="form.material" placeholder="请输入菜单用料" />
      </el-form-item>
      <el-form-item label="口味" prop="taste" placeholder="请选择口味">
        <el-checkbox-group v-model="form.taste">
          <el-checkbox label="咸">咸</el-checkbox>
          <el-checkbox label="甜">甜</el-checkbox>
          <el-checkbox label="酸">酸</el-checkbox>
          <el-checkbox label="辣">辣</el-checkbox>
          <el-checkbox label="麻">麻</el-checkbox>
          <el-checkbox label="香">香</el-checkbox>
          <el-checkbox label="鲜">鲜</el-checkbox>
          <el-checkbox label="苦">苦</el-checkbox>
          <el-checkbox label="常规">常规</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="制作方式" prop="makein">
        <el-select v-model="form.makein" placeholder="选择制作方式">
          <el-option value="拌" label="拌"></el-option>
          <el-option value="炒" label="炒"></el-option>
          <el-option value="烧" label="烧"></el-option>
          <el-option value="煮" label="煮"></el-option>
          <el-option value="蒸" label="蒸"></el-option>
          <el-option value="炸" label="炸"></el-option>
          <el-option value="煎" label="煎"></el-option>
          <el-option value="其他" label="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片" prop="file">
        <Upload
          v-model:fileResult="file"
          :fileListProps="previewFileList"
          url="/menu/create"
          name="picture"
          :limit="1"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDiaLog = false">取消</el-button>
        <el-button type="primary" @click="menuConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
