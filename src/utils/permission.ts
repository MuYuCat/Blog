import router from '@/router';
import usePermissionStore from '@/store/permission';

router.beforeEach(async (to) => {
  const permissionStore = usePermissionStore();
  permissionStore.updatePath((to?.meta?.path as string) || to.path);
  // 处理侧边栏显示隐藏
  if (to.meta.isShowSidebar) {
    permissionStore.updateSidebarShow(true);
  } else {
    permissionStore.updateSidebarShow(false);
  }
  if (to.meta.isShowHead) {
    permissionStore.updateHeadShow(true);
  } else {
    permissionStore.updateHeadShow(false);
  }
  if (to.meta.isShowFoot) {
    permissionStore.updateFootShow(true);
  } else {
    permissionStore.updateFootShow(false);
  }
});
