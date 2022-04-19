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

export function getGoods(goods_id:number){
  return request({
    url:'/api/getgoods',
    method:'GET',
    params:{
      goods_id:goods_id
    }
  })
}