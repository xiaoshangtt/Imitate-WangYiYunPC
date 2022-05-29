<template>
  <div class="toplist-nav-item-subitem">
    <div class="toplist-it clearfix">
      <div class="toplist-img">
        <img :src="info?.coverImgUrl" alt="" />
      </div>
      <div class="txt">
        <p class="toplist-name">{{ info?.name }}</p>
        <p class="updated">{{ info?.updateFrequency }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopListNavItemSubItem",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="less" scoped>
.toplist-nav-item-subitem {
  padding: 10px 0 10px 20px;
  font-size: 12px;
  cursor: pointer;
  .toplist-it {
    .toplist-img {
      float: left;
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .txt {
      padding-left: 10px;
      float: left;
      .toplist-name {
        margin-top: 2px;
      }
      .updated {
        margin-top: 10px;
        color: #999;
      }
    }
  }
}
</style>
