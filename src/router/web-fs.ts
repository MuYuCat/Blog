// web-fs
const Home = () => import('@/web-fs/views/home/index.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '',
      isShowSidebar: false,
      isShowHead: true,
      isShowFoot: true,
      requiresAuth: false
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: Home,
    meta: {
      title: '',
      isShowSidebar: false,
      isShowHead: true,
      isShowFoot: true,
      requiresAuth: false
    }
  }
];

export default routes;
