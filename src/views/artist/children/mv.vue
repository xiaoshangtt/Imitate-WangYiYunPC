<template>
  <div class="mv">
    <ul class="mv-list clearfix">
      <li class="mv-item" v-for="mv in artistMv" :key="mv.id">
        <div class="img-bx">
          <img :src="mv?.imgurl" />
          <a href="" class="mask coverall"></a>
          <a href="" class="ply iconall"></a>
        </div>
        <p class="mv-name one-ellipsis">
          <a href="">{{ mv?.name }}</a>
        </p>
      </li>
    </ul>
    <pagination
      @changeCurrentPage="changeCurrentPage"
      :currentPage="currentPage"
      :total="artistMvTotal"
      :limit="limit"
      class="pagination"
    ></pagination>
  </div>
</template>

<script>
import { computed, ref, defineComponent } from "vue";

import Pagination from "@/components/pagination";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "mv",
  components: {
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = ref(route.query?.id || 0);
    const limit = ref(12);
    const currentPage = ref(1);

    store.dispatch("artist/ac_getArtistMv", id.value);
    const artistMv = computed(() => store.state.artist.artistMv);
    const artistMvTotal = computed(() =>
      parseInt((store.state.artist.artistMv.length || 1) / limit.value)
    );

    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value += i;
      } else {
        currentPage.value = i;
      }
    };

    return {
      limit,
      currentPage,
      changeCurrentPage,
      artistMv,
      artistMvTotal,
    };
  },
});
</script>

<style lang="less" scoped>
.mv {
  .mv-list {
    margin: 20px 0 0 -29px;
    .mv-item {
      float: left;
      width: 137px;
      height: 140px;
      padding-left: 29px;
      margin-bottom: 25px;
      .img-bx {
        position: relative;
        width: 137px;
        height: 103px;
        img {
          width: 100%;
          height: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-position: 0 -1170px;
        }
        .ply {
          position: absolute;
          width: 44px;
          height: 44px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-position: -30px -135px;
          &:hover {
            background-position: -30px -85px;
          }
        }
      }
      .mv-name {
        margin: 8px 0 3px;
        font-size: 14px;
        max-width: 90%;
      }
    }
  }
}
.pagination {
  margin-top: 20px;
}
</style>
