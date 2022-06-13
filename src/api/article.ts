import request from './request';

// 新增文章
const addArticle = (data: any) => {
  return request({
    url: '/blog/article/add',
    method: 'post',
    data
  });
};

// 查找文章
const findArticle = (params: any) => {
  return request({
    url: '/blog/article/find',
    method: 'get',
    params
  });
};

// 编辑文章
const editArticle = (params?: any) => {
  return request({
    url: '/blog/article/edit',
    method: 'post',
    params
  });
};

// id查找文章
const findArticleById = (params?: any) => {
  return request({
    url: '/blog/article/findId',
    method: 'get',
    params
  });
};

export { addArticle, findArticle, editArticle, findArticleById };
