// web-bs
const BackHome = () => import('@/web-bs/views/home/index.vue');
const MarkDown = () => import('@/web-bs/views/markDown/index.vue');
const ArticleMgt = () => import('@/web-bs/views/articleMgt/index.vue');

const routes = [
  {
    path: '/backBlog',
    name: 'backBlog',
    component: BackHome,
    meta: {
      title: '',
      isShowSidebar: true,
      isShowHead: true,
      isShowFoot: false,
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
      isShowHead: true,
      isShowFoot: false,
      requiresAuth: true
    }
  },
  {
    path: '/backBlog/articleMgt',
    name: 'articleMgt',
    component: ArticleMgt,
    meta: {
      title: '',
      isShowSidebar: true,
      isShowHead: true,
      isShowFoot: false,
      requiresAuth: true
    }
  }
];

export default routes;
