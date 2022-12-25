import { FormRules } from 'element-plus'
import { reactive } from 'vue'

export const rules = reactive<FormRules>({
  menu_name: [
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
  description: [
    {
      required: true,
      message: '商品描述不能为空',
      trigger: 'blur',
    },
  ],
  makein: [
    {
      required: true,
      message: '制作不能为空',
      trigger: 'blur',
    },
  ],
  material: [
    {
      required: true,
      message: '用料不能为空',
      trigger: 'blur',
    },
  ],
})
