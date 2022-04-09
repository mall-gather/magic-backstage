import {request} from '@/utils/request';

export function getGoodsList(currentPage:number,pageSize:number){
  return request({
    url:'/api/querygoods',
    method:'GET',
    params:{
      currentPage,
      pageSize
    }
  })
}