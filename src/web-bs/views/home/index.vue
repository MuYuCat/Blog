<template>
  <div class="blog-back-wrapper">Back Blog</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

// import markDown from '../markDown/index.vue';
import useUserStore from '../../../store/user';
import showText from './components/showLog';

export default defineComponent({
  name: 'BlogBackHome',
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
.back-home {
  height: 100%;
  .blog-back-wrapper {
    overflow-y: auto;
  }
}
</style>
