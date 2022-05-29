<template>
  <div class="album">
    <div class="album-wamp">
      <album-item title="热门新碟" :dataList="newAlbumWeekData"></album-item>
      <album-item title="全部新碟" :dataList="allAlbum">
        <template #title-slot>
          <div class="title-slot">
            <router-link :to="{ query: { area: 'ALL' } }">全部</router-link>
            <em>|</em>
            <router-link :to="{ query: { area: 'ZH' } }">华语</router-link>
            <em>|</em>
            <router-link :to="{ query: { area: 'EA' } }">欧美</router-link>
            <em>|</em>
            <router-link :to="{ query: { area: 'KR' } }">欧美</router-link>
            <em>|</em>
            <router-link :to="{ query: { area: 'JP' } }">日本</router-link>
          </div>
        </template>
      </album-item>
      <pagination
        :limit="limit"
        :total="allAlbumTotal"
        :currentPage="currentPage"
        class="pagination"
        @changeCurrentPage="changeCurrentPage"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import AlbumItem from "./childrencp/album-item.vue";
import Pagination from "@/components/pagination";

export default defineComponent({
  name: "Album",
  components: {
    AlbumItem,
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const limit = ref(40);
    const currentPage = ref(1);
    const currentArea = ref(route.query?.area || "ALL");

    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value += i;
      } else {
        currentPage.value = i;
      }
      getAllAlbumData();
    };

    const allAlbum = computed(() => store.state.discover.allAlbum);
    const allAlbumTotal = computed(() => store.state.discover.allAlbumTotal);
    const newAlbumWeekData = computed(() =>
      store.state.discover.newAlbumWeekData?.slice(0, 10)
    );

    store.dispatch("discover/ac_getNewAlbum", { limit: 10 });
    function getAllAlbumData() {
      store.dispatch("discover/ac_getAllAlbum", {
        limit: limit.value,
        offset: (currentPage.value - 1) * limit.value,
        area: currentArea.value,
      });
    }
    getAllAlbumData();

    const routeWatch = watch(
      () => route.query,
      () => {
        currentArea.value = route.query?.area || "ALL";
        currentPage.value = 1;
        getAllAlbumData();
      }
    );
    onUnmounted(() => {
      routeWatch();
    });

    return {
      limit,
      currentPage,
      changeCurrentPage,
      newAlbumWeekData,
      allAlbum,
      allAlbumTotal,
    };
  },
});
</script>

<style lang="less" scoped>
.album {
  width: calc(var(--default-banner-width));
  margin: 0 auto;
  box-sizing: border-box;
  .album-wamp {
    padding: 40px;
    border: 1px solid #d3d3d3;
  }
}
.title-slot {
  display: inline-block;
  margin-left: 20px;
  font-size: 12px;
  color: #666;
  a {
    color: #666;
  }
  a:hover {
    text-decoration: underline;
  }
  em {
    display: inline-block;
    margin: 0 10px;
    font-size: 10px;
    color: #c7c7c7;
    font-family: Arial, Helvetica, sans-serif;
  }
}
.pagination {
  margin-top: 20px;
}
</style>
