import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('UI', () => {
  const isCollapse = ref(false)
  const changeCollapse = () => {
    isCollapse.value = !isCollapse.value
  }
  return {
    isCollapse,
    changeCollapse,
  }
})
