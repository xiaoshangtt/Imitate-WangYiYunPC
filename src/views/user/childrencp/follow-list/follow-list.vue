<template>
  <div class="follow-list">
    <template v-for="info in dataList" :key="info.userId">
      <follow-list-item
        :info="info"
        class="follow-list-item"
      ></follow-list-item>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import FollowListItem from "./follow-list-item.vue";

export default defineComponent({
  name: "FollowList",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    FollowListItem,
  },
});
</script>

<style lang="less" scoped>
.follow-list {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  border-top: none;
  .follow-list-item {
    box-sizing: border-box;
    width: 50%;
    padding: 20px;
  }
  .follow-list-item:nth-child(2n + 1) {
    border-right: 1px solid #ccc;
  }
  .follow-list-item:last-child {
    padding-bottom: 40px;
  }
  .follow-list-item:nth-child(4n - 1),
  .follow-list-item:nth-child(4n) {
    background-color: #fafafa;
  }
}
</style>
