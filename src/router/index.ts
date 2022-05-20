/*
 * @Author: MuYuCat
 * @Date: 2022-04-14 16:37:03
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 10:12:09
 * @Description: file content
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// web-fs
const Demo = () => import('@/web-fs/views/Demo.vue');
const page404 = () => import('@/web-fs/views/404.vue');
const Home = () => import('@/web-fs/views/home/index.vue');
const clickPage = () => import('@/web-fs/views/home/components/clickPage.vue');

// web-bs
const BackHome = () => import('@/web-bs/views/home/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/blog',
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
    path: '/clickPage',
    name: 'clickPage',
    component: clickPage,
    meta: {
      title: ''
    }
  },
  {
    path: '/backBlog',
    name: 'backBlog',
    component: BackHome,
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
