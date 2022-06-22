<template>
  <div class="md-write">
    <el-crumb :title="data.title" :routes="data.routes"></el-crumb>
    <el-card shadow="always" class="md-write-card">
      <div class="md-write-flex">
        <el-input v-model="articleTitle" placeholder="请输入文章标题..." class="md-write-name" />
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
              <el-form
                :model="data.articleForm"
                label-width="84px"
                class="popover-content"
                ref="ruleFormRef"
                :rules="data.articleFormRules"
                :hide-required-asterisk="false"
              >
                <el-form-item label="标签:" size="large" prop="tags">
                  <div v-if="!showDelTag">
                    <el-check-tag
                      v-for="tag in showTags"
                      :key="tag"
                      class="popover-content-tag"
                      closable
                      :checked="(data.articleForm.tags as string[]).includes(tag)"
                      @change="clickTag(tag)"
                      :disable-transitions="true"
                    >
                      {{ tag }}
                    </el-check-tag>
                  </div>
                  <div v-else>
                    <el-tag
                      v-for="(tag, index) in showTags"
                      :key="tag"
                      class="popover-content-tag"
                      closable
                      :check="checked"
                      :disable-transitions="true"
                      @close="delTag(tag, index)"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                  <el-input
                    v-if="inputVisible"
                    ref="InputRef"
                    v-model="inputValue"
                    class="popover-content-input"
                    size="large"
                    clearable
                    style="width: 100px; height: 30px"
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
                <el-form-item label="参考链接:" size="large" prop="url">
                  <el-input
                    v-model="data.articleForm.url"
                    placeholder="请输入链接"
                    clearable
                    style="width: 414px; height: 40px"
                  />
                </el-form-item>
                <el-form-item label="文章简介:" size="large" prop="introduction">
                  <el-input
                    v-model="data.articleForm.introduction"
                    maxlength="100"
                    placeholder="请输入文章简介～"
                    show-word-limit
                    type="textarea"
                    :rows="5"
                  />
                </el-form-item>
                <el-form-item label="状态:" size="large" prop="status">
                  <el-radio-group v-model="data.articleForm.status">
                    <el-radio label="0" size="large" border>草稿箱</el-radio>
                    <el-radio label="1" size="large" border>发布</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div class="popover-btn">
                <el-button plain type="info" @click="closePopover" size="large">取消</el-button>
                <el-button plain size="large" @click="publicArticle"> 确定 </el-button>
              </div>
            </div>
          </template>
        </el-popover>
      </div>
      <md-editor
        v-model="article.text"
        :preview-theme="article.previewTheme"
        :code-theme="article.codeTheme"
        :editorId="article.mdId"
        :toolbarsExclude="article.toolbarsExclude as ToolbarNames[]"
        :language="article.language"
        :showCodeRowNumber="true"
        @onGetCatalog="onGetCatalog"
        @onHtmlChanged="saveHtml"
        @onChange="saveText"
        @onSave="saveText"
        @onError="showError"
      >
      </md-editor>
      <md-atalog :editorId="article.id" :scrollElement="article.scrollElement" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import MdEditor, { ToolbarNames } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
// import sanitizeHtml from 'sanitize-html';

import { ElInput, ElButton, ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/user';
import ElCrumb from '@/web-bs/components/crumb.vue';
import { routes, title, editRoutes, editTitle } from './config';
import { addArticle, findArticleById, editArticle } from '@/api/article';
import { addTags, getTags, delTags } from '@/api/dict';

const userStore = useUserStore();
const { userName } = storeToRefs(userStore);
const router = useRouter();
const route = useRoute();

const showTags = ref<any[]>([]);
const inputValue = ref('');
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
const showDelTag = ref(false);
const checked = ref(false);
const ruleFormRef = ref(null);
const articleTitle = ref('');

const article = reactive({
  id: '',
  text: '',
  html: '',
  previewTheme: 'cyanosis',
  codeTheme: 'atom',
  catalogList: [],
  mdId: 'muyucat-md',
  scrollElement: document.documentElement,
  toolbarsExclude: ['github'],
  language: 'my-lang'
});

const data = reactive({
  isEdit: false,
  plugins: [],
  routes: [],
  title: '',
  showPopover: false,
  articleForm: {
    tags: [],
    url: '',
    introduction: '',
    status: ''
  },
  articleFormRules: {
    tags: [{ required: true, message: 'Please select tags ', trigger: 'blur' }],
    url: [
      { required: false },
      {
        pattern: /^((https?|ftp):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/\w\.-]*)*\/?/,
        message: 'Please input the correct url ',
        trigger: 'blur'
      }
    ],
    introduction: [{ required: true, message: 'Please input introduction ', trigger: 'blur' }],
    status: [{ required: true, message: 'Please select status ', trigger: 'blur' }]
  }
});

// md配置
MdEditor.config({
  editorConfig: {
    languageUserDefined: {
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
    }
  }
});

// // 自行处理不安全的 html 内容
// const sanitize = (html: string) => {
//   return sanitizeHtml(html);
// };

// md获取目录
const onGetCatalog = (list: any) => {
  article.catalogList = list;
};

// 获取html格式文件
function saveHtml(html: string) {
  article.html = html;
}

// 保存md格式文件
function saveText(md: string) {
  article.text = md;
}
// 撰写报错
function showError(error: any) {
  console.log(error);
}

// 关闭popover
function closePopover() {
  data.showPopover = false;
}

// 发布文章
async function publicArticle() {
  if (!ruleFormRef) return;
  await (ruleFormRef as any).value.validate(async (valid: any) => {
    if (valid) {
      const params = {
        id: article.id,
        title: articleTitle.value,
        author: userName.value,
        content: article.text,
        html: article.html,
        tags: data.articleForm.tags,
        url: data.articleForm.url,
        introduction: data.articleForm.introduction,
        status: +data.articleForm.status
      };
      let resArticle = {};
      if (!data.isEdit) {
        resArticle = await addArticle(params);
      } else {
        resArticle = await editArticle(params);
      }
      if (resArticle && (resArticle as any).code === 200) {
        article.text = '';
        articleTitle.value = '';
        ElMessage.success(data.isEdit ? '编辑成功' : '发布成功');
        closePopover();
        router.push('/backBlog/articleMgt');
      } else {
        ElMessage.error(data.isEdit ? '编辑失败' : '发布失败');
      }
    } else {
      ElMessage.warning('请填写完整参数');
    }
  });
}

// 获取文章
async function getArticle(id: string) {
  const params = {
    id
  };
  const resArticleFind = await findArticleById(params);
  if (resArticleFind && (resArticleFind as any).code === 200) {
    article.text = (resArticleFind as any)?.data?.row?.content || '';
    articleTitle.value = (resArticleFind as any)?.data?.row?.title || '';
    data.articleForm.tags = (resArticleFind as any)?.data?.row?.tags || [];
    data.articleForm.url = (resArticleFind as any)?.data?.row?.url || '';
    data.articleForm.introduction = (resArticleFind as any)?.data?.row?.introduction || '';
    data.articleForm.status = `${(resArticleFind as any)?.data?.row?.status}` || '';
  }
}

// 展示tag输入框
function showInput() {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
}

// 获取tags
async function getTag() {
  const resGetTags = await getTags();
  if (resGetTags?.data?.rows && (resGetTags as any).code === 200) {
    showTags.value = [];
    resGetTags.data.rows.map((item: any) => {
      showTags.value.push(item.dictName);
      return '';
    });
  }
}

// 点击删除tag
async function delTag(tag: string, index: number) {
  // showTags.value.splice(showTags.value.indexOf(tag), 1);
  const params = {
    dictName: showTags.value[+index]
  };
  const resDelTags = await delTags(params);
  if (resDelTags && (resDelTags as any).code === 200) {
    showDelTag.value = false;
    ElMessage.success('删除标签成功');
    await getTag();
  }
}

// 添加新tag
async function addNewTag() {
  if (inputValue.value) {
    const params = {
      dictValue: +(showTags.value as any).length + 1,
      dictName: inputValue.value
    };
    const resTagsAdd = await addTags(params);
    if (resTagsAdd && (resTagsAdd as any).code === 200) {
      ElMessage.success('添加标签成功');
      await getTag();
    } else {
      inputValue.value = '';
      ElMessage.error('添加标签失败');
    }
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
  console.log(data.articleForm.tags, tag);
  if ((data.articleForm.tags as string[]).includes(tag)) {
    (data.articleForm.tags as string[]).splice(showTags.value.indexOf(tag), 1);
  } else {
    (data.articleForm.tags as string[]).push(tag);
  }
}

// 展开popover
async function showPopover() {
  data.showPopover = true;
  await getTag();
}

onMounted(async () => {
  const { id } = route.query;
  if (id) {
    article.id = id as string;
    data.isEdit = true;
    (data as any).routes = editRoutes;
    data.title = editTitle;
    getArticle(id as string);
  } else {
    data.isEdit = false;
    (data as any).routes = routes;
    data.title = title;
  }
});
</script>

<style lang="scss">
.md-write {
  margin-top: 0px;
  .md {
    height: calc(100vh - 353px) !important; // 改变编辑器默认高度，不需要的可以不配置
    text-align: start;
  }
  .md-fullscreen {
    margin-top: 56px;
    height: calc(100vh - 56px) !important; // 改变编辑器默认高度，不需要的可以不配置
    text-align: start;
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
      line-height: 20px;
    }
    .popover-content-input {
      margin: 6px 6px;
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
