import { useUIStore } from '@/store/ui'
import { useUserStore } from '@/store/user'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue'),
    children: [
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
        path: '/product/turtle',
        component: () => import('@/pages/product/turtle/index.vue'),
        meta: {
          path: '/product/turtle',
          name: '甲鱼',
        },
      },
      {
        path: '/product/orange',
        component: () => import('@/pages/product/orange/index.vue'),
        meta: {
          path: '/product/orange',
          name: '砂糖橘',
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
    next('/banner')
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
