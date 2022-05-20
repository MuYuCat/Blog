<!--
 * @Author: MuYuCat
 * @Date: 2022-04-14 16:32:47
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 14:02:13
 * @Description: file content
-->
<template>
  <div class="banner">
    <a class="img-bannerBig banner-show"></a>
    <div class="show-content">MuYuCat's Blog</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BlogBanner'
});
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 100%;
  position: relative;
  .banner-show {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
  .show-content {
    position: absolute;
    top: 27%;
    left: 50%;
    transform: translateX(-150px);
    font-size: 51px;
  }
}
</style>
