import { createApp } from 'vue';
import App from '@/App.vue';

import router from './router/index';
import stroe from './store/index';
import './permission';

createApp(App).use(router).use(stroe).mount('#app');
