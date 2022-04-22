import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Demo = () => import('@/views/Demo.vue');
const page404 = () => import('@/views/404.vue');
const Home = () => import('@/views/home/home.vue');
// const clickPage = () => import('@/views/clickPage/clickPage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: Home,
    meta: {
      title: ''
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: Home,
    meta: {
      title: ''
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo,
    meta: {
      title: ''
    }
  },
  {
    path: '/404',
    name: '404',
    component: page404,
    meta: {
      title: ''
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
