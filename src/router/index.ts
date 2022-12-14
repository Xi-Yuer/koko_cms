import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue'),
    children: [
      {
        path: '/banner',
        component: () => import('@/pages/banner/index.vue'),
      },
      {
        path: '/user',
        component: () => import('@/pages/user/index.vue'),
      },
      {
        path: '/order',
        component: () => import('@/pages/order/index.vue'),
      },
      {
        path: '/product',
        component: () => import('@/pages/product/index.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/404/index.vue'),
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
