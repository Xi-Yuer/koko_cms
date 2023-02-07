import { FormRules } from 'element-plus'
import { reactive } from 'vue'

export const rules = reactive<FormRules>({
  product_name: [
    {
      required: true,
      message: '名字不能为空',
      trigger: 'blur',
    },
  ],
  price: [
    {
      required: true,
      message: '价格不能为空',
      trigger: 'blur',
    },
  ],
  old_price: [
    {
      required: false,
    },
  ],
  freight: [
    {
      required: true,
      message: '运费不能为空',
      trigger: 'blur',
    },
  ],
  description: [
    {
      required: true,
      message: '商品描述不能为空',
      trigger: 'blur',
    },
  ],
  product_address: [
    {
      required: true,
      message: '生产不能为空',
      trigger: 'blur',
    },
  ],
  stock: [
    {
      required: true,
      message: '库存不能为空',
      trigger: 'blur',
    },
  ],
  stock_unit: [
    {
      required: true,
      message: '库存单位不能为空',
      trigger: 'blur',
    },
  ],
  publice_status: [
    {
      required: true,
      message: '商品状态不能为空',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: '商品类型不能为空',
      trigger: 'blur',
    },
  ],
})
