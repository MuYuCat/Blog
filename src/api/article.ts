import request from './request';

// 新增文章
const articleAdd = (data: any) => {
  return request({
    url: '/blog/article/add',
    method: 'post',
    data
  });
};

// 查找文章
const articleFindAll = () => {
  return request({
    url: '/blog/article/findAll',
    method: 'get'
  });
};

export { articleAdd, articleFindAll };
