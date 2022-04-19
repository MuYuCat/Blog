import request from './request';

// 达人账号管理
const findAll = () => {
  return request({
    url: '/api/users/findAll',
    method: 'get'
  });
};

export default findAll;
