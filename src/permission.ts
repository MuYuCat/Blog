import router from './router';
import usePermissionStore from './store/permission';

router.beforeEach(async (to) => {
  const permissionStore = usePermissionStore();
  // 处理侧边栏显示隐藏
  if (to.meta.isShowSidebar) {
    permissionStore.updateSidebarShow(true);
  } else {
    permissionStore.updateSidebarShow(false);
  }
});
