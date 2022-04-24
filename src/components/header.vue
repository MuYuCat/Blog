<!--
 * @Author: MuYuCat
 * @Date: 2022-04-14 16:32:47
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 14:57:23
 * @Description: file content
-->
<template>
  <div class="header">
    <div class="header-content">
      <span class="header-left">
        <a class="icons-muyucat-white big" href="/"></a>
        <span class="header-name">MuYuCat</span>
      </span>
      <span class="header-right">
        <el-button plain size="large" @click="openLogin" v-if="showLogInBtn">登陆</el-button>
        <v-avatar v-model:showAvatar="showAvatar"></v-avatar>
      </span>
    </div>
    <v-login v-model:showLogIn="showLogIn"></v-login>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

import useUserStore from '../store/user';
import login from '@/components/login.vue';
import avatar from '@/components/avatar.vue';

interface IDataProps {
  showLogIn: boolean;
  showLogInBtn: boolean;
  showAvatar: boolean;
  openLogin: () => void;
}

export default defineComponent({
  name: 'BlogHeader',
  components: {
    'v-login': login,
    'v-avatar': avatar
  },
  setup() {
    const userStore = useUserStore();
    const data: IDataProps = reactive({
      showLogIn: false,
      showLogInBtn: userStore.showLogInBtn,
      showAvatar: !userStore.showLogInBtn,
      openLogin() {
        console.log('openLogin', data.showLogIn);
        data.showLogIn = true;
      }
    });
    return {
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
    color: rgb(255, 255, 255);
    margin: 0 4%;
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
  }
}
</style>
