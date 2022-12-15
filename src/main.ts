import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router/index'

import 'normalize-css'
import 'virtual:windi.css'
import '@/assets/style/index.less'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import directive from '@/utils/format'

const app = createApp(App)
app.use(directive).use(router).use(createPinia()).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
