/*
 * @Author: MuYuCat
 * @Date: 2022-04-19 11:58:49
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 14:44:44
 * @Description: file content
 */
import { createApp } from 'vue';
import App from '@/App.vue';

import router from './router/index';
import stroe from './store/index';

createApp(App).use(router).use(stroe).mount('#app');
