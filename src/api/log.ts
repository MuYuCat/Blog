import request from './request';

// 埋点日志上报
const sendLog = (data: any) => {
  return request({
    url: '/blog/log/send',
    method: 'post',
    data
  });
};

export default sendLog;
