import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconVue from '@element-plus/icons-vue'

import * as echarts from 'echarts';
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import axios from 'axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(VXETable)
app.use(createPinia())
app.use(router)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$echarts = echarts

// 注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconVue)) {
    app.component(key, component);
}

app.mount('#app')
