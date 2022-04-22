<!--
 * @Author: MuYuCat
 * @Date: 2022-04-14 16:32:47
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-21 10:43:28
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
        <el-button plain size="large" @click="openLogin">登陆</el-button>
      </span>
    </div>
    <v-login :showLogIn="showLogIn" @update:showLogIn="showLogIn = $event"></v-login>
  </div>
</template>

<script>
import login from '@/components/login.vue';

export default {
  name: 'BlogHeader',
  components: {
    'v-login': login
  },
  data() {
    return {
      showLogIn: false
    };
  },
  methods: {
    openLogin() {
      console.log('openLogin', this.showLogIn);
      this.showLogIn = true;
    }
  }
};
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
