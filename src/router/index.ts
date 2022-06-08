import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ErrorRouteConfig from './error';
import WebFsRouteConfig from './web-fs';
import WebBsRouteConfig from './web-bs';

const Demo = () => import('@/web-fs/views/Demo.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demo',
    name: 'demo',
    component: Demo,
    meta: {
      title: '',
      isShowSidebar: false,
      isShowHead: true,
      isShowFoot: false,
      requiresAuth: false
    }
  }
].concat(WebFsRouteConfig, WebBsRouteConfig, ErrorRouteConfig);

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
