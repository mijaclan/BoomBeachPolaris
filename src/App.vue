<template>
  <van-tabs v-model:active="activeName">
    <van-tab title="北极星☆" name="polaris"><Polaris/></van-tab>
    <van-tab title="消耗计算" name="reckon"><Reckon/></van-tab>
    <van-tab title="版本包" name="edition"><Edition/></van-tab>
  </van-tabs>
</template>

<script>
import Reckon from './views/reckon/index.vue'
import Polaris from './views/polaris/index.vue'
import Edition from './views/edition/index.vue'
import { ref } from 'vue';
import { Tabs,Tab } from 'vant';

export default {
  components: {
    VanTabs: Tabs,
    VanTab: Tab,
    Reckon:Reckon,
    Polaris:Polaris,
    Edition:Edition
  },
  setup() {
    const activeName = ref('reckon');
    return { activeName };
  },
};
</script>

<style scoped>
 :global(.van-tabs__line) {
   background: #9eb6e8;
 }
</style>
