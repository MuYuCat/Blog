import { defineStore } from 'pinia';

const usePoetryStore = defineStore({
  id: 'map', // id必填，且需要唯一
  state: () => {
    return {
      cacheAt: '', // 更新时间
      content: '', // 诗句
      matchTags: [''], // 诗句匹配的tag
      author: '', // 作者
      contents: [''], // 完整诗句
      dynasty: '', // 作者年代
      title: '', // 诗句名称
      popularity: 0, // 诗词欢迎度
      warning: null // 接口警告
    };
  },
  actions: {
    updateCacheAt(value: string) {
      this.cacheAt = value;
    },
    updateContent(value: string) {
      this.content = value;
    },
    updateMatchTags(value: string[]) {
      this.matchTags = value;
    },
    updateAuthor(value: string) {
      this.author = value;
    },
    updateContents(value: string[]) {
      this.contents = value;
    },
    updateDynasty(value: string) {
      this.dynasty = value;
    },
    updateTitle(value: string) {
      this.title = value;
    },
    updatePopularity(value: number) {
      this.popularity = value;
    },
    updateWarning(value: any) {
      this.warning = value;
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
});

export default usePoetryStore;
