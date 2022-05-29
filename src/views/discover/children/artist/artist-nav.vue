<template>
  <div class="artist-nav">
    <artist-nav-item
      class="artist-nav-item"
      v-for="navInfo in ArtistNavConfig"
      :dataList="navInfo?.subnav"
      :title="navInfo?.title"
      :key="navInfo.title"
    ></artist-nav-item>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import ArtistNavItem from "./artist-nav-item.vue";

export default defineComponent({
  name: "ArtistNav",
  props: {
    ArtistNavConfig: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ArtistNavItem,
  },
});
</script>

<style lang="less" scoped>
.artist-nav {
  padding: 0 10px 40px;
}
.artist-nav-item:nth-child(n + 2) {
  border-top: 1px solid #d3d3d3;
  margin: 5px 0 0;
  padding-top: 16px;
}
</style>
