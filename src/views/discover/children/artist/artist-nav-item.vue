<template>
  <div class="artist-nav-item">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <ul class="nav-list clearfix">
      <li v-for="(item, index) in dataList" :key="index">
        <router-link
          class="cat-f singer"
          :class="
            item?.selectId == id ||
            (item?.selectId == '9999' && !$route?.query?.id)
              ? 'singer-active'
              : 'singer-default'
          "
          :to="{
            path: item?.url,
            query: { id: item?.selectId },
          }"
          >{{ item?.title }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ArtistNavItem",
  props: {
    title: {
      type: String,
      default: "默认title",
    },
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const route = useRoute();
    const id = computed(() => route?.query?.id || 0);

    return {
      id,
    };
  },
});
</script>

<style lang="less" scoped>
.artist-nav-item {
  .title {
    font-size: 15px;
    height: 25px;
    padding-left: 14px;
  }
  .nav-list {
    li {
      float: left;
      width: 160px;
      margin-bottom: 2px;
      &,
      & a {
        height: 29px;
        line-height: 29px;
      }
      & a:hover {
        text-decoration: underline;
      }
      a.cat-f {
        float: left;
        font-size: 12px;
        padding-left: 27px;
        color: #333;
        width: 133px;
      }
    }
  }
}
</style>
