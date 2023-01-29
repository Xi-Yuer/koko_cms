import { useUIStore } from '@/store/ui'
import { useUserStore } from '@/store/user'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue'),
    children: [
      {
        path:'/notify',
        component: () => import('@/pages/notify/index.vue'),
        meta:{
          path:'/notify',
          name:'通告栏'
        }
      },
      {
        path: '/banner',
        component: () => import('@/pages/banner/index.vue'),
        meta: {
          path: '/banner',
          name: '轮播图',
        },
      },
      {
        path: '/user',
        component: () => import('@/pages/user/index.vue'),
        meta: {
          path: '/user',
          name: '用户管理',
        },
      },
      {
        path: '/order',
        component: () => import('@/pages/order/index.vue'),
        meta: {
          path: '/order',
          name: '订单管理',
        },
      },
      {
        path: '/product/goods',
        component: () => import('@/pages/product/goods/index.vue'),
        meta: {
          path: '/product/goods',
          name: '商品',
        },
      },
      {
        path: '/picture/:id/:type',
        name: 'Picture',
        component: () => import('@/pages/picture/index.vue'),
        meta: {
          path: '/picture',
          name: '图片',
        },
      },
      {
        path: '/menu',
        component: () => import('@/pages/menu/index.vue'),
        meta: {
          path: '/menu',
          name: '菜单',
        },
      },
      {
        path: '/profile',
        component: () => import('@/pages/profile/index.vue'),
        meta: {
          path: '/profile',
          name: '我的资料',
        },
      },
      {
        path: '/suggestion',
        component: () => import('@/pages/suggestion/index.vue'),
        meta: {
          path: '/suggestion',
          name: '建议反馈',
        },
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/404/index.vue'),
        meta: {
          path: '/:pathMatch(.*)*',
          name: '404',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { token } = useUserStore()
  const { addRoute } = useUIStore()
  addRoute(to.meta)
  if (to.path == '/') {
    next('/notify')
  } else {
    if (to.path !== '/login') {
      if (!token) {
        next('/login')
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
