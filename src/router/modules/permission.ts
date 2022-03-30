import { RouteRecordRaw } from 'vue-router';

const Layout = () => import('@/layout/index.vue')

const permission: Array<RouteRecordRaw> = [
  // 订单
  {
    path: '/permission',
    name: 'permission',
    component: Layout,
    redirect: '/permission/userlist',
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/permission/userlist/index.vue'),
        meta: {
          title: '用户列表',
          requiresAuth: true
        }
      },
      {
        path: 'rolelist',
        name: 'rolelist',
        component: () => import('@/views/permission/rolelist/index.vue'),
        meta: {
          title: '角色列表',
          requiresAuth: true
        }
      },
      {
        path: 'menulist',
        name: 'menulist',
        component: () => import('@/views/permission/menulist/index.vue'),
        meta: {
          title: '菜单列表',
          requiresAuth: true
        }
      },
      {
        path: 'listofresources',
        name: 'listofresources',
        component: () => import('@/views/permission/listofresources/index.vue'),
        meta: {
          title: '资源列表',
          requiresAuth: true
        }
      }
    ]
  }
]

export default permission