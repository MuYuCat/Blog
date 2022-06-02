<template>
  <div class="article-manage">
    <el-card shadow="always" class="article-form">
      <el-form :model="articleForm" :inline="true" label-position="right" label-width="80px">
        <el-form-item label="文章标题:">
          <el-input
            v-model="articleForm.title"
            placeholder="Approved by"
            clearable
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="文章状态:">
          <el-select v-model="articleForm.status" placeholder="全部" disabled style="width: 300px">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章作者:">
          <el-select v-model="articleForm.author" placeholder="全部" disabled style="width: 300px">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签:">
          <el-select v-model="articleForm.tags" placeholder="全部" disabled style="width: 300px">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期:">
          <el-date-picker
            v-model="articleForm.createTime"
            type="daterange"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :shortcuts="shortcuts"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain type="info" @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" class="article-table">
      <el-table :data="isTableData" style="width: 100%" stripe>
        <el-table-column prop="id" label="ID" min-width="180" align="center" />
        <el-table-column prop="title" label="文章标题" min-width="180" align="center" />
        <el-table-column prop="author" label="作者" min-width="180" align="center" />
        <el-table-column prop="tags" label="标签" min-width="180" align="center" />
        <el-table-column prop="url" label="路由" min-width="180" align="center" />
        <el-table-column prop="created_at" label="创建时间" min-width="180" align="center" />
        <el-table-column prop="updated_at" label="更新时间" min-width="180" align="center" />
        <el-table-column prop="status" label="状态" min-width="80" fixed="right" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" fixed="right" align="center">
          <template #default="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { articleFindAll } from '../../../api/article';

const articleForm = reactive({
  title: '',
  status: '',
  author: '',
  tags: '',
  createTime: ''
});

const isTableData = ref([]);

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

function onSubmit() {
  console.log('onSubmit');
}
function handleEdit(index: number, row: any) {
  console.log('handleEdit', index, row);
}
function handleDelete(index: number, row: any) {
  console.log('handleDelete', index, row);
}
async function getTableData() {
  console.log('getTableData');
  const resTableData = await articleFindAll();
  if (resTableData && (resTableData as any).code === 200) {
    console.log('resTableData', resTableData);
    isTableData.value = resTableData?.data?.rows;
    console.log('isTableData', isTableData.value);
  }
}

onMounted(async () => {
  getTableData();
});
</script>

<style scoped lang="scss">
.article-manage {
  width: 100%;
  padding: 20px 2%;
  .article-form {
    margin-bottom: 20px;
    .el-form {
      text-align: left;
    }
  }
}
</style>
<style lang="scss">
.article-form {
  .el-card__body {
    padding-bottom: 0px;
  }
}
</style>
