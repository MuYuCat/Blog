<template>
  <div class="baota">BaoTa</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import getBaoTaSystem from '../../utils/baota';

export default defineComponent({
  name: 'BaoTaInfo',
  setup() {
    onMounted(async () => {
      getBaoTaSystem();
    });
  }
});
</script>

<style lang="scss"></style>
