import { createApp } from 'vue';
import App from '@/App.vue';
import router from './router/index';
import stroe from './store/index';

// elementPlus样式
import 'element-plus/dist/index.css';
// 鉴权
import '@/utils/permission';
// 欢迎语
import showText from '@/utils/showLog';
// 获取定位
import '@/utils/map';
// 埋点
import track from '@/utils/track/index';

createApp(App).use(track).use(router).use(stroe).mount('#app');

showText();
