<template>
  <van-list finished-text="没有更多了">
    <van-cell v-for="item in editionData" :title="item.title" :label="item.tags" :key="item.id">
      <span class="platform">
        {{item.platform !== null ?
          item.platform === 'android' ? 'android' : 'ios'
          : null }}
      </span>
      <template #right-icon>
        <span @click="downPage(item.open,item.url)">
          下载 <van-icon name="down" />
        </span>
      </template>
    </van-cell>
  </van-list>
</template>

<script>
import { List,Cell,Icon } from 'vant';
import editionData from "../../../mock/edition-data";

export default {
  components: {
    VanList: List,
    VanCell: Cell,
    VanIcon: Icon
  },
  setup() {
    const downPage = (open,url) => {
      if(open === true) {
        window.open(url)
      } else {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = "javascript: '<script>location.href=\"" + url + "\"<\/script>'";
        document.getElementsByTagName('body')[0].appendChild(iframe);
      }
    }
    
    return {
      editionData,
      downPage,
    };
  },
};


</script>

<style scoped>
  .platform {
    font-size: 12px;
    margin-right: 8px;
  }
</style>
