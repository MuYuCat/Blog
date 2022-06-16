<template>
  <div class="article-manage">
    <el-crumb :title="data.title" :routes="data.routes"></el-crumb>
    <el-card shadow="always" class="article-form">
      <el-form
        :model="data.articleForm"
        ref="refArticleForm"
        :inline="true"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="文章标题:" size="large">
          <el-input
            v-model="data.articleForm.title"
            placeholder="请输入文章标题"
            clearable
            style="width: 200px; height: 40px"
          />
        </el-form-item>
        <el-form-item label="文章状态:" size="large">
          <el-select
            v-model="data.articleForm.status"
            placeholder="请选择文章状态"
            clearable
            style="width: 200px; height: 40px"
          >
            <el-option
              v-for="item in statusDict"
              :key="(item as any).dictValue"
              :label="(item as any).dictLabel"
              :value="(item as any).dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章作者:" size="large">
          <el-select
            v-model="data.articleForm.author"
            placeholder="全部"
            disabled
            style="width: 200px; height: 40px"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签:" size="large">
          <el-select
            v-model="data.articleForm.tags"
            placeholder="全部"
            disabled
            style="width: 200px; height: 40px"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期:" size="large">
          <el-date-picker
            v-model="data.articleForm.createTime"
            type="daterange"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :shortcuts="shortcuts"
            style="width: 250px; height: 40px"
          />
        </el-form-item>
        <el-form-item size="large">
          <el-button plain type="primary" @click="getTableData" size="large">查询</el-button>
        </el-form-item>
        <el-form-item size="large">
          <el-button plain type="info" @click="reSetForm" size="large">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" class="article-table">
      <el-table :data="state.isTableData" style="width: 100%" stripe>
        <el-table-column type="expand">
          <template #default="props">
            <div class="article-item-introduction">
              简介:
              <div class="article-item-introduction-content">
                {{ fixStyle(props?.row?.introduction) }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" min-width="140" align="center" />
        <el-table-column prop="title" label="文章标题" min-width="180" align="center">
          <template #default="scope">
            {{ fixStyle(scope.row.title) }}
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" min-width="80" align="center">
          <template #default="scope">
            {{ fixStyle(scope.row.author) }}
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" min-width="180" align="center">
          <template #default="scope">
            <div v-for="item in scope.row.tags" :key="item" class="article-item-tags">
              <el-tag size="large">{{ item }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="参考链接" min-width="220" align="left">
          <template #default="scope">
            <el-link :href="scope.row.url" target="_blank" :underline="false">{{
              fixStyle(scope.row.url)
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" min-width="160" align="center">
          <template #default="scope">
            {{ fixStyle(scope.row.created_at, 'time') }}
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="更新时间" min-width="160" align="center">
          <template #default="scope">
            {{ fixStyle(scope.row.updated_at, 'time') }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="80" fixed="right" align="center">
          <template #default="scope">
            <el-switch
              size="large"
              v-model.number="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              :before-change="changeArticleStatus.bind(this, scope)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" v-if="+scope.row.status !== 1">
              编辑
            </el-button>
            <el-button @click="handleViewer(scope.row)" v-else> 查看 </el-button>
            <el-button type="danger" @click="openMsgBox(scope.row)" v-if="+scope.row.status !== 1">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="false"
        class="article-pagination"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        layout="->, total, prev, pager, next, sizes"
        :total="state.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import {
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElDatePicker,
  ElButton,
  ElTable,
  ElTableColumn,
  ElSwitch,
  ElOption,
  ElPagination,
  ElMessage,
  ElMessageBox
} from 'element-plus';
import moment from 'moment';
import { useRouter } from 'vue-router';
import ElCrumb from '@/web-bs/components/crumb.vue';
import { findArticle, editArticle, delArticle } from '@/api/article';
import statusDict from '@/config/dict';
import fixStyle from '@/utils/fixStyle';

const router = useRouter();
const refArticleForm = ref();
const currentPage = ref(1);
const pageSize = ref(10);
const data = reactive({
  articleForm: {
    title: '',
    status: 'all',
    author: '',
    tags: '',
    createTime: ''
  },
  routes: [
    { path: '/backBlog', breadcrumbName: '工作台' },
    { path: '/backBlog/articleMgt', breadcrumbName: '内容管理' }
  ],
  title: '文章管理'
});
const state = reactive({
  isTableData: [],
  tags: [],
  total: 0
});

const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    }
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    }
  }
];
// 获取文章列表数据
async function getTableData() {
  const params = {
    title: data.articleForm?.title,
    status: data.articleForm?.status,
    author: data.articleForm?.author,
    tags: data.articleForm?.tags,
    beginTime: data.articleForm?.createTime[0]
      ? moment(data.articleForm?.createTime[0]).format('YYYY-MM-DD')
      : '',
    endTime: data.articleForm?.createTime[1]
      ? moment(data.articleForm?.createTime[1]).format('YYYY-MM-DD')
      : ''
  };
  const resTableData = await findArticle(params);
  if (resTableData && (resTableData as any).code === 200) {
    state.isTableData = resTableData?.data?.rows;
    // state.tags = resTableData?.data?.rows?.;
    state.total = resTableData?.data?.total;
  }
}
// 重置文章Form
function reSetForm() {
  data.articleForm = {
    title: '',
    status: 'all',
    author: '',
    tags: '',
    createTime: ''
  };
}
// 编辑文章
function handleEdit(row: any) {
  router.push(`/backBlog/articleEdit?id=${row.id}`);
}
// 查看文章
function handleViewer(row: any) {
  router.push(`/backBlog/articleView?id=${row.id}`);
}
// 删除文章列表
async function handleDelete(row: any) {
  const params = {
    id: row.id
  };
  const resDelArticle = await delArticle(params);
  if (resDelArticle && (resDelArticle as any).code === 200) {
    ElMessage({
      message: '删除成功',
      type: 'success'
    });
    await getTableData();
  } else {
    ElMessage({
      message: '删除失败',
      type: 'error'
    });
  }
}
// 删除二次确认
async function openMsgBox(row: any) {
  ElMessageBox.confirm('确定要删除这篇文章吗?', '删除文章', {
    confirmButtonText: '确定',
    cancelButtonText: '再想想',
    type: 'warning'
  })
    .then(async () => {
      await handleDelete(row);
    })
    .catch(() => {});
}
// page size变化
function handleSizeChange(val: number) {
  console.log(`${val} items per page`);
}
// page num变化
function handleCurrentChange(val: number) {
  console.log(`current page: ${val}`);
}
// 改变文章状态
async function changeArticleStatus(scope: any) {
  const params = {
    id: scope.row.id,
    status: scope.row.status
  };
  const resStatus = await editArticle(params);
  if (resStatus && (resStatus as any).code === 200) {
    ElMessage({
      message: '编辑成功',
      type: 'success'
    });
    getTableData();
    return true;
  }
  ElMessage({
    message: '编辑失败',
    type: 'error'
  });
  return false;
}

onMounted(async () => {
  getTableData();
});
</script>

<style scoped lang="scss">
.article-manage {
  width: 100%;
  padding: 0px 2% 20px 2%;
  .article-title {
    margin-bottom: 16px;
    border-radius: 10px;
    .article-title-crumb {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      font-weight: 500;
      color: #606266;
    }
    .article-title-istitle {
      font-size: 20px;
      text-align: left;
      font-weight: 700;
      margin-top: 4px;
    }
  }
  .article-form {
    margin-bottom: 16px;
    border-radius: 10px;
    .el-form {
      text-align: left;
      .el-form-item .el-form-item__label {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
      }
    }
  }
  .article-table {
    border-radius: 10px;
    margin: 16px 0 48px 0;
    .article-item-introduction {
      display: flex;
      margin: 14px 100px;
      font-size: 14px;
      font-weight: 600;
      .article-item-introduction-content {
        font-weight: 500;
        margin-left: 24px;
      }
    }
    .article-item-tags {
      display: inline-block;
      margin: 4px;
    }
  }
  .article-pagination {
    height: 50px;
    margin-top: 14px;
  }
}
</style>
<style lang="scss">
.article-manage {
  .article-title {
    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      color: #606266;
      font-weight: 400;
    }
  }
  .article-form {
    .el-card__body {
      padding-top: 36px;
      padding-bottom: 16px;
      text-align: left;
    }
  }
  .article-table {
    .el-table__header {
      height: 48px;
    }
    .el-table__row {
      height: 70px;
    }
  }
}
</style>
