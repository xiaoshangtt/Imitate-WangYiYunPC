<template>
  <div class="default-recommend-item">
    <dj-toplist :dataList="info?.list" class="dj-ii">
      <template #title>
        <router-link
          class="hover_underline"
          :to="{ path: '/discover/djradio/category', query: { id: info?.id } }"
          >{{ title }}</router-link
        >
        <i class="spli">·</i>
        <span>电台</span>
      </template>
      <template #title-slot>
        <div class="title-slot">
          <router-link
            :to="{
              path: '/discover/djradio/category',
              query: { id: info?.id },
            }"
            >更多&gt;</router-link
          >
        </div>
      </template>
    </dj-toplist>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import DjToplist from "./dj-toplist.vue";

export default defineComponent({
  name: "DefaultRecommendItem",
  components: {
    DjToplist,
  },
  props: {
    info: {
      type: Object,
      default: () => ({ list: [], id: 0 }),
    },
    title: {
      type: String,
      default: () => "默认title",
    },
  },
});
</script>

<style lang="less" scoped>
.default-recommend-item {
  .spli {
    font-size: 24px;
    font-family: simsun, \5b8b\4f53;
  }
  .title-slot {
    float: right;
    font-size: 12px;
    line-height: 40px;
    cursor: pointer;
    a {
      color: rgb(102, 102, 102);
    }
  }
}
</style>
