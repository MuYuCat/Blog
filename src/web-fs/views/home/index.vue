<template>
  <div class="wrapper blog-wrapper">
    <v-header></v-header>
    <v-content></v-content>
    <v-footer></v-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import showText from './components/showLog';
import header from '@/web-fs/components/header.vue';
import footer from '@/web-fs/components/footer.vue';
import content from '@/web-fs/views/content/index.vue';
import useUserStore from '../../../store/user';

import { getInfo } from '../../../api/user';

export default defineComponent({
  name: 'BlogHome',
  components: {
    'v-header': header,
    // 'v-banner': banner,
    'v-content': content,
    'v-footer': footer
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
