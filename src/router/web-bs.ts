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
      title: '工作台',
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
      title: '文章管理',
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
      title: '发布文章',
      isShowSidebar: true,
      isShowHead: true,
      isShowFoot: false,
      requiresAuth: true
    }
  },
  {
    path: '/backBlog/articleEdit',
    name: 'articleEdit',
    component: MarkDown,
    meta: {
      path: '/backBlog/articleMgt',
      title: '编辑文章',
      isShowSidebar: true,
      isShowHead: true,
      isShowFoot: false,
      requiresAuth: true
    }
  }
];

export default routes;
