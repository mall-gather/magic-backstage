import { RouteRecordRaw } from 'vue-router';

const Layout = () => import('@/layout/index.vue')

const home: Array<RouteRecordRaw> = [
  // 首页
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          requiresAuth: true
        }
      }
    ]
  },
]

export default home