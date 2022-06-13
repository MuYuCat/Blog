<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-menu"
      :default-active="data.onRoutes"
      :default-openeds="data.openeds"
      :collapse="data.collapse"
      router
    >
      <template v-for="item in data.adminNav">
        <template v-if="item.subs">
          <el-sub-menu
            :index="item.index"
            :key="item.title"
            :disabled="(item as any).disabled || false"
          >
            <template #title>
              <a :class="item.icon" href="/"></a>
              <span slot="title" class="nav-text">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="(subItem as any).subs"
                :index="subItem.index"
                :key="subItem.title"
                :disabled="(subItem as any).disabled || false"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in (subItem as any).subs"
                  :key="i"
                  :index="threeItem.index"
                  :disabled="(threeItem as any).disabled || false"
                  >{{ threeItem.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                :disabled="subItem.disabled"
              >
                <span class="nav-text">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
            class="submenu-title"
            :disabled="(item as any).disabled || false"
          >
            <i :class="item.icon"></i>
            <span slot="title" class="nav-text">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';
import { storeToRefs } from 'pinia';
import usePermissionStore from '@/store/permission';

const permissionStore = usePermissionStore();
const { path } = storeToRefs(permissionStore);

const data = reactive({
  collapse: false,
  // 默认展开模块
  openeds: [],
  onRoutes: path,
  // router items
  items: [],
  // 管理员菜单
  adminNav: [
    {
      icon: 'icons-sidebar-backBlog show-icons',
      index: '/backBlog',
      title: '工作台'
    },
    {
      icon: 'icons-sidebar-contentMgt show-icons',
      index: '/backBlog/contentMgt',
      title: '内容管理',
      subs: [
        {
          index: '/backBlog/articleMgt',
          title: '文章管理'
        },
        {
          index: '/backBlog/markDown',
          title: '发布文章'
        },
        {
          index: '/backBlog/commentMgt',
          title: '评论管理',
          disabled: true
        }
      ]
    },
    {
      icon: 'icons-sidebar-userMgt show-icons',
      index: '/backBlog/userMgt',
      title: '用户管理',
      subs: [
        {
          index: '/backBlog/myInfo',
          title: '个人信息',
          disabled: true
        },
        {
          index: '/backBlog/ourInfo',
          title: '用户管理',
          disabled: true
        }
      ]
    },
    {
      icon: 'icons-sidebar-setUp show-icons',
      index: '/backBlog/setUp',
      title: '设置',
      subs: [
        {
          index: '/backBlog/blogTime',
          title: '建站日志',
          disabled: true
        }
      ]
    }
  ]
});
</script>

<style scoped lang="scss">
.sidebar {
  position: absolute;
  left: 16px;
  top: 76px;
  bottom: 0;
  background: #fff;
  width: 200px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  font-size: 16px;
  padding: 8px 8px 0;
  border-radius: 8px;
  .sidebar-menu {
    border: none;
    .show-icons {
      margin-top: -2px;
    }
  }
}
</style>
<style lang="scss">
.sidebar {
  .el-menu {
    border-right: none;
    .nav-text {
      padding: 0 8px;
    }
    .submenu-title,
    .el-sub-menu__title {
      color: #222222;
      font-size: 550;
    }
    &--inline {
      .el-menu-item {
        color: #717885;
        font-size: 550;
      }
    }
  }
  .el-menu-item,
  .el-sub-menu__title {
    padding: 0 16px !important;
    height: 48px;
    line-height: 48px;
    min-width: inherit !important;
  }
  .el-sub-menu .el-menu-item {
    padding: 0 32px !important;
  }
  .el-menu-item:hover,
  .el-sub-menu__title:hover,
  .el-menu-item.is-active {
    min-width: inherit !important;
    color: #165dff !important;
    background: #ecf5ff !important;
    border-radius: 4px;
    .show-icons {
      position: relative;
      left: -80px;
      filter: drop-shadow(#165dff 80px 0);
    }
  }
}
</style>
