<template>
  <div class="recommend">
    <recommend-radp :dataList="recommendProgram">
      <template #title>
        <a class="hover_underline" href="">推荐节目</a>
        <span class="tip">（每日更新）</span>
      </template>
      <template #cnt="{ radio }">
        <div class="cnt one-ellipsis">
          <a
            class="one-ellipsis hover_underline"
            href=""
            :title="radio?.dj?.brand"
            >{{ radio?.dj?.brand }}</a
          >
        </div>
      </template>
      <template #pris="{ radio }">
        <div class="playerCount">播放{{ radio?.listenerCount }}</div>
        <div class="praise">赞{{ radio?.likedCount }}</div>
      </template>
    </recommend-radp>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import RecommendRadp from "../childrencp/recommend-radp.vue";

export default defineComponent({
  name: "Recommend",
  components: {
    RecommendRadp,
  },
  setup() {
    const store = useStore();

    const recommendProgram = computed(
      () => store.state.discover.recommendProgram
    );

    store.dispatch("discover/ac_getRecommendProgram");

    return {
      recommendProgram,
    };
  },
});
</script>

<style lang="less" scoped>
.tip {
  margin-left: 10px;
  font-size: 12px;
  color: #999;
}
.cnt,
.playerCount,
.praise {
  float: left;
}
.cnt a,
.playerCount,
.praise {
  color: #666;
}
.cnt {
  width: 166px;
}
.playerCount {
  width: 90px;
}
.praise {
  width: 126px;
}
</style>
