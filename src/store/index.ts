/*
 * @Author: MuYuCat
 * @Date: 2022-04-22 17:43:10
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 14:37:09
 * @Description: file content
 */

import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';

const store = createPinia();
store.use(piniaPluginPersist);

export default store;
