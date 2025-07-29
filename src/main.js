import { createApp } from 'vue'
//import ElementPlus from 'element-plus'
//import 'element-plus/dist/index.css'
//import Icon from './components/icon/index.vue'
import App from './App.vue'
import router from './router'
// 导入http
import request from './utils/request'

// 数据持久化pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
//use(ElementPlus)
createApp(App)
  .use(router)
  .use(pinia)
  .use((app) => {
    app.config.globalProperties.$http = request
  })
  .mount('#app')

