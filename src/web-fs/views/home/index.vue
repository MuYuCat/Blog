<template>
  <div class="blog-wrapper">
    <v-content></v-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import showText from './components/showLog';
import content from '@/web-fs/views/content/index.vue';
import useUserStore from '../../../store/user';

import { getInfo } from '../../../api/user';

export default defineComponent({
  name: 'BlogHome',
  components: {
    'v-content': content
  },
  setup() {
    const userStore = useUserStore();
    const { isLogIn } = storeToRefs(userStore);

    const getUserInfo = async () => {
      await getInfo().then((resUserInfo: any) => {
        if (resUserInfo && resUserInfo.code === 200) {
          userStore.updateIsLogIn(true);
        }
      });
    };

    onMounted(async () => {
      showText();
      getUserInfo();
    });
    return {
      isLogIn,
      getUserInfo
    };
  }
});
</script>

<style scoped lang="scss">
.blog-wrapper {
  overflow-y: auto;
}
</style>
