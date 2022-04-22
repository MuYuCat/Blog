<!--
 * @Author: MuYuCat
 * @Date: 2022-04-19 11:58:49
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 17:54:07
 * @Description: file content
-->
<template>
  <div class="wrapper blog-wrapper">
    <!-- <v-clickPage></v-clickPage> -->
    <v-header></v-header>
    <v-login></v-login>
    <a class="img-banner banner-show"></a>
    <div class="show-content">MuYuCat's Blog</div>
    <el-button plain size="large" @click="turnLeft" v-if="!isLogIn">请右上角登陆</el-button>
    <div class="show-content" v-else>
      <div>登陆成功</div>
      <div>username: {{ userInfo?.username }}</div>
      <div>id: {{ userInfo?.id }}</div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from '@/components/header.vue';
import login from '@/components/login.vue';
import footer from '@/components/footer.vue';
// import clickPage from './components/clickPage.vue';
import { findAll, getUserInfo } from '../../api/home';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
export default {
  name: 'BlogHome',
  components: {
    'v-header': header,
    'v-login': login,
    'v-footer': footer
    // 'v-clickPage': clickPage
  },
  data() {
    return {
      resultString: '',
      isLogIn: false,
      userInfo: {
        username: '',
        id: ''
      }
    };
  },
  created() {
    this.showFindAll();
    this.getUserInfo();
    console.log(userStore.username);
    userStore.updateName('里斯');
  },
  methods: {
    turnLeft() {
      console.log('turn leftPage');
    },
    async showFindAll() {
      const res = await findAll();
      console.log(res);
      this.resultString = res;
    },
    async getUserInfo() {
      await getUserInfo().then((res) => {
        if (res && res.data) {
          console.log('getUserInfo', res);
          this.isLogIn = true;
          this.userInfo = res.data;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.blog-wrapper {
  .show-content {
    margin-top: 56px;
  }
  .banner-show {
    width: 100%;
    height: 175px;
    position: relative;
    top: 0px;
  }
}
</style>
