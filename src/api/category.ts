import {request} from '@/utils/request';

export function getCategoryColumnList(){
  return request({
    url:'/api/category',
    method:'GET'
  })
}