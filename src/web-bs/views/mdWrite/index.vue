<template>
  <div class="md-write">
    <md-editor
      class="editos"
      :value="value"
      :plugins="plugins"
      :locale="zhHans"
      @change="handleChange"
      :uploadImages="uploadImage"
      placeholder="请输入文字"
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

export default defineComponent({
  name: 'MdWrite',
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
      value: '',
      handleChange(v: any) {
        console.warn(v);
        data.value = v;
      },
      async uploadImage(files: any) {
        console.log('files', files);
        return [
          {
            title: files.map((i: any) => i.name),
            url: 'http'
          }
        ];
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
  margin-top: 50px;
  .editos {
    .bytemd-split {
      height: calc(100vh - 50px) !important; // 改变编辑器默认高度，不需要的可以不配置
      text-align: start;
    }
  }
}
</style>
