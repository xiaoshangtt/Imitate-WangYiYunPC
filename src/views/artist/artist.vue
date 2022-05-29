<template>
  <div class="artist clearfix">
    <div class="left">
      <div class="left-wamp">
        <div class="left-wamp-wp">
          <artist-header :info="artistDetail"></artist-header>
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-bx">
        <detail-reco>
          <template #right>
            <right-reco-item title="相似歌手">
              <template #pl-item>
                <ul class="simiar clearfix">
                  <li
                    v-for="artist in simiArtist?.slice(0, 6)"
                    :key="artist.id"
                  >
                    <div class="img-bx">
                      <router-link
                        :to="{ path: '/artist', query: { id: artist?.id } }"
                      >
                        <img :src="artist?.picUrl" />
                      </router-link>
                    </div>
                    <p class="artist-name one-ellipsis">
                      <router-link
                        :to="{ path: '/artist', query: { id: artist?.id } }"
                        >{{ artist?.name }}</router-link
                      >
                    </p>
                  </li>
                </ul>
              </template>
            </right-reco-item>
          </template>
        </detail-reco>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import ArtistHeader from "./childrencp/artist-header.vue";
import DetailReco from "@/components/detail-page/children/detail-reco.vue";
import RightRecoItem from "@/components/right_reco_item";

export default defineComponent({
  name: "Artist",
  components: {
    ArtistHeader,
    DetailReco,
    RightRecoItem,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = ref(route.query?.id || 0);

    function getArtistData() {
      store.dispatch("artist/ac_getArtistDetail", id.value);
      store.dispatch("artist/ac_getSimiArtist", id.value);
    }
    getArtistData();
    // 获取歌手详情
    const artistDetail = computed(() => store.state.artist.artistDetail);
    // 获取相似歌手
    const simiArtist = computed(() => store.state.artist.simiArtist);

    watch(
      () => route.query,
      () => {
        id.value = route.query.id;
        getArtistData();
      }
    );

    return {
      artistDetail,
      simiArtist,
    };
  },
});
</script>

<style lang="less" scoped>
.artist {
  position: relative;
  width: calc(var(--default-banner-width) + 2px);
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  font-size: 12px;
  .left {
    float: left;
    width: 100%;
    margin-right: -270px;
    .left-wamp {
      margin-right: 270px;
      border: 1px solid #d3d3d3;
      .left-wamp-wp {
        padding: 47px 30px 40px 39px;
        .content {
        }
      }
    }
  }
  .right {
    float: right;
    width: 270px;
    .right-bx {
      padding: 20px 40px 40px 30px;
    }
  }
}
.simiar {
  margin-left: -25px;
  li {
    float: left;
    width: 50px;
    height: 92px;
    padding-left: 25px;
    .img-bx {
      widows: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .artist-name {
      max-width: 95%;
      margin: 7px;
      text-align: center;
    }
  }
}
</style>
