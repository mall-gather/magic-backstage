<template>
  <div class="home">
    <Headers></Headers>
    <HandleContent></HandleContent>
    <EchartsList></EchartsList>
  </div>
</template>

<script setup lang="ts">
import Headers from './component/Headers.vue';
import HandleContent from './component/HandleContent.vue';
import EchartsList from './component/EchartsList.vue';
import { onMounted } from 'vue';

</script>

<style lang="less" scoped>
</style>