/*
 * @Author: MuYuCat
 * @Date: 2022-04-21 15:03:38
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-25 11:50:39
 * @Description: api of login
 */

import request from './request';
import host from '../utils/host';

// 达人账号管理
const login = (data: any) => {
  console.log('host', host);
  return request({
    // url: '/api/users/login',
    url: `${host}/users/login`,
    method: 'post',
    data
  });
};

export default login;
