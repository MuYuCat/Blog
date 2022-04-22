/*
 * @Author: MuYuCat
 * @Date: 2022-04-19 11:58:49
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 17:29:12
 * @Description: file content
 */
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from '@/App.vue';

import router from './router/index';
import stroe from './store/index';

createApp(App).use(ElementPlus).use(router).use(stroe).mount('#app');
