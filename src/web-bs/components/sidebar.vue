<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-menu"
      :default-active="onRoutes"
      :default-openeds="openeds"
      :collapse="collapse"
      router
    >
      <template v-for="item in adminNav">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.title">
            <template #title>
              <i :class="item.icon"></i>
              <span slot="title" class="nav-text">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu v-if="(subItem as any).subs" :index="subItem.index" :key="subItem.title">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in (subItem as any).subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                <span class="nav-text">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index" class="submenu-title">
            <i :class="item.icon"></i>
            <span slot="title" class="nav-text">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { ElMenu } from 'element-plus';

export default defineComponent({
  name: 'BlogSidebar',
  components: { 'el-menu': ElMenu },
  setup() {
    const data = reactive({
      collapse: false,
      // 默认展开模块
      openeds: ['/backBlog'],
      onRoutes: window.location.pathname,
      // router items
      items: [],
      // 管理员菜单
      adminNav: [
        {
          icon: '',
          index: '/backBlog',
          title: '后台管理',
          subs: [
            {
              index: '/backBlog/markDown',
              title: '撰写文章'
            },
            {
              index: '/backBlog/articleMgt',
              title: '文章管理'
            }
          ]
        }
      ]
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang="scss">
.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  width: 200px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  font-size: 16px;
  padding: 8px 8px 0;
  .sidebar-menu {
    border: none;
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
    }
    &--inline {
      .el-menu-item {
        color: #857174;
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
    color: #e7213d !important;
    background: #fef4f5 !important;
    border-radius: 4px;
  }
}
</style>
