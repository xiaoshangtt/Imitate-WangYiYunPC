<template>
  <div class="list-song">
    <ms-frame :showHeader="showHeader" :title="title">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #title-slot>
        <slot name="title-slot"></slot>
      </template>
      <template #content>
        <div
          class="list-content"
          ref="listContentRef"
          :style="{ 'margin-left': songContentMarginLeft }"
        >
          <template v-for="(song, index) in dataList" :key="song.id || index">
            <one-song
              :moEllipsis="moEllipsis"
              class="one-song"
              :song="song"
              v-bind="songOptions"
            >
              <template #song-text="{ song }">
                <slot name="song-text" :song="song"></slot>
              </template>
              <template #song-subtext="{ song }">
                <slot name="song-subtext" :song="song"></slot>
              </template>
            </one-song>
          </template>
        </div>
      </template>
    </ms-frame>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import OneSong from "@/components/one-song/one-song.vue";
import MsFrame from "@/components/ms-frame";
import { throttle } from "@/utils";

export default defineComponent({
  name: "ListSong",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    moEllipsis: {
      validate(value) {
        return value in ["one", "two"];
      },
      default: "one",
    },
    title: {
      type: String,
      default: "默认title",
    },
    songOptions: {
      type: Object,
      default: () => ({}),
    },
    songContentMarginLeft: {
      type: String,
      default: "-50px",
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    OneSong,
    MsFrame,
  },
  emits: ["AlScrollBottom"],
  setup(props, context) {
    const listContentRef = ref(null);
    onMounted(() => {
      const rootAppEle = document.getElementById("app");
      const listContente = listContentRef.value;
      // 当滑动到listContent底部时，会父组件发送emit，通知获取新的数据
      rootAppEle?.addEventListener(
        "scroll",
        throttle(
          (e) => {
            // rootAppEle.offsetHeight是当前滑动的可视区域高度
            const target = e.target;
            const scrollHeight = target.scrollTop + target.offsetHeight;
            const listContentBottom =
              listContente.offsetTop + listContente.offsetHeight;
            if (scrollHeight > listContentBottom - 80) {
              context.emit("AlScrollBottom");
            }
          },
          200,
          this
        )
      );
    });
    return {
      listContentRef,
    };
  },
});
</script>

<style lang="less" scoped>
.list-song {
  .list-content {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    margin-left: -50px;
    padding-top: 20px;

    .one-song {
      margin: 0 0 30px 50px;
    }
  }
}
</style>
