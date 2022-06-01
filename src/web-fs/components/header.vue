<template>
  <div class="header">
    <div class="header-content">
      <span class="header-left">
        <a class="icons-muyucat-gary big" href="/"></a>
        <span class="header-name">MuYuCat</span>
      </span>
      <span class="header-right">
        <el-button plain size="large" @click="openLogin" v-if="!isLogIn">登陆</el-button>
        <v-avatar v-else @click="goToBackBlog" class="header-avatar"></v-avatar>
      </span>
    </div>
    <v-login v-model:showLogIn="showLogIn"></v-login>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { storeToRefs } from 'pinia';

import { useRouter } from 'vue-router';
import useUserStore from '../../store/user';
import login from '@/web-fs/components/login.vue';
import avatar from '@/web-fs/components/avatar.vue';

interface IDataProps {
  showLogIn: boolean;
  openLogin: () => void;
  goToBackBlog: () => void;
}

export default defineComponent({
  name: 'BlogHeader',
  components: {
    'v-login': login,
    'v-avatar': avatar
  },
  setup() {
    const userStore = useUserStore();
    const { isLogIn } = storeToRefs(userStore);
    const router = useRouter();

    const data: IDataProps = reactive({
      showLogIn: false,
      openLogin() {
        data.showLogIn = true;
      },
      goToBackBlog() {
        router.push({
          path: '/backBlog'
        });
      }
    });
    return {
      isLogIn,
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang="scss">
.header {
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  position: fixed;
  top: 0;
  background: rgb(245, 245, 245, 0.2);
  z-index: 2;
  .header-content {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    background: #f5f5f5;
    padding: 0 4%;
    width: 100%;
    .header-left {
      position: relative;
      cursor: pointer;
      .header-name {
        font-size: 16px;
        position: absolute;
        bottom: 8px;
        left: 54px;
        font-weight: 700;
        letter-spacing: 2px;
      }
    }
    .header-right {
      .header-avatar {
        cursor: pointer;
      }
    }
  }
}
</style>
