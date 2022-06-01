<template>
  <div class="sidebar">
    <div
      :class="chooseMenu === 'markdown' ? 'sidebar-item clicked' : 'sidebar-item'"
      @click="showContent"
    >
      markdown
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'BlogSidebar',
  setup() {
    const router = useRouter();
    const chooseMenu = ref('');
    function showContent() {
      chooseMenu.value = 'markdown';
      router.push({
        path: '/backBlog/markDown'
      });
    }
    return {
      chooseMenu,
      showContent
    };
  }
});
</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  width: 200px;
  background-color: #2b3642;
  padding-top: 30px;
  .sidebar-item {
    color: #fff;
    height: 50px;
    line-height: 50px;
    &:hover {
      cursor: pointer;
      background-color: orange;
    }
  }
  .clicked {
    background-color: orange;
  }
}
</style>
