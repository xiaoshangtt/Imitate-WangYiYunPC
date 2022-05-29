<template>
  <div class="ms-frame">
    <div class="hd" v-if="showHeader">
      <h3 class="title">
        <span>
          <slot name="title">{{ title }}</slot>
        </span>
        <slot name="title-slot"></slot>
      </h3>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MsFrame",
  props: {
    title: {
      type: String,
      default: "默认title",
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="less" scoped>
.ms-frame {
  .hd {
    height: 40px;
    border-bottom: 2px solid rgb(194, 12, 12);
    .title {
      position: relative;
      font-size: 24px;
      font-weight: normal;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    }
  }
}
</style>
