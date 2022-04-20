import {request} from '@/utils/request';

// 查询商品列表
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

// 查询商品
export function getGoods(goods_id:number){
  return request({
    url:'/api/getgoods',
    method:'GET',
    params:{
      goods_id:goods_id
    }
  })
}
// 删除商品
export function deleteGoods(article_number:number){
  return request({
    url:'/api/deletegoods',
    method:'DELETE',
    params:{
      article_number:article_number
    }
  })
}
// 添加商品
export function addGoods(data:any){
  return request({
    url:'/api/addgoods',
    method:'POST',
    data
  })
}

// 查询货号是否存在
export function getArticleNumber(article_number:number){
  return request({
    url:'/api/articlenumber',
    method:'GET',
    params:{
      article_number:article_number
    }
  })
}

// 修改商品信息
export function upDataGoods(data:any){
  return request({
    url:'/api/updatagoods',
    method:'PUT',
    data
  })
}