import { defineStore } from 'pinia';

const usePermissionStore = defineStore({
  id: 'permission', // id必填，且需要唯一
  state: () => {
    return {
      sidebarShow: false, // 是否展示侧边栏
      headShow: true, // 是否展示顶边栏
      footShow: false, // 是否展示顶边栏
      pathTitle: '', // 页面标题
      bowserParser: {}, // 浏览器解析
      path: '/' // 跳转路由
    };
  },
  actions: {
    updateSidebarShow(value: boolean) {
      this.sidebarShow = value;
    },
    updateHeadShow(value: boolean) {
      this.headShow = value;
    },
    updateFootShow(value: boolean) {
      this.footShow = value;
    },
    updatePathTitle(value: string) {
      this.pathTitle = value;
    },
    updateBowserParser(value: any) {
      this.bowserParser = value;
    },
    updatePath(value: string) {
      this.path = value;
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
});

export default usePermissionStore;
