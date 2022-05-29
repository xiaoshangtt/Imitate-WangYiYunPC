<template>
  <div class="artist clearfix">
    <div class="left">
      <artist-nav
        class="artist-nav"
        :ArtistNavConfig="ArtistNavConfig"
      ></artist-nav>
    </div>
    <div class="right">
      <div class="ri-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import ArtistNav from "./artist-nav.vue";

import { ArtistNavConfig } from "./artist-nav.config";
export default defineComponent({
  name: "Artist",
  components: {
    ArtistNav,
  },
  setup() {
    return {
      ArtistNavConfig,
    };
  },
});
</script>

<style lang="less" scoped>
.artist {
  width: var(--default-banner-width);
  margin: 0 auto;
  border: 1px solid #d3d3d3;
}
.left {
  position: relative;
  float: left;
  width: 180px;
  z-index: 20;
}
.right {
  float: right;
  width: 100%;
  margin-left: -181px;
  .ri-content {
    margin-left: 181px;
    border-left: 1px solid #d3d3d3;
    height: 500px;
  }
}
.artist-nav {
  margin-top: 51px;
}
</style>
