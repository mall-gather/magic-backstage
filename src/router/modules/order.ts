import { RouteRecordRaw } from 'vue-router';

const Layout = () => import('@/layout/index.vue')

const order: Array<RouteRecordRaw> = [
  // 订单
  {
    path: '/order',
    name: 'order',
    component: Layout,
    redirect: '/order/orderlist',
    children: [
      {
        path: 'orderlist',
        name: 'orderlist',
        component: () => import('@/views/order/orderlist/index.vue'),
        meta: {
          title: '订单列表',
          requiresAuth: true
        }
      },
      {
        path: 'Returnrequestprocessing',
        name: 'Returnrequestprocessing',
        component: () => import('@/views/order/Returnrequestprocessing/index.vue'),
        meta: {
          title: '退货申请处理',
          requiresAuth: true
        }
      },
      {
        path: 'ReturnReasonSettings',
        name: 'ReturnReasonSettings',
        component: () => import('@/views/order/ReturnReasonSettings/index.vue'),
        meta: {
          title: '退货原因设置',
          requiresAuth: true
        }
      }
    ]
  }
]

export default order