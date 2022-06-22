<template>
  <div class="md-view">
    <el-crumb :title="crumb.title" :routes="crumb.routes"></el-crumb>
    <el-card shadow="always" class="md-view-card">
      <div class="md-view-flex">
        {{ article.title }}
      </div>
      <md-editor
        v-model="article.text"
        :preview-theme="article.previewTheme"
        :code-theme="article.codeTheme"
        previewOnly
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { ElMessage, ElCard } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import ElCrumb from '@/web-bs/components/crumb.vue';
import { findArticleById } from '@/api/article';
import { routes, title } from './config';

const route = useRoute();
const router = useRouter();

const article = reactive({
  title: '',
  text: '',
  html: '',
  previewTheme: 'cyanosis',
  codeTheme: 'atom'
});

const crumb = reactive({
  title,
  routes
});

// 获取文章
async function getArticle(id: string) {
  const params = {
    id
  };
  const resArticleFind = await findArticleById(params);
  if (resArticleFind && (resArticleFind as any).code === 200) {
    article.text = (resArticleFind as any)?.data?.row?.html || '';
    article.title = (resArticleFind as any)?.data?.row?.title || '';
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
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
    }
    .md {
      height: calc(100vh - 353px) !important; // 改变编辑器默认高度，不需要的可以不配置
      text-align: start;
    }
  }
}
</style>
