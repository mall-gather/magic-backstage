import { RouteRecordRaw } from 'vue-router';

const Layout = () => import('@/layout/index.vue')

const marketing: Array<RouteRecordRaw> = [
  // 订单
  {
    path: '/marketing',
    name: 'marketing',
    component: Layout,
    redirect: '/marketing/listofseckillactivities',
    children: [
      {
        path: 'listofseckillactivities',
        name: 'listofseckillactivities',
        component: () => import('@/views/marketing/listofseckillactivities/index.vue'),
        meta: {
          title: '秒杀活动列表',
          requiresAuth: true
        }
      },
      {
        path: 'listofcoupons',
        name: 'listofcoupons',
        component: () => import('@/views/marketing/listofcoupons/index.vue'),
        meta: {
          title: '优惠券列表',
          requiresAuth: true
        }
      },
      {
        path: 'brandrecommendation',
        name: 'brandrecommendation',
        component: () => import('@/views/marketing/brandrecommendation/index.vue'),
        meta: {
          title: '品牌推荐',
          requiresAuth: true
        }
      },
      {
        path: 'newproduct',
        name: 'newproduct',
        component: () => import('@/views/marketing/newproduct/index.vue'),
        meta: {
          title: '新品推荐',
          requiresAuth: true
        }
      },
      {
        path: 'popularrecommendation',
        name: 'popularrecommendation',
        component: () => import('@/views/marketing/popularrecommendation/index.vue'),
        meta: {
          title: '人气推荐',
          requiresAuth: true
        }
      },
      {
        path: 'recommendedtopics',
        name: 'recommendedtopics',
        component: () => import('@/views/marketing/recommendedtopics/index.vue'),
        meta: {
          title: '专题推荐',
          requiresAuth: true
        }
      },
      {
        path: 'adlist',
        name: 'adlist',
        component: () => import('@/views/marketing/adlist/index.vue'),
        meta: {
          title: '广告列表',
          requiresAuth: true
        }
      }
    ]
  }
]

export default marketing