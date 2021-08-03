import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 normalize 重置样式
import 'normalize.css'
// 引入公共样式
import '@/assets/styles/common.less'

createApp(App).use(store).use(router).mount('#app')
