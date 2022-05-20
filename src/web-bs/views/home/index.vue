<template>
  <div class="wrapper blog-back-wrapper">
    <v-mdWrite></v-mdWrite>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import mdWrite from '../mdWrite/index.vue';
import useUserStore from '../../../store/user';
import showText from './components/showLog';

export default defineComponent({
  name: 'BlogBackHome',
  components: {
    'v-mdWrite': mdWrite
  },
  setup() {
    const userStore = useUserStore();
    const { isLogIn } = storeToRefs(userStore);

    onMounted(async () => {
      userStore.updateIsLogIn(false);
      showText();
    });
    return {
      isLogIn
    };
  }
});
</script>

<style scoped lang="scss">
.blog-back-wrapper {
  overflow-y: auto;
}
</style>
