/*
 * @Author: MuYuCat
 * @Date: 2022-04-24 14:20:36
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 14:37:06
 * @Description: file content
 */

import { defineStore } from 'pinia';

const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      showLogInBtn: true
    };
  },
  actions: {
    isShowLogInBtn(value: boolean) {
      this.showLogInBtn = value;
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
});

export default useUserStore;
