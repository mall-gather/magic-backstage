import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Layout = ()=>import('@/layout/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/home'
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  // 首页
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect:'/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta:{
          title: '首页',
          requiresAuth: true
        }
      }
    ]
  },

  // 商品
  {
    path:'/commodity',
    name:'commodity',
    component: Layout,
    redirect: '/commodity/productlist',
    children:[
      {
        path: 'productlist',
        name: 'productlist',
        component: () => import('@/views/commodity/productlist/index.vue'),
        meta:{
          title: '商品列表',
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
