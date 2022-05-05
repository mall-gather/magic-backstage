import { request } from '@/utils/request';

interface T {
  [name: string]: any
}

// 查询商品分类列表
export function getCategoryColumnList() {
  return request({
    url: '/api/category',
    method: 'GET'
  })
}

// 添加商品分类
export function addCategory(data: T) {
  return request({
    url: '/api/addcategory',
    method: 'post',
    data
  })
}

// 查询商品分类
export function getCategoryList(currentPage: number, pageSize: number) {
  return request({
    url: '/api/querycategory',
    method: 'get',
    params: {
      currentPage,
      pageSize
    }
  })
}

// 删除商品分类
export function deleteCategory(category_id: number) {
  return request({
    url: '/api/deletecategory',
    method: 'DELETE',
    params: {
      category_id: category_id
    }
  })
}

// id查询商品分类
export function getCategory(category_id: number) {
  return request({
    url: '/api/getcategory',
    method: 'get',
    params: {
      category_id: category_id
    }
  })
}

// 修改商品分类
export function upDataCategory(data: T) {
  return request({
    url: '/api/updatacategory',
    method: 'PUT',
    data
  })
}