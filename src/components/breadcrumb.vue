<script setup lang="ts">
import { useUIStore } from '@/store/ui'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { routes } = storeToRefs(useUIStore())
const { delRoute } = useUIStore()

const currentRoutePath = computed(() => route.path)

const isCur = (path: string) =>
  currentRoutePath.value === path ? 'dark' : 'plain'
interface ITag {
  path: string
  name: string
}
const close = (tag: ITag) => {
  delRoute(tag)
  const nextPath =
    routes.value[routes.value.length - 1]?.path ??
    routes.value[routes.value.length + 1]?.path
  if (nextPath) {
    router.push(nextPath)
  } else {
    router.push('/notify')
  }
}

const handleTagItemClcik = (tag: ITag) => {
  router.push(tag.path)
}
</script>

<template>
  <el-tag
    v-for="tag in routes"
    :key="tag.name"
    class="mx-1 cursor-pointer"
    closable
    size="large"
    :effect="isCur(tag.path)"
    @close="close(tag)"
    @click="handleTagItemClcik(tag)"
  >
    {{ tag.name }}
  </el-tag>
</template>

<style scoped lang="less"></style>
