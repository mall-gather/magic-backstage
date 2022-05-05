import { request } from '@/utils/request';

interface T {
  [name: string]: any
}

// 订单列表
export function getOrderList(currentPage: number, pageSize: number) {
  return request({
    url: '/api/getorderlist',
    method: 'GET',
    params: {
      currentPage,
      pageSize
    }
  })
}

// 查询订单
export function getOrder(order_id: string) {
  return request({
    url: '/api/getorder',
    method: 'GET',
    params: {
      order_id
    }
  })
}

// 修改收货人信息
export function updataConsigneeInfo(data: T) {
  return request({
    url: '/api/updataconsigneeinfo',
    method: 'put',
    data
  })
}

// 修改费用信息
export function updataCostInfo(data: T) {
  return request({
    url: '/api/updatacostinfo',
    method: 'put',
    data
  })
}

// 订单跟踪
export function getOrderTracking(order_id: string) {
  return request({
    url: '/api/getordertracking',
    method: 'get',
    params: {
      order_id
    }
  })
}

// 订单备注
export function updataOrderRemark(data: T) {
  return request({
    url: '/api/updataorderremark',
    method: 'put',
    data
  })
}

// 删除订单
export function deleteOrder(order_id: string) {
  return request({
    url: '/api/deleteorder',
    method: 'delete',
    params: {
      order_id
    }
  })
}

// 关闭订单
export function updataCloseOrder(order_id: string) {
  return request({
    url: '/api/updatacloseorder',
    method: 'put',
    params: {
      order_id
    }
  })
}

// 查询物流公司
export function getLogisticsCompany() {
  return request({
    url: '/api/getlogisticscompany',
    method: 'get'
  })
}

// 通过id查询物流公司
export function queryLogisticsCompany(company_id:number) {
  return request({
    url: '/api/querylogisticscompany',
    method: 'get',
    params:{
      company_id
    }
  })
}

// 订单发货
export function updataOrderShipped(data:T) {
  return request({
    url: '/api/updataordershipped',
    method: 'put',
    data
  })
}

// 退款原因列表
export function getreturnreason(currentPage: number, pageSize: number) {
  return request({
    url: '/api/getreturnreason',
    method: 'get',
    params: {
      currentPage,
      pageSize
    }
  })
}

// 编辑退货原因
export function updataReason(data:T) {
  return request({
    url: '/api/updatareason',
    method: 'put',
    data
  })
}

// 添加退货原因
export function addReason(data:T) {
  return request({
    url: '/api/addreason',
    method: 'post',
    data
  })
}

// 删除退货原因
export function deleteReason(reason_id:number) {
  return request({
    url: '/api/deletereason',
    method: 'delete',
    params:{
      reason_id
    }
  })
}