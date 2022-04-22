/*
 * @Author: MuYuCat
 * @Date: 2022-04-22 17:44:38
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 17:56:55
 * @Description: file content
 */
// src/store/user.ts

import { defineStore } from 'pinia';

const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      name: '张三'
    };
  },
  actions: {
    updateName(name: string) {
      this.name = name;
    }
    // async login(account: any, pwd: any) {
    //   const { data } = await api.login(account, pwd);
    //   this.updateName(data);
    //   return data;
    // }
  },
  getters: {
    fullName: (state) => {
      return `${state.name}丰`;
    }
  }
});

export default useUserStore;
