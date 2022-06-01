// web-fs
const Home = () => import('@/web-fs/views/home/index.vue');
const ClickPage = () => import('@/web-fs/views/home/components/clickPage.vue');

const routes = [
  {
    path: '/',
    name: '/blog',
    component: Home,
    meta: {
      title: '',
      isShowSidebar: false,
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
      requiresAuth: false
    }
  },
  {
    path: '/blog/clickPage',
    name: 'clickPage',
    component: ClickPage,
    meta: {
      title: '',
      isShowSidebar: false,
      requiresAuth: false
    }
  }
];

export default routes;
