<template>
  <div class="md-view">
    <el-crumb :title="data.title" :routes="data.routes"></el-crumb>
    <el-card shadow="always" class="md-view-card">
      <div class="md-view-flex">
        {{ data.name }}
      </div>
      <Viewer :value="data.value" :plugins="data.plugins" class="viewer" :locale="zhHans" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { Viewer } from '@bytemd/vue-next';
import 'bytemd/dist/index.css'; // bytemd 基础样式
import 'juejin-markdown-themes/dist/juejin.min.css'; // md theme
// import 'juejin-markdown-themes/dist/github.min.css';
import 'highlight.js/styles/vs.css';
// @ts-ignore
import zhHans from 'bytemd/lib/locales/zh_Hans.json';
// // @ts-ignore
// import mermaidZhHans from '@bytemd/plugin-mermaid/lib/locales/zh_Hans.json';
// // @ts-ignore
// import mathZhHans from '@bytemd/plugin-math/lib/locales/zh_Hans.json';
// // @ts-ignore
// import gfmZhHans from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json';
import gfm from '@bytemd/plugin-gfm'; // 超链接、删除线、表格、任务列表
import highlight from '@bytemd/plugin-highlight';
import breaks from '@bytemd/plugin-breaks';
import math from '@bytemd/plugin-math'; // 数学公式
import 'katex/dist/katex.min.css'; // for plugin-math
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji'; // emoji😊 代码
import mediumZoom from '@bytemd/plugin-medium-zoom';
import mermaid from '@bytemd/plugin-mermaid'; // 图表 / 流程图

import { ElMessage, ElCard } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import ElCrumb from '@/web-bs/components/crumb.vue';
import { findArticleById } from '@/api/article';
import { routes, title } from './config';

const route = useRoute();
const router = useRouter();

const data = reactive({
  plugins: [
    // 将所有的扩展功能放入插件数组中，然后就可以生效了
    highlight(),
    breaks(),
    frontmatter(),
    gemoji(),
    mediumZoom(),
    gfm(),
    math(),
    mermaid()
  ],
  title,
  routes,
  value: '',
  name: ''
});

// 获取文章
async function getArticle(id: string) {
  const params = {
    id
  };
  const resArticleFind = await findArticleById(params);
  if (resArticleFind && (resArticleFind as any).code === 200) {
    data.value = (resArticleFind as any)?.data?.row?.content || '';
    data.name = (resArticleFind as any)?.data?.row?.title || '';
  }
}

onMounted(async () => {
  const { id } = route.query;
  if (id) {
    getArticle(id as string);
  } else {
    ElMessage.error('文章出错');
    router.push('/backBlog/articleMgt');
  }
});
</script>

<style lang="scss">
.md-view {
  margin-top: 0px;
  .viewer {
    height: calc(100vh - 353px) !important; // 改变编辑器默认高度，不需要的可以不配置
    text-align: start;
  }
}
</style>
<style scoped lang="scss">
.md-view {
  width: 100%;
  padding: 0px 2% 20px 2%;
  .md-view-card {
    margin-bottom: 16px;
    border-radius: 10px;
    .md-view-flex {
      text-align: center;
    }
  }
}
</style>
