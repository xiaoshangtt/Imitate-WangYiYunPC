<template>
  <ul class="event-list" ref="eventListRef">
    <template v-for="(eventInfo, index) in dataList" :key="index">
      <event-list-item :eventInfo="eventInfo"></event-list-item>
    </template>
  </ul>
</template>

<script>
import { defineComponent, onMounted, ref, getCurrentInstance } from "vue";

import EventListItem from "./event-list-item.vue";

import { throttle } from "@/utils";

export default defineComponent({
  name: "EventList",
  components: {
    EventListItem,
  },
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["scrollDoneBottom"],
  setup(props, context) {
    const ctx = getCurrentInstance().ctx;
    const eventListRef = ref(null);
    onMounted(() => {
      const rootAppEle = ctx.$root.$el.parentNode;
      const eventListContent = eventListRef.value;

      rootAppEle.addEventListener(
        "scroll",
        throttle(
          (e) => {
            const target = e.target;
            const scrollDoneHeight = target.scrollTop + target.offsetHeight;
            const eventListBottomTheTop =
              eventListContent.offsetTop + eventListContent.offsetHeight;
            if (scrollDoneHeight > eventListBottomTheTop) {
              context.emit("scrollDoneBottom");
            }
          },
          1000,
          this
        )
      );
    });
    return {
      eventListRef,
    };
  },
});
</script>

<style scoped></style>
