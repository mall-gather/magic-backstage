import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { getToken } from './utils/auth';

const app = createApp(App)

app.use(ElementPlus)

app.use(store).use(router).mount('#app')


router.beforeEach((to,from,next)=>{
  let token = getToken('token')
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    if (token) {
      next({
        path: '/home',
      })
    } else {
      next()
    }
  }
})
