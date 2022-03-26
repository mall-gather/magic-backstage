import { request } from '../utils/request';
import qs from 'qs';

export function login(data:any):any{
  return request({
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data:qs.stringify(data)
  })
}