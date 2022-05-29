<template>
  <div>
    <div class="hd">
      <slot name="t-hd">
        <h3>{{ title }}</h3>
      </slot>
    </div>
    <div class="hd-cont">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserInfoContent",
  props: {
    title: {
      type: String,
      default: "默认title",
    },
  },
});
</script>

<style lang="less" scoped>
.hd {
  border-bottom: 2px solid #c20c0c;
  padding: 6px 0;
  font-weight: 400;
  font-size: 20px;
}
</style>
