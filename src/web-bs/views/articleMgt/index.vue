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
            <!-- <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签:" size="large">
          <el-select
            v-model="data.articleForm.tags"
            placeholder="全部"
            disabled
            style="width: 200px; height: 40px"
          >
            <!-- <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" /> -->
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
          <el-button plain type="primary" @click="findTableData" size="large">查询</el-button>
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
            <div>暂无简介{{ props?.row?.zip }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" min-width="180" align="center" />
        <el-table-column prop="title" label="文章标题" min-width="180" align="center" />
        <el-table-column prop="author" label="作者" min-width="180" align="center" />
        <el-table-column prop="tags" label="标签" min-width="180" align="center" />
        <el-table-column prop="url" label="路由" min-width="180" align="center" />
        <el-table-column prop="created_at" label="创建时间" min-width="180" align="center" />
        <el-table-column prop="updated_at" label="更新时间" min-width="180" align="center" />
        <el-table-column prop="status" label="状态" min-width="80" fixed="right" align="center">
          <template #default="scope">
            <el-switch v-model="openSwitch" v-if="scope.row.status === '1'" />
            <el-switch v-model="closeSwitch" v-else />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <template #default="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
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
  ElPagination
} from 'element-plus';
import moment from 'moment';
import ElCrumb from '@/web-bs/components/crumb.vue';
import { findArticle } from '@/api/article';
import statusDict from '@/config/dict';

const refArticleForm = ref();
const openSwitch = ref(true);
const closeSwitch = ref(false);
const currentPage = ref(4);
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
    state.total = resTableData?.data?.total;
  }
}
function reSetForm() {
  console.log('reSetForm');
  data.articleForm = {
    title: '',
    status: 'all',
    author: '',
    tags: '',
    createTime: ''
  };
}
function findTableData() {
  getTableData();
}
function handleEdit(index: number, row: any) {
  console.log('handleEdit', index, row);
}
function handleDelete(index: number, row: any) {
  console.log('handleDelete', index, row);
}
function handleSizeChange(val: number) {
  console.log(`${val} items per page`);
}
function handleCurrentChange(val: number) {
  console.log(`current page: ${val}`);
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
