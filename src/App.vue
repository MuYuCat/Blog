<template>
  <div class="wrapper">
    <v-head v-if="!sidebarShow"></v-head>
    <v-sidebar v-if="sidebarShow"></v-sidebar>
    <div class="container" :class="{ 'no-sidebar': !sidebarShow }">
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <v-foot v-if="!sidebarShow"></v-foot>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import usePermissionStore from './store/permission';
import header from '@/web-fs/components/header.vue';
import footer from '@/web-fs/components/footer.vue';
import sidebar from '@/web-bs/components/sidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    'v-head': header,
    'v-sidebar': sidebar,
    'v-foot': footer
  },
  setup() {
    const permissionStore = usePermissionStore();
    const { sidebarShow } = storeToRefs(permissionStore);

    return {
      sidebarShow
    };
  }
});
</script>

<style lang="scss">
@import './styles/common.scss';
</style>
