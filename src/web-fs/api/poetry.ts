import request from './request';

// 诗歌-获取token
const getPoetryToken = () => {
  return request({
    url: '/poetry/token',
    method: 'get'
  });
};

// 诗歌-获取随机诗单
const getPoetrySentence = () => {
  return request({
    url: '/poetry/sentence',
    method: 'get'
  });
};

// 一言-获取随机语句
const getHitokoto = () => {
  return request({
    url: '/hitokoto',
    method: 'get'
  });
};

export { getPoetryToken, getPoetrySentence, getHitokoto };
