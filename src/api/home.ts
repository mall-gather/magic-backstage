import {request} from '@/utils/request';

export function index(){
  return request({
    url:'/api/admin/index',
    method:'GET'
  })
}