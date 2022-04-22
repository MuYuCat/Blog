/*
 * @Author: MuYuCat
 * @Date: 2022-04-19 11:58:49
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 16:06:02
 * @Description: file content
 */
import request from './request';
import host from '../utils/host';

// 达人账号管理
export const findAll = () => {
  return request({
    // url: '/api/users/findAll',
    url: `${host}/users/findAll`,
    method: 'get'
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    // url: '/api/users/getUserInfo',
    url: `${host}/users/getUserInfo`,
    method: 'get'
  });
};
