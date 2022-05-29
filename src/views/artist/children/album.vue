<template>
  <div class="album">
    <ul class="album-list clearfix">
      <li class="album-item" v-for="album in artistAlbum" :key="album.id">
        <div class="img-bx">
          <img :src="album?.picUrl" />
          <router-link
            :to="{ path: '/album', query: { id: album?.id } }"
            class="al-bg coverall"
          ></router-link>
          <a href="" class="ply iconall"></a>
        </div>
        <p class="album-name one-ellipsis">
          <router-link :to="{ path: '/album', query: { id: album?.id } }">{{
            album?.name
          }}</router-link>
        </p>
        <p class="time one-ellipsis">
          <span>{{ formatDate("YYYY.MM.DD", album?.publishTime) }}</span>
        </p>
      </li>
    </ul>
    <pagination
      :limit="limit"
      :total="artitsAlbumTotal"
      :currentPage="currentPage"
      @changeCurrentPage="changeCurrentPage"
      class="pagination"
    ></pagination>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";

import Pagination from "@/components/pagination";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import { formatDate } from "@/utils";

export default defineComponent({
  name: "Album",
  components: {
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = ref(route.query?.id || 0);
    const limit = ref(12);
    const currentPage = ref(1);

    function getArtistAlbumData() {
      store.dispatch("artist/ac_getArtistAlbum", {
        id: id.value,
        limit: limit.value,
        offset: (currentPage.value - 1) * limit.value,
      });
    }
    getArtistAlbumData();
    const artistAlbum = computed(
      () => store.state.artist.artistAlbum?.hotAlbums
    );
    const artitsAlbumTotal = computed(
      () => store.state.artist.artistAlbum?.artist?.albumSize
    );
    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value += i;
      } else {
        currentPage.value = i;
      }
      getArtistAlbumData();
    };

    return {
      formatDate,
      currentPage,
      limit,
      artistAlbum,
      artitsAlbumTotal,
      changeCurrentPage,
    };
  },
});
</script>

<style lang="less" scoped>
.album {
  .album-list {
    margin-left: -18px;
    margin-top: 20px;
    .album-item {
      float: left;
      width: 145px;
      height: 175px;
      padding-left: 18px;
      margin-bottom: 25px;
      .img-bx {
        position: relative;
        width: 120px;
        height: 120px;
        &:hover {
          .ply {
            display: block;
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
        .al-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 145px;
          height: 120px;
          background-position: -170px -850px;
        }
        .ply {
          display: none;
          position: absolute;
          right: 10px;
          bottom: 5px;
          width: 28px;
          height: 28px;
          background-position: 0 -140px;
          &:hover {
            background-position: 0 -170px;
          }
        }
      }
      .album-name {
        font-size: 14px;
        line-height: 19px;
        margin: 8px 0 3px;
        &:hover {
          text-decoration: underline;
        }
      }
      .album-name,
      .time {
        max-width: 90%;
      }
      .time {
        color: #666;
      }
    }
  }
}
.pagination {
  margin-top: 20px;
}
</style>
