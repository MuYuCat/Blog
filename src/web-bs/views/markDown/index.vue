<template>
  <div class="md-write">
    <el-crumb :title="data.title" :routes="data.routes"></el-crumb>
    <el-card shadow="always" class="md-write-card">
      <div class="md-write-flex">
        <el-input v-model="data.name" placeholder="请输入文章标题..." class="md-write-name" />
        <el-button plain size="large" class="md-write-btn" @click="publicPaper">发布</el-button>
      </div>
      <Editor
        class="editos"
        :value="data.value"
        :plugins="data.plugins"
        :locale="zhHans"
        @change="writePaper"
        placeholder="请开始天马行空吧～"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Editor } from '@bytemd/vue-next';
// import { Viewer } from '@bytemd/vue-next';
import 'bytemd/dist/index.css'; // bytemd 基础样式
import 'highlight.js/styles/vs.css';
import 'juejin-markdown-themes/dist/juejin.min.css'; // md theme
// import 'juejin-markdown-themes/dist/github.min.css';
// @ts-ignore
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
// @ts-ignore
import mermaidZhHans from '@bytemd/plugin-mermaid/lib/locales/zh_Hans.json';
// @ts-ignore
import mathZhHans from '@bytemd/plugin-math/lib/locales/zh_Hans.json';
// @ts-ignore
import gfmZhHans from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json';
import gfm from '@bytemd/plugin-gfm'; // 超链接、删除线、表格、任务列表
import highlight from '@bytemd/plugin-highlight';
import breaks from '@bytemd/plugin-breaks';
import math from '@bytemd/plugin-math'; // 数学公式
import 'katex/dist/katex.min.css'; // for plugin-math
import footnotes from '@bytemd/plugin-footnotes'; // 头部元信息
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji'; // emoji😊 代码
import mediumZoom from '@bytemd/plugin-medium-zoom';
import mermaid from '@bytemd/plugin-mermaid'; // 图表 / 流程图

import { ElInput, ElButton } from 'element-plus';
import { storeToRefs } from 'pinia';
import { articleAdd } from '@/api/article';
import useUserStore from '@/store/user';
import ElCrumb from '@/web-bs/components/crumb.vue';

const userStore = useUserStore();
const { userName } = storeToRefs(userStore);

const data = reactive({
  plugins: [
    // 将所有的扩展功能放入插件数组中，然后就可以生效了
    highlight(),
    breaks(),
    frontmatter(),
    footnotes(),
    gemoji(),
    mediumZoom(),
    gfm({ locale: gfmZhHans }),
    math({ locale: mathZhHans }),
    mermaid({ locale: mermaidZhHans })
  ],
  name: '',
  value: '',
  routes: [
    { path: '/backBlog', breadcrumbName: '工作台' },
    { path: '/backBlog/articleMgt', breadcrumbName: '内容管理' }
  ],
  title: '撰写文章'
});
async function writePaper(v: any) {
  data.value = v;
}
async function publicPaper() {
  const params = {
    title: data.name,
    author: userName.value,
    content: data.value,
    tags: ''
  };
  const resArticleAdd = await articleAdd(params);
  if (resArticleAdd && (resArticleAdd as any).code === 200) {
    console.log('resArticleAdd', resArticleAdd);
  }
}
</script>

<style lang="scss">
.md-write {
  margin-top: 0px;
  .editos {
    .bytemd {
      height: calc(100vh - 353px) !important; // 改变编辑器默认高度，不需要的可以不配置
      text-align: start;
    }
  }
  .el-input__wrapper {
    outline: none;
    border: none;
    box-shadow: none !important;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  input::placeholder {
    font-size: 26px;
    font-weight: 500;
    color: #606266;
  }
}
</style>
<style scoped lang="scss">
.md-write {
  width: 100%;
  padding: 0px 2% 20px 2%;
  .md-write-card {
    margin-bottom: 16px;
    border-radius: 10px;
    .md-write-flex {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      .md-write-name {
        width: 50%;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
        font-weight: 500;
        color: #1d2129;
        border: none;
        outline: none;
      }
      .md-write-btn {
        width: 100px;
        height: 44px;
      }
    }
  }
}
</style>
