<template>
  <div class="blog-content" v-track:visit>
    <div class="card-content">
      <el-card shadow="never" class="card-item" v-track:click="{ sapmodid: 'article', eleid: '1' }">
        <h2 class="card-item-name">
          <a
            href="https://juejin.cn/post/7094056264283471908"
            target="_blank"
            class="card-item-name-link"
          >
            「转载」万字总结 JS数据结构与常用的算法
          </a>
        </h2>
        <h2 class="card-item-time">MAY 17, 2022</h2>
      </el-card>
      <el-card shadow="never" class="card-item" v-track:click="{ sapmodid: 'article', eleid: '2' }">
        <h2 class="card-item-name">
          <a
            href="https://juejin.cn/post/7062146999616798727"
            target="_blank"
            class="card-item-name-link"
          >
            「转载」神器 Nginx 的学习手册 ( 建议收藏 )
          </a>
        </h2>
        <h2 class="card-item-time">MAY 17, 2022</h2>
      </el-card>
      <el-card shadow="never" class="card-item" v-track:click="{ sapmodid: 'article', eleid: '3' }">
        <h2 class="card-item-name">
          <a
            href="https://juejin.cn/post/6844903487155732494"
            target="_blank"
            class="card-item-name-link"
          >
            「转载」JS正则表达式完整教程（略长）
          </a>
        </h2>
        <h2 class="card-item-time">MAY 17, 2022</h2>
      </el-card>
      <el-card shadow="never" class="card-item" v-track:click="{ sapmodid: 'article', eleid: '4' }">
        <h2 class="card-item-name">
          <a
            href="https://juejin.cn/post/7018805943710253086"
            target="_blank"
            class="card-item-name-link"
          >
            「转载」2021 typescript史上最强学习入门文章(2w字)
          </a>
        </h2>
        <h2 class="card-item-time">MAY 17, 2022</h2>
      </el-card>
      <el-card shadow="never" class="card-item" v-track:click="{ sapmodid: 'article', eleid: '5' }">
        <h2 class="card-item-name">
          <a
            href="https://juejin.cn/post/6872111128135073806"
            target="_blank"
            class="card-item-name-link"
          >
            「转载」一份不可多得的 TS 学习指南（1.8W字）
          </a>
        </h2>
        <h2 class="card-item-time">MAY 17, 2022</h2>
      </el-card>
      <el-card shadow="never" class="card-item" v-track:click="{ sapmodid: 'article', eleid: '6' }">
        <h2 class="card-item-name">
          <a
            href="https://juejin.cn/post/6844904115428917255"
            target="_blank"
            class="card-item-name-link"
          >
            「转载」写给女朋友的中级前端面试秘籍（含详细答案，15k级别）
          </a>
        </h2>
        <h2 class="card-item-time">MAY 17, 2022</h2>
      </el-card>
      <el-card shadow="never" class="card-item" v-track:click="{ sapmodid: 'article', eleid: '7' }">
        <h2 class="card-item-name">
          <a
            href="https://juejin.cn/post/6844903832435032072"
            target="_blank"
            class="card-item-name-link"
          >
            「转载」史上最详细的经典面试题 从输入URL到看到页面发生了什么？
          </a>
        </h2>
        <h2 class="card-item-time">MAY 17, 2022</h2>
      </el-card>
      <el-card shadow="never" class="card-item" v-track:click="{ sapmodid: 'article', eleid: '8' }">
        <h2 class="card-item-name">
          <a
            href="https://juejin.cn/post/7016593221815910408"
            target="_blank"
            class="card-item-name-link"
          >
            「转载」连八股文都不懂还指望在前端混下去么
          </a>
        </h2>
        <h2 class="card-item-time">MAY 17, 2022</h2>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { reactive } from 'vue';
// import { storeToRefs } from 'pinia';
// import { ElCard } from 'element-plus';
// import useUserStore from '@/store/user';

// interface IUserInfo {
//   username: string;
//   id: string;
// }

// interface IDataProps {
//   resultString: string;
//   poetry: string;
//   userInfo: IUserInfo;
//   // turnLeft: () => void;
// }
// const userStore = useUserStore();
// const { isLogIn } = storeToRefs(userStore);

// const data: IDataProps = reactive({
//   resultString: '',
//   poetry: '',
//   userInfo: {
//     username: '',
//     id: ''
//   }
// });
</script>

<style scoped lang="scss">
.blog-content {
  margin: 0 auto;
  width: 70%;
  max-width: 1450px;
  font-family: Georgia, STXihei, '华文细黑', SimSun, '宋体';
  .card-content {
    // margin: 70px 0;
    // padding-bottom: 45px;
    .card-item {
      width: 100%;
      border: 0px;
      border-bottom: 1px dashed rgb(205, 205, 205);
      text-align: left;
      &:last-child {
        border: none;
        margin-bottom: 0px;
      }
      .card-item-name {
        height: 40px;
        font-weight: 400;
        font-size: 26px;
        line-height: 40px;
        margin: 25px 0;
        font-family: Gadget, sans-serif;
        .card-item-name-link {
          color: rgb(0, 0, 0);
        }
        .card-item-name-link::before {
          content: '•';
          padding-right: 2%;
        }
      }
      .card-item-time {
        height: 40px;
        font-weight: 400;
        font-size: 20px;
        line-height: 40px;
        margin-left: 40px;
        color: rgb(102, 102, 102);
      }
    }
  }
}
</style>
