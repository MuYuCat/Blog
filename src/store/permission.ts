import { defineStore } from 'pinia';

const usePermissionStore = defineStore({
  id: 'permission', // id必填，且需要唯一
  state: () => {
    return {
      sidebarShow: false // 是否展示侧边栏
    };
  },
  actions: {
    updateSidebarShow(value: boolean) {
      this.sidebarShow = value;
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
});

export default usePermissionStore;
