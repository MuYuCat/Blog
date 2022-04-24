<!--
 * @Author: MuYuCat
 * @Date: 2022-04-14 16:32:47
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 14:02:13
 * @Description: file content
-->
<template>
  <div class="footer">
    <div class="ICP-content">
      <span class="ICP-logan"> 拥有前端的人生 </span>
      <span class="ICP-time"> © MuYuCat</span>
      <span @click="jump2Icp()" class="ICP-text">冀ICP备2021025764号-1</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

interface IDataProps {
  jump2Icp: () => void;
}

export default defineComponent({
  name: 'BlogFooter',
  setup() {
    const data: IDataProps = reactive({
      jump2Icp() {
        window.location.href = 'https://beian.miit.gov.cn/#/Integrated/recordQuery';
      }
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang="scss">
.footer {
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  position: absolute;
  bottom: 0;
  background: #f5f5f5;
  z-index: 2;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  .ICP-content {
    margin-top: 18px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: space-around;
    justify-content: center;
    align-items: center;
    .ICP-logan {
      color: #888;
      margin-right: 20px;
    }
    .ICP-text {
      cursor: pointer;
      color: #888;
    }
    .ICP-time {
      color: #ccc;
      &::after {
        content: '';
        border-right: 2px solid #888;
        margin: 0 20px;
      }
    }
  }
}
</style>
