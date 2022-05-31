import request from './request';

// baota-获取系统基础统计
const getSystem = (data?: any) => {
  return request({
    url: '/baotaInfo/system?action=GetSystemTotal',
    method: 'post',
    data
  });
};

export default getSystem;
