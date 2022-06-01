import request from './request';

// 账号管理
const login = (data: any) => {
  return request({
    // url: '/api/users/login',
    url: '/blog/users/login',
    method: 'post',
    data
  });
};

// 达人账号管理
const getInfo = () => {
  return request({
    url: '/blog/users/getUserInfo',
    method: 'get'
  });
};

export { login, getInfo };
