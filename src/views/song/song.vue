<template>
  <div class="song">
    <detail-page
      :info="songDetailInfo"
      :hotComments="songComment.hotComments"
      :comments="songComment.comments"
      :commentTotal="songComment.total"
      :commentCurrentPage="currentPage"
      :commentLimit="limit"
      :showComment="true"
      @changeCurrentPage="changeCurrentPage"
    >
      <template #cover-img="{ info }">
        <div class="cover-img">
          <img v-lazy="info?.al?.picUrl" alt="" />
          <span class="cover-mask coverall"></span>
        </div>
      </template>
      <template #bt-tp="{ info }">
        <div class="bt-tp">
          <p>
            <i>歌手：</i>
            <router-link
              v-for="(ar, index) in info?.ar || []"
              :key="ar?.id"
              :to="{ path: '/artist', query: { id: ar?.id || 0 } }"
            >
              &nbsp;
              <template v-if="index != 0"> / </template>
              &nbsp;
              {{ ar?.name }}
            </router-link>
          </p>
          <p>
            <i>所属专辑：</i>
            <router-link :to="{ path: '/album', id: info?.al?.id }">{{
              info?.al?.name
            }}</router-link>
          </p>
        </div>
      </template>
      <template #btns>
        <div class="btns clearfix">
          <a
            href="javascript:void(0)"
            @click="
              $store.dispatch('musiclist/ac_changePlayMusic', songDetailInfo)
            "
            class="ply button2"
          >
            <i class="button2">
              <em class="ply-icon button2"></em>
              播放
            </i>
          </a>
          <a href="javascript:void(0)" class="ad button2"></a>
          <a href="javascript:void(0)" class="fav i-btnu button2">
            <span class="button2">收藏</span>
          </a>
          <a href="javascript:void(0)" class="share i-btnu button2">
            <span class="button2">分享</span>
          </a>
          <a href="javascript:void(0)" class="download i-btnu button2">
            <span class="button2">下载</span>
          </a>
          <a href="javascript:void(0)" class="comment i-btnu button2">
            <span class="button2">({{ songComment.total }})</span>
          </a>
        </div>
      </template>
      <template #bt-bm>
        <div class="bt-bm">
          <p>{{ lyric }}</p>
        </div>
      </template>
      <template #right>
        <right-reco-item title="相似歌曲" :dataList="simiSong">
          <template #pl-item="{ dataList }">
            <div class="pl-item">
              <div
                v-for="dataListItem in dataList"
                :key="dataListItem.id"
                class="song-item clearfix"
              >
                <div class="song-txt">
                  <p class="song-txt-sn one-ellipsis">
                    <router-link
                      :to="{ path: '/song', query: { id: dataListItem?.id } }"
                      >{{ dataListItem?.name }}</router-link
                    >
                  </p>
                  <p class="song-txt-an one-ellipsis">
                    <router-link
                      :to="{
                        path: '/artist',
                        query: { id: dataListItem?.artists[0].id },
                      }"
                      >{{ dataListItem?.artists[0]?.name }}</router-link
                    >
                  </p>
                </div>
                <div class="song-icon">
                  <i
                    class="song-play q-icon2 cursor_pointer"
                    @click="
                      $store.dispatch(
                        'musiclist/ac_changePlayMusic',
                        dataListItem
                      )
                    "
                  ></i>
                  <i
                    class="song-add q-icon2 cursor_pointer"
                    @click="
                      $store.commit('musiclist/mu_addMusic', dataListItem)
                    "
                  ></i>
                </div>
              </div>
            </div>
          </template>
        </right-reco-item>
      </template>
    </detail-page>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import DetailPage from "@/components/detail-page";
import RightRecoItem from "@/components/right_reco_item";

import { toWan } from "@/utils";

export default defineComponent({
  name: "Playlist",
  components: {
    DetailPage,
    RightRecoItem,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = ref(route.query.id || 0);
    const limit = ref(20);
    const currentPage = ref(1);
    const total = computed(() => store.state.song.playlistComment.total);
    const CommentPageRef = ref(null);

    // type是相加还是赋值，j是加d是赋值 默认d
    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value = currentPage.value + i;
      } else {
        currentPage.value = i;
      }
      getCommentData();
    };
    function getSongData() {
      // 获取歌曲详情信息
      store.dispatch("song/ac_getSongDetailInfo", id.value);
      // 获取歌词
      store.dispatch("song/ac_getLyric", id.value);
      getCommentData();
    }
    getSongData();

    const songDetailInfo = computed(() => store.state.song.songDetailInfo);

    const lyric = computed(() => store.state.song.lyric.lyric);
    // 获取歌曲评论
    function getCommentData() {
      store.dispatch("song/ac_getSongComment", {
        id: id.value,
        limit: limit.value,
        offset: (currentPage.value - 1) * limit.value,
      });
    }
    const songComment = computed(() => store.state.song.songComment);

    store.dispatch("song/getSimiSong", id.value);
    const simiSong = computed(() => store.state.song.simiSong);

    watch(
      () => route.query,
      () => {
        currentPage.value = 1;
        id.value = route.query?.id || 0;
        getSongData();
      }
    );

    return {
      toWan,
      currentPage,
      limit,
      total,
      CommentPageRef,
      changeCurrentPage,
      songDetailInfo,
      lyric,
      songComment,
      simiSong,
    };
  },
});
</script>

<style lang="less" scoped>
a {
  color: #0c73c2;
}
.cover-img {
  border-radius: 50%;
  position: relative;
  img {
    margin: 34px;
    width: 130px;
    height: 130px;
  }
  .cover-mask {
    display: block;
    position: absolute;
    top: -4px;
    left: -4px;
    width: 206px;
    height: 205px;
    background-position: -140px -580px;
  }
}
.bt-tp {
  font-size: 12px;
  p {
    margin: 10px 0;
    i {
      color: #aaa;
    }
  }
}
.bt-bm {
  white-space: pre-line;
  line-height: 25px;
  font-size: 13px;
  margin-top: 12px;
  color: #333;
}
.right {
}
.pl-item {
  font-size: 13px;
  .song-item {
    margin: 10px 0;
    .song-txt {
      float: left;
      width: 150px;
      .song-txt-sn {
        a {
          color: #000;
        }
      }
      .song-txt-an {
        font-size: 12px;
        a {
          color: #999;
        }
      }
    }
    .song-icon {
      float: right;
      i {
        width: 10px;
        height: 11px;
        margin-top: 10px;
      }
      .song-play {
        background-position: -69px -455px;
        margin: 0 10px;
      }
      .song-add {
        background-position: -87px -454px;
      }
    }
  }
}
.btns {
  .fav,
  .share,
  .download,
  .comment {
    .button2 {
      padding-left: 26px;
    }
  }
}
</style>
