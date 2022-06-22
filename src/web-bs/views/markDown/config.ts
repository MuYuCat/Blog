import { StaticTextDefaultValue } from 'md-editor-v3';

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

export const language: { 'my-lang': StaticTextDefaultValue } = {
  'my-lang': {
    toolbarTips: {
      bold: '加粗',
      underline: '下划线',
      italic: '斜体',
      strikeThrough: '删除线',
      title: '标题',
      sub: '下标',
      sup: '上标',
      quote: '引用',
      unorderedList: '无序列表',
      orderedList: '有序列表',
      codeRow: '行内代码',
      code: '块级代码',
      link: '链接',
      image: '图片',
      table: '表格',
      mermaid: 'mermaid图',
      katex: '公式',
      revoke: '后退',
      next: '前进',
      save: '保存',
      prettier: '美化',
      pageFullscreen: '浏览器全屏',
      fullscreen: '屏幕全屏',
      preview: '预览',
      htmlPreview: 'html代码预览',
      catalog: '目录',
      github: '源码地址'
    },
    titleItem: {
      h1: '一级标题',
      h2: '二级标题',
      h3: '三级标题',
      h4: '四级标题',
      h5: '五级标题',
      h6: '六级标题'
    },
    imgTitleItem: {
      link: '添加链接',
      upload: '上传图片',
      clip2upload: '裁剪上传'
    },
    linkModalTips: {
      title: '添加',
      descLable: '链接描述：',
      descLablePlaceHolder: '请输入描述...',
      urlLable: '链接地址：',
      UrlLablePlaceHolder: '请输入链接...',
      buttonOK: '确定'
    },
    clipModalTips: {
      title: '裁剪图片上传',
      buttonUpload: '上传'
    },
    copyCode: {
      text: '复制代码',
      successTips: '已复制！',
      failTips: '复制失败！'
    },
    mermaid: {
      flow: '流程图',
      sequence: '时序图',
      gantt: '甘特图',
      class: '类图',
      state: '状态图',
      pie: '饼图',
      relationship: '关系图',
      journey: '旅程图'
    },
    katex: {
      inline: '行内公式',
      block: '块级公式'
    },
    footer: {
      markdownTotal: '字数',
      scrollAuto: '同步滚动'
    }
  }
};
