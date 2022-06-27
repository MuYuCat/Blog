<template>
  <div class="header">
    <div class="header-content">
      <span class="header-left">
        <!-- <a class="icons-muyucat-gary big" href="/"></a> -->
        <span class="header-name" @click="data.goToBackBlog">MuYuCat</span>
      </span>
      <span class="header-right">
        <el-button
          plain
          size="large"
          @click="data.openLogin"
          v-if="!isLogIn"
          v-track:click="{ sapmodid: 'header', eleid: 'login' }"
          >登陆</el-button
        >
        <div v-else class="header-icons">
          <a class="icons-head-bells" href="/"></a>
          <a class="icons-head-user" href="/"></a>
          <a
            class="icons-head-login-out"
            @click="data.loginOut"
            v-track:click="{ sapmodid: 'header', eleid: 'out' }"
          ></a>
        </div>
        <!-- <v-avatar v-else @click="goToBackBlog" class="header-avatar"></v-avatar> -->
      </span>
    </div>
    <v-login v-model:showLogIn="data.showLogIn"></v-login>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';

import { useRouter } from 'vue-router';
import { ElButton, ElNotification } from 'element-plus';
import useUserStore from '@/store/user';
import VLogin from '@/web-fs/components/login.vue';
// eslint-disable-next-line no-unused-vars
import loginOut from '@/assets/icons/login.svg';
import { USER_TOKEN } from '@/content';

// import avatar from '@/components/avatar.vue';

interface IDataProps {
  showLogIn: boolean;
  openLogin: () => void;
  loginOut: () => void;
  goToBackBlog: () => void;
}
const userStore = useUserStore();
const { isLogIn } = storeToRefs(userStore);
const router = useRouter();

const data: IDataProps = reactive({
  showLogIn: false,
  openLogin() {
    data.showLogIn = true;
  },
  loginOut() {
    userStore.updateIsLogIn(false);
    localStorage.removeItem(USER_TOKEN);
    ElNotification.warning({
      title: '权限提醒',
      message: '已退出登录',
      duration: 4500
    });
  },
  goToBackBlog() {
    router.push({
      path: '/backBlog'
    });
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
    background: #fff;
    padding: 0 36px;
    width: 100%;
    .header-left {
      position: relative;
      cursor: pointer;
      .header-name {
        font-size: 28px;
        // position: absolute;
        // bottom: 20px;
        // left: 54px;
        font-weight: 550;
        letter-spacing: 2px;
        height: 56px;
        line-height: 56px;
      }
    }
    .header-right {
      .header-avatar {
        cursor: pointer;
      }
      .header-icons {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        width: 124px;
      }
    }
  }
}
</style>
