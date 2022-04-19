import request from './request';

// 达人账号管理
const findAll = () => {
  return request({
    url: 'http://127.0.0.1:7001/users/findAll',
    method: 'get'
  });
};

export default { findAll };
