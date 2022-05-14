import {request} from '@/utils/request';

export function index(){
  return request({
    url:'/api/admin/index',
    method:'GET'
  })
}

// 订单总数
export function getOrderStatistics(){
  return request({
    url:'/api/getorderstatistics',
    method:'GET'
  })
}