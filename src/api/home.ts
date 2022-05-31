/*
 * @Author: MuYuCat
 * @Date: 2022-04-19 11:58:49
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-25 13:11:21
 * @Description: file content
 */
import request from './request';
import host from '../web-fs/utils/host';

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

// 面板BaoTa
export const getWeatherInfo = () => {
  return request({
    url: '/weather/WeatherApi?city=南京市',
    // url: '/baoTa/system?action=GetSystemTotal',
    method: 'get'
  });
};
