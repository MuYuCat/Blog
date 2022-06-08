<template>
  <div class="wrapper">
    <v-head v-if="headShow"></v-head>
    <v-sidebar v-if="sidebarShow"></v-sidebar>
    <div class="container" :class="{ 'no-sidebar': !sidebarShow }">
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <v-foot v-if="footShow"></v-foot>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import usePermissionStore from './store/permission';
import header from '@/components/header.vue';
import footer from '@/components/footer.vue';
import sidebar from '@/components/sidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    'v-head': header,
    'v-sidebar': sidebar,
    'v-foot': footer
  },
  setup() {
    const permissionStore = usePermissionStore();
    const { sidebarShow, headShow, footShow } = storeToRefs(permissionStore);
    return {
      sidebarShow,
      headShow,
      footShow
    };
  }
});
</script>

<style lang="scss">
@import './styles/common.scss';
</style>
