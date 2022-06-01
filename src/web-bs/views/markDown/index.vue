<template>
  <div class="md-write">
    <div class="md-write-flex">
      <el-input v-model="name" placeholder="请输入文章标题..." class="md-write-name" />
      <el-button plain size="large" class="md-write-btn" @click="publicPaper">发布</el-button>
    </div>
    <md-editor
      class="editos"
      :value="value"
      :plugins="plugins"
      :locale="zhHans"
      @change="writePaper"
      placeholder="请开始天马行空吧～"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
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

import { articleAdd } from '../../../api/article';

export default defineComponent({
  name: 'markDown',
  components: {
    // @ts-ignore
    'md-editor': Editor
  },
  setup() {
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
      writePaper(v: any) {
        data.value = v;
      },
      async publicPaper() {
        const params = {
          title: data.name,
          content: data.value,
          tags: ''
        };
        const resArticleAdd = await articleAdd(params);
        if (resArticleAdd && (resArticleAdd as any).code === 200) {
          console.log('resArticleAdd', resArticleAdd);
        }
      }
    });
    return {
      ...toRefs(data),
      zhHans
    };
  }
});
</script>

<style lang="scss">
.md-write {
  margin-top: 0px;
  .editos {
    .bytemd {
      height: calc(100vh - 88px) !important; // 改变编辑器默认高度，不需要的可以不配置
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
  .md-write-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 2%;
    .md-write-name {
      width: 50%;
      height: 80px;
      line-height: 80px;
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
</style>
