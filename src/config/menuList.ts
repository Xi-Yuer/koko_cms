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
    path: '/order',
    name: '订单管理',
    icon: 'Tickets',
    children: [],
  },
  {
    path: '/product',
    name: '商品',
    icon: 'Goods',
    children: [],
  },
]
