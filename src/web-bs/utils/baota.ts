/* eslint-disable camelcase */
import md5 from 'js-md5';
import Cookies from 'js-cookie';
// import * as BaoTa from 'baota';
import getSystem from '../../api/baota';
import useBaoTaStore from '../../store/baota';

const baoTaStore = useBaoTaStore();
// const BaoTa = require('baota');

// const config = {
//   host: 'http://121.199.160.17:8888', // 请修改成自己宝塔面板地址
//   key: baoTaStore.token // 在 面板设置 里查看
//   // proxy?: 'http://127.0.0.1:9999',    // 代理，如不需代理，请勿填写
// };
// const baota = new BaoTa(config);

// banTa-获取诗歌
const getBaoTaSystem = async () => {
  const api_sk = baoTaStore.token;
  const request_time = `${Date.now()}`;
  const request_token = md5(`${request_time}${md5(api_sk)}`);
  Cookies.set('request_time', request_time);
  Cookies.set('request_token', request_token);
  const params = {
    request_time,
    request_token
  };
  // baota.getSystemTotal((err: any, data: any) => {
  //   // 获取系统基础统计
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(data);
  //   }
  // });
  console.log('getBaoTaSystem params', params);
  await getSystem(params).then((res: any) => {
    console.log(res);
  });
};

export default getBaoTaSystem;
