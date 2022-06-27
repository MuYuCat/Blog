import Bowser from 'bowser';
import router from '@/router';
import usePermissionStore from '@/store/permission';

router.beforeEach(async (to) => {
  const permissionStore = usePermissionStore();
  permissionStore.updatePath((to?.meta?.path as string) || to.path); // 跳转路径/方便侧边栏定位
  permissionStore.updatePathTitle(to?.meta?.title as string); // 页面标题
  const parsedResult = Bowser.getParser(window.navigator.userAgent);
  permissionStore.updateBowserParser((parsedResult as any)?.parsedResult); // 浏览器解析

  // 处理侧边栏显示隐藏
  if (to.meta.isShowSidebar) {
    permissionStore.updateSidebarShow(true);
  } else {
    permissionStore.updateSidebarShow(false);
  }
  // 处理head显示隐藏
  if (to.meta.isShowHead) {
    permissionStore.updateHeadShow(true);
  } else {
    permissionStore.updateHeadShow(false);
  }
  // 处理foot部显示隐藏
  if (to.meta.isShowFoot) {
    permissionStore.updateFootShow(true);
  } else {
    permissionStore.updateFootShow(false);
  }
});
