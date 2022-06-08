<template>
  <div class="blog-back-wrapper back-blog">
    <span class="back-blog-title">Back Blog</span>
    <a class="img-data-manage"></a>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

// import markDown from '../markDown/index.vue';
import useUserStore from '@/store/user';
import showText from '@/components/showLog';

export default defineComponent({
  name: 'BlogBackHome',
  setup() {
    const userStore = useUserStore();
    const { isLogIn } = storeToRefs(userStore);

    onMounted(async () => {
      showText();
    });
    return {
      isLogIn
    };
  }
});
</script>

<style scoped lang="scss">
.back-blog {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .back-blog-title {
    font-size: 60px;
  }
  .img-data-manage {
    width: 500px;
    height: 500px;
  }
}
</style>
