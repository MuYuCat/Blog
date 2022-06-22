<template>
  <el-card shadow="always" class="article-title">
    <el-breadcrumb separator="/" class="article-title-crumb">
      <el-breadcrumb-item v-for="item in routes" :key="(item as any).breadcrumbName">
        <a @click="changePath(item)">{{ (item as any).breadcrumbName }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="article-title-istitle">{{ title }}</div>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
import { defineProps, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  title: String,
  routes: Array
});
const { title, routes } = toRefs(props);
function changePath(item: any) {
  router.push(item.path);
}
</script>

<style scoped lang="scss">
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
</style>
<style lang="scss">
.article-title {
  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    color: #606266;
    font-weight: 400;
  }
}
</style>
