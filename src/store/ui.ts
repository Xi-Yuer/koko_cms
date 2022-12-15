import { defineStore } from 'pinia'
import { ref } from 'vue'
import { unique } from '@/utils/isSameSet'
import { useRouter } from 'vue-router'
import local from '@/utils/local'

interface IRoute {
  path: string
  name: string
}

interface IUIStore {
  isCollapse: any
  changeCollapse: Function
  routes: any
  addRoute: Function
  delRoute: Function
  delAllRoute: Function
}

export const useUIStore = defineStore('UI', (): IUIStore => {
  // 折叠
  const isCollapse = ref(false)
  // 路由
  const routes = ref<IRoute[]>(local.get('ROUNTES') || [])

  const changeCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  const storageRoutes = () => {
    local.set('ROUNTES', routes.value)
  }

  const addRoute = (route: any) => {
    const temRoutes = routes.value.concat(route)
    const arr = unique(temRoutes)
    routes.value = arr
    storageRoutes()
  }
  const delRoute = (route: any) => {
    routes.value = routes.value.filter((i: any) => i.path !== route.path)
    storageRoutes()
  }
  const delAllRoute = () => {
    routes.value = []
  }
  return {
    isCollapse,
    changeCollapse,
    routes,
    addRoute,
    delRoute,
    delAllRoute,
  }
})
