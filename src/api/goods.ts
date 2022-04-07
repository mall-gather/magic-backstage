import {request} from '@/utils/request';

export function getGoodsList(){
  return request({
    url:'/api/querygoods',
    method:'GET'
  })
}