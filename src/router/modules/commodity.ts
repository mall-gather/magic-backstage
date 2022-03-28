import { RouteRecordRaw } from 'vue-router';

const Layout = () => import('@/layout/index.vue')

const commodity: Array<RouteRecordRaw> = [
  // 商品
  {
    path: '/commodity',
    name: 'commodity',
    component: Layout,
    redirect: '/commodity/productlist',
    children: [
      {
        path: 'productlist',
        name: 'productlist',
        component: () => import('@/views/commodity/productlist/index.vue'),
        meta: {
          title: '商品列表',
          requiresAuth: true
        }
      },
      {
        path: 'addinggoods',
        name: 'addinggoods',
        component: () => import('@/views/commodity/addinggoods/index.vue'),
        meta: {
          title: '添加商品',
          requiresAuth: true
        }
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/commodity/categories/index.vue'),
        meta: {
          title: '商品分类',
          requiresAuth: true
        }
      },
      {
        path: 'producttypes',
        name: 'producttypes',
        component: () => import('@/views/commodity/producttypes/index.vue'),
        meta: {
          title: '商品类型',
          requiresAuth: true
        }
      },
      {
        path: 'brandmanagement',
        name: 'brandmanagement',
        component: () => import('@/views/commodity/brandmanagement/index.vue'),
        meta: {
          title: '品牌管理',
          requiresAuth: true
        }
      }

    ]
  },
]

export default commodity