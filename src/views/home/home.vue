<!--
 * @Author: MuYuCat
 * @Date: 2022-04-19 11:58:49
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 16:37:48
 * @Description: file content
-->
<template>
  <div class="wrapper blog-wrapper">
    <v-header></v-header>
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

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import header from '@/components/header.vue';
import footer from '@/components/footer.vue';
import { findAll, getUserInfo } from '../../api/home';
import useUserStore from '../../store/user';
import showText from './components/showLog';

interface IUserInfo {
  username: string;
  id: string;
}

interface IDataProps {
  resultString: string;
  userInfo: IUserInfo;
  // turnLeft: () => void;
  showFindAll: () => void;
  getUserInfo: () => void;
}

export default defineComponent({
  name: 'BlogHome',
  components: {
    'v-header': header,
    'v-footer': footer
  },
  setup() {
    const userStore = useUserStore();
    const { isLogIn } = storeToRefs(userStore);
    const data: IDataProps = reactive({
      resultString: '',
      userInfo: {
        username: '',
        id: ''
      },
      // turnLeft() {
      //   console.log('turn leftPage');
      // },
      async showFindAll() {
        await findAll();
      },
      async getUserInfo() {
        await getUserInfo().then((res) => {
          if (res && res.data) {
            userStore.updateIsLogIn(true);
            data.userInfo = res.data;
          }
        });
      }
    });
    onMounted(() => {
      data.showFindAll();
      data.getUserInfo();
      showText();
    });
    return {
      isLogIn,
      ...toRefs(data)
    };
  }
});
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
