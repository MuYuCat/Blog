/*
 * @Author: MuYuCat
 * @Date: 2022-04-21 15:03:38
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-21 16:33:14
 * @Description: api of login
 */

import request from './request';

// 达人账号管理
const login = (data: any) => {
  return request({
    // url: '/api/users/findAll',
    url: 'http://127.0.0.1:7001/users/login',
    method: 'post',
    data
  });
};

export default login;
