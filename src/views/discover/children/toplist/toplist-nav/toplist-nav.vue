<template>
  <div class="toplist-nav">
    <toplist-nav-item
      class="toplist-nav-item"
      title="云音乐特色榜"
      :dataList="dataList.slice(0, 4)"
    ></toplist-nav-item>
    <toplist-nav-item
      class="toplist-nav-item"
      title="云音乐特色榜"
      :dataList="dataList.slice(4)"
    ></toplist-nav-item>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import ToplistNavItem from "./toplist-nav-item.vue";

export default defineComponent({
  name: "ToplistNav",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ToplistNavItem,
  },
});
</script>

<style lang="less" scoped>
.toplist-nav {
  padding-top: 40px;
  background: #f9f9f9;
  .toplist-nav-item {
    margin-bottom: 20px;
  }
}
</style>
