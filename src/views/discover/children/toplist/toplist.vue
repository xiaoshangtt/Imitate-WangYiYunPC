<template>
  <div class="toplist clearfix">
    <div class="toplist-nav-bx">
      <toplist-nav :dataList="toplist"></toplist-nav>
    </div>
    <div
      class="toplist-cont-bx"
      :class="Object.keys(currentTopList).length > 0 ? '' : 'opacity0'"
    >
      <toplist-content :info="currentTopList"></toplist-content>
      <div class="comments">
        <comment
          class="comment"
          :comments="toplistComment?.comments"
          :total="toplistComment?.comments?.length || 0"
        ></comment>
        <pagination
          :currentPage="currentPage"
          :limit="limit"
          :total="toplistCommentTotal"
          @changeCurrentPage="changeCurrentPage"
          class="pagination"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, defineComponent, watch } from "vue";

import ToplistNav from "./toplist-nav/toplist-nav.vue";
import ToplistContent from "./toplist-content/toplist-content.vue";
import Pagination from "@/components/pagination";
import comment from "@/components/comment";

import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TopList",
  components: {
    ToplistNav,
    ToplistContent,
    Pagination,
    comment,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const limit = ref(20);
    const currentPage = ref(1);

    const currentToplistId = ref(
      route.query.id || store.state.discover?.toplist[0]?.id || 0
    );

    store.dispatch("discover/getToplist");

    function getToplistComment(id) {
      store.dispatch("discover/getToplistComment", {
        id,
        limit: limit.value,
        offset: (currentPage.value - 1) * limit.value,
      });
    }

    watch(
      () => store.state.discover.toplist,
      () => {
        if (!currentToplistId.value) {
          currentToplistId.value = store.state.discover.toplist[0]?.id;
        }
        getToplistComment(currentToplistId.value);
      },
      { deep: true }
    );

    function getToplistDetailId() {
      store.dispatch("discover/getToplistDetailId", currentToplistId.value);
      currentPage.value = 1;
    }

    watch(
      () => route.query.id,
      () => {
        currentToplistId.value = route.query.id || 0;
        getToplistDetailId();
      }
    );

    getToplistDetailId();

    const currentTopList = computed(() =>
      store.getters["discover/getCurrentShowToplist"](currentToplistId.value)
    );

    const toplistComment = computed(
      () => store.state.discover.toplistComment || {}
    );
    const toplistCommentTotal = computed(
      () => store.state.discover.toplistComment.total || 0
    );

    const toplist = computed(() => store.state.discover.toplist);

    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value = currentPage.value + i;
      } else {
        currentPage.value = i;
      }
      getToplistComment(currentToplistId.value);
    };

    return {
      toplist,
      currentToplistId,
      currentTopList,
      toplistComment,
      currentPage,
      limit,
      toplistCommentTotal,
      changeCurrentPage,
    };
  },
});
</script>

<style lang="less" scoped>
.toplist {
  width: calc(var(--default-banner-width) + 2px);
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  padding-bottom: 40px;

  .toplist-nav-bx {
    float: left;
    width: 240px;
  }

  .toplist-cont-bx {
    float: left;
    width: 740px;
    border-left: 1px solid #ccc;
    box-shadow: 0 0 2px #ccc;
  }
}

.comments {
  padding: 0 30px 0 40px;

  .comment {
    margin-bottom: 25px;
  }
}
</style>
