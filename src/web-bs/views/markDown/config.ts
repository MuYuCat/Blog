const routes = [
  { path: '/backBlog', breadcrumbName: '工作台' },
  { path: '/backBlog/articleMgt', breadcrumbName: '内容管理' }
];
const title = '发布文章';
const editRoutes = [
  { path: '/backBlog', breadcrumbName: '工作台' },
  { path: '/backBlog/articleMgt', breadcrumbName: '内容管理' },
  { path: '/backBlog/articleMgt', breadcrumbName: '文章管理' }
];
const editTitle = '编辑文章';

export { routes, title, editRoutes, editTitle };
