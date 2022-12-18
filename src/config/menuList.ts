interface IMenu {
  path: string
  name: string
  icon: string
  children: IMenu[]
}

export const menuList: IMenu[] = [
  {
    path: '/banner',
    name: '轮播图',
    icon: 'Picture',
    children: [],
  },
  {
    path: '/user',
    name: '用户管理',
    icon: 'User',
    children: [],
  },
  {
    path: '',
    name: '商品',
    icon: 'Goods',
    children: [
      {
        path: '/product/turtle',
        name: '甲鱼',
        icon: 'Bowl',
        children: [],
      },
      {
        path: '/product/orange',
        name: '砂糖橘',
        icon: 'Grape',
        children: [],
      },
    ],
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'Tickets',
    children: [],
  },
]
