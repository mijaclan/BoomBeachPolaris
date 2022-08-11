<template>
  <div class="header">
    <VanImage class="img" width="95%" height="150" src="https://i.imgtg.com/2022/08/09/AHGLN.jpg"/>
  </div>
  <div class="info">
    <p>特遣队: 北极星☆Polaris</p>
    <p>特遣队标签: #PP222GY0</p>
    <p>QQ群: 1034449733</p>
  </div>
  
  <div class="action">
    <p>
      <a class="down" download="https://files.catbox.moe/xe9uya.pdf">北极星队员手册 <van-icon name="down" /></a>
    </p>
  </div>
  
</template>

<script>
import { Image as VanImage } from 'vant';
import { Icon } from 'vant';
export default {
  components: {
    VanImage: Image,
    VanIcon: Icon
  },
  setup() {
  
  }
}


</script>

<style scoped>
  .header {
    margin-top: 7px;
    display: flex;
  }

  .img {
    margin: auto;
  }
  
  .info {
    margin-left: 15px;
  }
  .action {
    margin-left: 15px;
  }
  
  .down {
    color: cornflowerblue;
  }
  
</style>
