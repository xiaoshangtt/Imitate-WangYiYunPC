<template>
  <div class="category">
    <new-dj
      v-if="djCategoryRecommend?.length"
      :dataList="djCategoryRecommend"
      title="优秀新电台"
      class="new-dj"
    ></new-dj>
    <dj-toplist
      v-if="djToplist?.length"
      class="dj-toplist"
      title="电台排行榜"
      :dataList="djToplist"
    >
      <template #title-slot>
        <div class="title-slot">
          <div class="cntst">
            <span class="hover_underline active">上升最快</span>
            <i>|</i>
            <span class="hover_underline">最热电台</span>
          </div>
        </div>
      </template>
    </dj-toplist>
    <pagination
      class="pagination"
      @changeCurrentPage="changeDjCurrentPage"
      :limit="djtoplistLimit"
      :currentPage="currentDjToplistPage"
      :total="djToplistTotal"
    ></pagination>
  </div>
</template>

<script>
import { defineComponent, computed, watch, ref } from "vue";

import NewDj from "../childrencp/new-dj.vue";
import DjToplist from "../childrencp/dj-toplist.vue";
import Pagination from "@/components/pagination";
import { useStore } from "vuex";

import { emitter } from "@/utils";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Category",
  components: {
    NewDj,
    DjToplist,
    Pagination,
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const cateId = route?.query?.id || 0;
    if (cateId == 0) {
      router.push({
        path: "/discover/djradio",
      });
    }
    const djtoplistLimit = ref(30);
    const currentDjToplistPage = ref(1);

    const djCategoryRecommend = computed(
      () => store.state.discover.djCategoryRecommend
    );
    const djToplist = computed(
      () => store.state.discover.djToplist?.djRadios || []
    );
    const djToplistTotal = computed(
      () => store.state.discover.djToplist?.total || 0
    );

    function getDjData(id) {
      store.dispatch("discover/ac_getDjCategoryRecommend", id);
      store.dispatch("discover/ac_getDjHotToplist", {
        limit: djtoplistLimit.value,
        offset: (currentDjToplistPage.value - 1) * djtoplistLimit.value,
        cateId,
      });
    }
    getDjData(cateId);
    emitter.on("changeProgram", (cateId) => {
      getDjData(cateId);
    });

    const changeDjCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentDjToplistPage.value += i;
      } else {
        currentDjToplistPage.value = i;
      }
      getDjData(route?.query?.id);
    };

    return {
      djCategoryRecommend,
      djtoplistLimit,
      currentDjToplistPage,
      djToplist,
      djToplistTotal,
      changeDjCurrentPage,
    };
  },
});
</script>

<style lang="less" scoped>
.new-dj {
  margin-top: 10px;
}
.dj-toplist {
  margin-top: 35px;
}
.pagination {
  margin-top: 20px;
}
.title-slot {
  float: right;
  .cntst {
    float: right;
    font-size: 12px;
    line-height: 40px;
    color: rgb(102, 102, 102);
    span.active {
      color: rgb(194, 12, 12);
    }
    i {
      margin: 0 10px;
      color: rgb(199, 199, 199);
      font-size: 10px;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
}
</style>
