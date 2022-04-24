<!--
 * @Author: MuYuCat
 * @Date: 2022-04-14 16:32:47
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 10:00:29
 * @Description: file content
-->
<template>
  <div class="page-wrap">
    <el-card>
      <div class="demo">MuYuCat`s Blog</div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BlogDemo'
});
</script>

<style scoped lang="scss">
.demo {
  height: 78vh;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  padding-top: 100px;
}
</style>
