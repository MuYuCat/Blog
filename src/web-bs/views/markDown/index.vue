<template>
  <div class="md-write">
    <el-crumb :title="data.title" :routes="data.routes"></el-crumb>
    <el-card shadow="always" class="md-write-card">
      <div class="md-write-flex">
        <el-input v-model="data.name" placeholder="请输入文章标题..." class="md-write-name" />
        <el-popover
          v-model:visible="data.showPopover"
          placement="bottom-end"
          :width="560"
          trigger="click"
        >
          <template #reference>
            <el-button plain size="large" class="md-write-btn" @click="showPopover">
              发布
            </el-button>
          </template>
          <template #default>
            <div class="show-article-popover">
              <div class="popover-title">{{ data.title }}</div>
              <el-form :model="data.articleForm" label-width="80px" class="popover-content">
                <el-form-item label="标签:" size="large">
                  <div v-if="!showDelTag">
                    <el-check-tag
                      v-for="tag in showTags"
                      :key="tag"
                      class="popover-content-tag"
                      closable
                      @change="clickTag(tag)"
                      :disable-transitions="true"
                    >
                      {{ tag }}
                    </el-check-tag>
                  </div>
                  <div v-else>
                    <el-tag
                      v-for="tag in showTags"
                      :key="tag"
                      class="popover-content-tag"
                      closable
                      :check="checked"
                      :disable-transitions="true"
                      @close="delTag(tag)"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                  <el-input
                    v-if="inputVisible"
                    ref="InputRef"
                    v-model="inputValue"
                    size="large"
                    clearable
                    style="width: 100px; height: 30px"
                    @keyup.enter="addNewTag"
                    @blur="addNewTag"
                  />
                  <el-button
                    v-if="!inputVisible && !showDelTag"
                    class="popover-content-btn"
                    size="small"
                    @click="showInput"
                  >
                    +
                  </el-button>
                  <el-button
                    class="popover-content-btn"
                    size="small"
                    @click="delThisTag"
                    v-if="!inputVisible"
                  >
                    -
                  </el-button>
                </el-form-item>
                <el-form-item label="参考链接:" size="large">
                  <el-input
                    v-model="data.articleForm.url"
                    placeholder="请输入链接"
                    clearable
                    style="width: 370px; height: 40px"
                  />
                </el-form-item>
                <el-form-item label="文章简介:" size="large">
                  <el-input
                    v-model="data.articleForm.introduction"
                    maxlength="100"
                    placeholder="请输入文章简介～"
                    show-word-limit
                    type="textarea"
                    :rows="5"
                  />
                </el-form-item>
              </el-form>
              <div class="popover-btn">
                <el-button plain type="info" @click="closePopover" size="large">取消</el-button>
                <el-button plain size="large" @click="publicArticle"> 确定并发布 </el-button>
              </div>
            </div>
          </template>
        </el-popover>
      </div>
      <Editor
        class="editos"
        :value="data.value"
        :plugins="data.plugins"
        :locale="zhHans"
        placeholder="请开始天马行空吧～"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
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

import { ElInput, ElButton, ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { addArticle, findArticleById } from '@/api/article';
import useUserStore from '@/store/user';
import ElCrumb from '@/web-bs/components/crumb.vue';
import { routes, title, editRoutes, editTitle } from './config';

const userStore = useUserStore();
const { userName } = storeToRefs(userStore);
const router = useRouter();
const route = useRoute();

const inputValue = ref('');
const showTags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
const checked = ref(false);
const showDelTag = ref(false);

// 点击删除tag
function delTag(tag: string) {
  showTags.value.splice(showTags.value.indexOf(tag), 1);
}

// 展示tag输入框
function showInput() {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
}

// 添加新tag
function addNewTag() {
  if (inputValue.value) {
    showTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
}

// 删除tag
function delThisTag() {
  showDelTag.value = !showDelTag.value;
}

// 选择Tag
function clickTag(tag: string) {
  console.log(tag);
  // checked.value = status;
}

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
  routes: [],
  title: '',
  showPopover: false,
  articleForm: {
    tags: '',
    url: '',
    introduction: ''
  }
});

// 展开popover
function showPopover() {
  data.showPopover = true;
}

// 关闭popover
function closePopover() {
  data.showPopover = false;
}

// 发布文章
async function publicArticle() {
  closePopover();
  const params = {
    title: data.name,
    author: userName.value,
    content: data.value,
    tags: ''
  };
  const resArticleAdd = await addArticle(params);
  if (resArticleAdd && (resArticleAdd as any).code === 200) {
    data.value = '';
    data.name = '';
    ElNotification.success({
      title: '文章管理',
      message: '发布成功',
      duration: 4500
    });
    router.push('/backBlog/articleMgt');
  }
}

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
    (data as any).routes = editRoutes;
    data.title = editTitle;
    getArticle(id as string);
  } else {
    (data as any).routes = routes;
    data.title = title;
  }
});
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
.show-article-popover {
  .popover-title {
    padding: 24px 20px 16px 20px;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #1d2129;
    border-bottom: 1px solid #e5e6eb;
  }
  .popover-content {
    padding: 24px 20px 16px 20px;
    font-weight: 500;
    font-size: 14px;
    line-height: 32px;
    color: #1d2129;
    border-bottom: 1px solid #e5e6eb;
    .popover-content-tag {
      margin: 6px 6px;
      height: 32px;
      width: 74px;
      line-height: 20px;
    }
    .popover-content-btn {
      margin: 6px 6px;
    }
  }
  .popover-btn {
    padding: 18px 20px 6px 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
