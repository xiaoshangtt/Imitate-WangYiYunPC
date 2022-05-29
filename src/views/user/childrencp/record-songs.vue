<template>
  <div class="play-record">
    <ul class="record-list clearfix">
      <li
        class="record-item clearfix"
        v-for="(data, index) in dataList"
        :key="data?.song?.id"
      >
        <slot name="record-item" :data="data" :index="index"></slot>
      </li>
    </ul>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RecordSongs",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="less" scoped>
.play-record {
  .record-list {
    width: 100%;
    border: 1px solid #ddd;
    border-top: none;
    .record-item {
      float: left;
      width: 100%;
      &:nth-child(2n) {
        background-color: #f7f7f7;
      }
    }
  }
}
</style>
