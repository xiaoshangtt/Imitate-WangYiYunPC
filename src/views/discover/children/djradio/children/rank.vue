<template>
  <div class="rank">
    <recommend-radp :dataList="programToplist">
      <template #title>
        <a class="hover_underline" href="">节目排行榜</a>
        <span class="tip">最近更新：05月03日</span>
      </template>
      <template #pre="{ radio }">
        <div class="pre">
          <span class="index">{{
            radio?.rank < 10 ? "0" + radio?.rank : radio?.rank
          }}</span>
          <i class="icon q-icon q-icon-new"></i>
        </div>
      </template>
      <template #cnt="{ radio }">
        <div class="cnt one-ellipsis">
          <router-link
            class="hover_underline"
            :to="{ path: '/djradio', query: { id: radio?.radio?.id } }"
            >{{ radio?.radio?.name }}</router-link
          >
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
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import RecommendRadp from "../childrencp/recommend-radp.vue";

export default defineComponent({
  name: "Rank",
  components: {
    RecommendRadp,
  },
  setup() {
    const store = useStore();
    store.dispatch("discover/ac_getProgramToplist");

    const programToplist = computed(() => store.state.discover.programToplist);

    // 获取对比成绩
    const programToplistScoreCon = computed(
      () => store.getters["discover/ge_getProgramToplistScoreCon"]
    );

    return {
      programToplist,
      programToplistScoreCon,
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
.cnt {
  float: left;
  width: 176px;
}
.pris {
  position: relative;
  float: right;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  width: 100px;
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
