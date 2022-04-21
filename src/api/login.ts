import { request } from '@/utils/request';
import qs from 'qs';

const md5 = require('md5');

interface T { account: string, password: string }
export function login(data: T): any {
  return request({
    url: '/api/admin/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      account: data.account,
      password: md5(data.password)
    })
  })
}