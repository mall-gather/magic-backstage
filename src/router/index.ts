import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import home from './modules/home';
import commodity from './modules/commodity';
import order from './modules/order';
import marketing from './modules/marketing';
import permission from './modules/permission';

// const Layout = ()=>import('@/layout/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const constantRoutes: Array<RouteRecordRaw> = routes.concat(home).concat(commodity).concat(order).concat(marketing).concat(permission)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

export default router
