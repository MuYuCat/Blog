/*
 * @Author: MuYuCat
 * @Date: 2022-04-19 11:58:49
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 15:02:12
 * @Description: file content
 */
import request from './request';

// 达人账号管理
export const findAll = () => {
  return request({
    // url: '/api/users/findAll',
    url: 'http://127.0.0.1:7001/users/findAll',
    method: 'get'
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    // url: '/api/users/findAll',
    url: 'http://127.0.0.1:7001/users/getUserInfo',
    method: 'get'
  });
};
