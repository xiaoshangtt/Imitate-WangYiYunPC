<template>
  <div class="default">
    <div class="recommend-top clearfix">
      <recommend-radp
        v-if="recommendProgram?.length"
        class="recommend-radp"
        :dataList="recommendProgram.slice(0, 10)"
        :showTag="true"
      >
        <template #title>
          <router-link to="/discover/djradio/recommend" class="hover_underline"
            >推荐节目</router-link
          >
        </template>
        <template #title-slot>
          <div class="title-slot">
            <router-link to="/discover/djradio/recommend">更多&gt;</router-link>
          </div>
        </template>
      </recommend-radp>
      <recommend-radp
        v-if="programToplist?.length"
        class="recommend-radp"
        :dataList="programToplist.slice(0, 10)"
      >
        <template #title>
          <router-link to="/discover/djradio/rank" class="hover_underline"
            >节目排行榜</router-link
          >
        </template>
        <template #title-slot>
          <div class="title-slot">
            <router-link :to="{ path: '/discover/djradio/rank' }"
              >更多&gt;</router-link
            >
          </div>
        </template>
        <template #pre="{ index }">
          <div class="pre">
            <span class="index">{{
              index + 1 < 10 ? "0" + (index + 1) : index + 1
            }}</span>
            <i class="icon q-icon q-icon-new"></i>
          </div>
        </template>
        <template #pris="{ radio }">
          <div class="pris">
            <i class="progress">
              <i
                class="progress-value"
                :style="{
                  width:
                    parseInt(
                      String((radio.score / programToplistScoreCon || 0) * 100)
                    ) + '%',
                }"
              ></i>
            </i>
          </div>
        </template>
      </recommend-radp>
    </div>
    <default-recommend-item
      v-if="Object.keys(djRecommend?.djMusicRecommend).length"
      title="音乐推荐"
      class="dj-recommend-item"
      :info="djRecommend?.djMusicRecommend"
    ></default-recommend-item>
    <default-recommend-item
      v-if="Object.keys(djRecommend?.djLifeRecommend).length"
      title="生活"
      class="dj-recommend-item"
      :info="djRecommend?.djLifeRecommend"
    ></default-recommend-item>
    <default-recommend-item
      v-if="Object.keys(djRecommend?.djEmotionRecommend).length"
      title="情感"
      class="dj-recommend-item"
      :info="djRecommend?.djEmotionRecommend"
    ></default-recommend-item>
    <default-recommend-item
      v-if="Object.keys(djRecommend?.djCreateCoverRecommend).length"
      title="创作翻唱"
      class="dj-recommend-item"
      :info="djRecommend?.djCreateCoverRecommend"
    ></default-recommend-item>
    <default-recommend-item
      v-if="Object.keys(djRecommend?.djKnowledgeRecommend).length"
      title="知识"
      class="dj-recommend-item"
      :info="djRecommend?.djKnowledgeRecommend"
    ></default-recommend-item>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

import DefaultRecommendItem from "../childrencp/default-recommend-item.vue";
import RecommendRadp from "../childrencp/recommend-radp.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Default",
  components: {
    DefaultRecommendItem,
    RecommendRadp,
  },
  setup() {
    const store = useStore();
    const djRecommend = computed(() => store.state.discover.djRecommend);
    const recommendProgram = computed(
      () => store.state.discover.recommendProgram
    );
    const programToplist = computed(() => store.state.discover.programToplist);
    const programToplistScoreCon = computed(
      () => store.getters["discover/ge_getProgramToplistScoreCon"]
    );

    store.dispatch("discover/ac_getDjRecommend");
    store.dispatch("discover/ac_getRecommendProgram");
    store.dispatch("discover/ac_getProgramToplist");

    return {
      djRecommend,
      recommendProgram,
      programToplist,
      programToplistScoreCon,
    };
  },
});
</script>

<style lang="less" scoped>
.dj-recommend-item {
  margin-top: 35px;
}
.recommend-radp {
  width: 426px;
  &:nth-child(1) {
    float: left;
  }
  &:nth-child(2) {
    float: right;
  }
}
.program-toplist {
  float: right;
  width: 426px;
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
.pre {
  position: relative;
  width: 47px;
  float: left;
  margin-right: -20px;
  padding-top: 6px;
  line-height: normal;
  text-align: center;
  .index {
    display: block;
  }
  .icon {
    width: 16px;
    height: 17px;
  }
}
.pris {
  position: relative;
  top: -80%;
  float: right;
  right: 4px;
  width: 80px;
  height: 8px;
  border-radius: 10px;
  overflow: hidden;
  .progress,
  .progress .progress-value {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: 100%;
  }
  .progress {
    width: 100%;
    background-color: #dedede;
    .progress-value {
      width: 20%;
      background-color: #c6c6c6;
    }
  }
}
</style>
