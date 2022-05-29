<template>
  <div class="toplist-nav-item">
    <div class="hd">
      <h2>{{ title }}</h2>
    </div>
    <div class="cont">
      <template v-for="item in dataList" :key="item.id">
        <toplist-nav-item-subitem
          class="toplist-nav-item-subitem"
          :class="
            $route?.query?.id == item.id
              ? 'toplist-nav-item-subitem-active'
              : ''
          "
          @click="changeCurrentToplistId(item.id)"
          :info="item"
        ></toplist-nav-item-subitem>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { useRouter } from "vue-router";

import ToplistNavItemSubitem from "./toplist-nav-item-subitem.vue";

export default defineComponent({
  name: "ToplistNavItem",
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
  components: {
    ToplistNavItemSubitem,
  },
  setup() {
    const router = useRouter();
    const changeCurrentToplistId = (id) => {
      router.push({
        query: {
          id,
        },
      });
    };

    return {
      changeCurrentToplistId,
    };
  },
});
</script>

<style lang="less" scoped>
.toplist-nav-item {
  display: block;

  .hd {
    padding: 0 10px 12px 15px;

    h2 {
      font-size: 14px;
      color: #000;
      font-family: simsun, \5b8b\4f53;
    }
  }
}

.toplist-nav-item-subitem:hover {
  background: #e6e6e6;
}

/deep/ .toplist-nav-item-subitem-active {
  background: #e6e6e6;
}
</style>
