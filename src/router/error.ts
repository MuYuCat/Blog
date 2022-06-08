/**
 * 错误处理的相关路由
 */
export default [
  // 404
  {
    path: '/404',
    name: '404',
    component: () => import('@/web-fs/views/404.vue'),
    meta: {
      title: '404',
      isShowSidebar: false,
      isShowHead: true,
      isShowFoot: true,
      requiresAuth: false
    }
  }
];
