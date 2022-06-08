import { defineStore } from 'pinia';

const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      isLogIn: false, // 是否为登陆状态
      userName: '' // 用户名
    };
  },
  actions: {
    updateIsLogIn(value: boolean) {
      this.isLogIn = value;
    },
    updateUserName(value: string) {
      this.userName = value;
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
});

export default useUserStore;
