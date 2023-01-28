<script setup lang="ts">
import { deleteOrder, getOrderList, updateOrderStatus } from '@/service/api/order';
import { computed, onMounted, ref, watch } from 'vue';
import { Refresh } from '@element-plus/icons-vue'

const orderList = ref([])
const isLoading = ref(true)
const orderStatus = ref()
const limit = ref(10)
const offset = ref(1)
const count = ref(0)
const options = [
  {
    value: '',
    label: '全部'
  },
  {
    value: 1,
    label: '未支付'
  },
  {
    value: 2,
    label: '已支付'
  },
  {
    value: 3,
    label: '运输中'
  },
  {
    value: 4,
    label: '已签收'
  }
]

const query = computed(() => ({
  orderStatus: orderStatus.value,
  limit: limit.value,
  offset: (offset.value - 1) * limit.value,
}))

const initData = () => {
  const { orderStatus, limit, offset } = query.value
  isLoading.value = true
  getOrderList(orderStatus,limit, offset).then(res => {
    orderList.value = res.data
    count.value = res.count
  }).finally(() => {
    isLoading.value = false
  })
}

// 修改订单状态
const updateOrderStatusHandle = (orderId: string, status: number) => {
  updateOrderStatus(orderId, status).then(() => initData())
}

// 删除订单
const deleteOrderHandle = (orderId: string) => {
  deleteOrder(orderId).then(() => initData())
}

onMounted(() => initData())

watch(
  () => query.value,
  () => initData()
)
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <span class="font-bold">订单列表</span>
            <el-form>
              <el-form-item label="请选择商品类型">
                <el-select v-model="orderStatus" placeholder="订单状态">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-button :icon="Refresh" type="primary" plain title="刷新" @click="() => initData()" />
        </div>
      </template>
      <el-table :data="orderList" border style="width: 100%" v-loading='isLoading'>
        <el-table-column prop='id' label='ID' width='150'></el-table-column>
        <el-table-column label='支付金额' width='120'>
          <template #default='{ row }'>
            <span class='font-bold text-red-500'>￥{{ row.total_price }}</span>
          </template>
        </el-table-column>
        <el-table-column label='状态' width='120' align="center">
          <template #default='{ row }'>
            <span class='font-bold text-gray-500' v-if='row.order_status == 1'>未支付</span>
            <span class='font-bold text-red-500' v-if='row.order_status == 2'>已支付</span>
            <span class='font-bold text-orange-500' v-if='row.order_status == 3'>运输中</span>
            <span class='font-bold text-yellow-500' v-if='row.order_status == 4'>已签收</span>
          </template>
        </el-table-column>
        <el-table-column label='订单详情' width='550'>
          <template #default='{ row }'>
            <el-table :data='row.products' border style="width: 100%">
              <el-table-column prop='count' label='数量' width='80' align="center">
                <template #default='{ row }'>
                  <span class='font-bold text-red-500'>{{ row.count }}{{ row.product.stock_unit }}</span>
                </template>
              </el-table-column>
              <el-table-column prop='product.product_name' label='商品名称'></el-table-column>
              <el-table-column label='图片预览' #default='{ row }'>
                <el-image :src='row.product.picture' style="width: 100px; height: 100px"
                  :preview-src-list="[row.product.picture]" :hide-on-click-modal="true" fit="cover"
                  :preview-teleported="true" lazy>
                </el-image>
              </el-table-column>
              <el-table-column prop='product.price' label='价格' width='100'>
                <template #default='{ row }'>
                  <span class='font-bold text-red-500'>￥{{ row.product.price }}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop='address' label='收货地址' width='280'>
          <template #default='{ row }'>
            <span class='block font-bold'>地址：{{
              row.address ? row.address.cityName + row.address.countyName +
                row.address.detailInfo : ''
            }}</span>
            <span class='block font-bold'>电话：{{ row.address ? row.address.telNumber : '' }}</span>
            <span class='block font-bold'>姓名：{{ row.address ? row.address.userName : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop='create_time' label='支付时间' width='180'>
          <template #default='{ row }'>
            <span v-format>{{ row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label='操作'>
          <template #default='{ row }'>
            <el-button type='danger' plain :disabled="row.order_status !== 4"
              @click='deleteOrderHandle(row.id)'>删除</el-button>
            <el-button type='primary' plain v-if='row.order_status == 2'
              @click='updateOrderStatusHandle(row.id, 3)'>已发货</el-button>
            <el-button type='primary' plain v-if='row.order_status == 3'
              @click='updateOrderStatusHandle(row.id, 4)'>已签收</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pt-10 flex justify-center items-center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="count"
            v-model:current-page="offset"
            v-model:page-size="limit"
          />
        </div>
    </el-card>
  </div>
</template>

<style scoped lang="less">

</style>
