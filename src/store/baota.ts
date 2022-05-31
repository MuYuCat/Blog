import { defineStore } from 'pinia';

const useBaoTaStore = defineStore({
  id: 'baota', // id必填，且需要唯一
  state: () => {
    return {
      token: 'V3FYEWIYA7s4nIAN24GvU9He9eiOQrkZ' // baota api token
    };
  },
  actions: {},
  // 开启数据缓存
  persist: {
    enabled: true
  }
});

export default useBaoTaStore;
