interface IMenu {
  path: string
  name: string
  icon: string
  children: IMenu[]
}

export const menuList: IMenu[] = [
  {
    path: '/notify',
    name: '通告栏',
    icon: 'Bell',
    children: [],
  },
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
    path: '/product/goods',
    name: '商品',
    icon: 'Goods',
    children: [],
  },
  {
    path: '/menu',
    name: '菜单',
    icon: 'Menu',
    children: [],
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'Tickets',
    children: [],
  },
  {
    path:'/suggestion',
    name:'建议反馈',
    icon:'Edit',
    children:[]
  }
]
