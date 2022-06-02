// web-bs
const BackHome = () => import('@/web-bs/views/home/index.vue');
const MarkDown = () => import('@/web-bs/views/markDown/index.vue');
const articleMgt = () => import('@/web-bs/views/articleMgt/index.vue');

const routes = [
  {
    path: '/backBlog',
    name: 'backBlog',
    component: BackHome,
    meta: {
      title: '',
      isShowSidebar: true,
      requiresAuth: true
    }
  },
  {
    path: '/backBlog/markDown',
    name: 'markDown',
    component: MarkDown,
    meta: {
      title: '',
      isShowSidebar: true,
      requiresAuth: true
    }
  },
  {
    path: '/backBlog/articleMgt',
    name: 'articleMgt',
    component: articleMgt,
    meta: {
      title: '',
      isShowSidebar: true,
      requiresAuth: true
    }
  }
];

export default routes;
