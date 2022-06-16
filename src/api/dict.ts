import request from './request';

// 新增tags标签
const addTags = (data?: any) => {
  return request({
    url: '/blog/dict/addTags',
    method: 'post',
    data
  });
};

// get tags标签
const getTags = (data?: any) => {
  return request({
    url: '/blog/dict/getTags',
    method: 'get',
    data
  });
};

// del tags标签
const delTags = (data?: any) => {
  return request({
    url: '/blog/dict/delTags',
    method: 'post',
    data
  });
};

export { addTags, getTags, delTags };
