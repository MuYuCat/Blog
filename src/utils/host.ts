/*
 * @Author: MuYuCat
 * @Date: 2022-04-22 15:54:12
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 17:09:19
 * @Description: file content
 */

const env = 'DEV';
console.log('env:', env);
// 可直接手动切换环境 DEV / PRD

// dev
const devRoute = 'http://127.0.0.1:7001';

// TODO 请务必保障线上配置正确
const prodRoute = '/api';

const outInterface = {
  DEV: devRoute,
  PRD: prodRoute
};

const HOST = outInterface[env];

export default HOST;
