<template>
  <div class="playlist">
    <detail-page
      :showSongList="true"
      :info="playlistDetailInfo"
      :trackallList="playlistDetailInfo?.tracks"
      :hotComments="playlistCommentData?.hotComments || []"
      :comments="playlistCommentData?.comments || []"
      :commentTotal="playlistCommentData?.total || 0"
      :commentCurrentPage="currentPage"
      :commentLimit="limit"
      @changeCurrentPage="changeCurrentPage"
      :ShowLiveR="true"
      :showComment="true"
      :LiveR="playlistDetailInfo?.subscribers || []"
    >
      <template #cover-img>
        <div class="cover-img">
          <img v-lazy="playlistDetailInfo?.coverImgUrl || ''" alt="" />
          <span class="cover-mask coverall"></span>
        </div>
      </template>
      <template #btns>
        <div class="btns clearfix">
          <a
            href="javascript:void(0)"
            @click="
              $store.dispatch(
                'musiclist/ac_playlistReplaceMusiclist',
                playlistDetailInfo?.id
              )
            "
            class="ply button2"
          >
            <i class="button2">
              <em class="ply-icon button2"></em>
              播放
            </i>
          </a>
          <a
            href="javascript:void(0)"
            class="ad button2"
            @click="
              $store.dispatch(
                'musiclist/ac_playlistAddMusiclist',
                playlistDetailInfo?.id || 0
              )
            "
          ></a>
          <a href="javascript:void(0)" class="fav i-btnu button2">
            <span class="button2"
              >({{ toWan(playlistDetailInfo?.subscribedCount) }})</span
            >
          </a>
          <a href="javascript:void(0)" class="share i-btnu button2">
            <span class="button2"
              >({{ toWan(playlistDetailInfo?.shareCount) }})</span
            >
          </a>
          <a href="javascript:void(0)" class="download i-btnu button2">
            <span class="button2">下载</span>
          </a>
          <a href="javascript:void(0)" class="comment i-btnu button2">
            <span class="button2"
              >({{ toWan(playlistDetailInfo?.commentCount) }})</span
            >
          </a>
        </div>
      </template>
      <template #bt-tp="{ info }">
        <div class="bt-tp">
          <div class="author">
            <router-link
              :to="{ path: '/user/home', query: { id: info?.creator?.userId } }"
            >
              <img class="portrait" v-lazy="info?.creator?.avatarUrl" alt="" />
            </router-link>
            <span class="name">
              <router-link
                :to="{
                  path: '/user/home',
                  query: { id: info?.creator?.userId },
                }"
                class="n-f"
                >{{ info?.creator?.nickname }}</router-link
              >
            </span>
            <img
              src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4761340168/ccce/35dd/ab2d/1a7c8ee0f6bb1fc2760cbb570dfee34f.png"
              alt=""
            />
            <span class="crt"
              >{{
                formatDate("YYYY-MM-DD hh:mm:ss", info?.createTime)
              }}
              创建</span
            >
          </div>
        </div>
      </template>
      <template #bt-bm="{ info }">
        <div class="bt-bm">
          <div class="tags" v-if="info?.tags?.length">
            <span>标签：</span>
            <a href="" v-for="tag in info?.tags || []" :key="tag">{{ tag }}</a>
          </div>
          <p class="reco-more" v-if="info?.description">
            <i>介绍：</i>{{ info?.description }}
          </p>
        </div>
      </template>
      <template #right>
        <right-reco-item
          title="热门歌单"
          :dataList="hotPlaylist.playlists || []"
        ></right-reco-item>
      </template>
    </detail-page>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { formatDate } from "@/utils";
import DetailPage from "@/components/detail-page";
import RightRecoItem from "@/components/right_reco_item";

import { toWan } from "@/utils";

export default defineComponent({
  name: "Playlist",
  components: {
    DetailPage,
    RightRecoItem,
  },
  updated() {
    console.log(this.playlistDetailInfo);
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const limit = ref(20);
    const currentPage = ref(1);
    const total = computed(() => store.state.playlist.playlistComment.total);
    const CommentPageRef = ref(null);

    // type是相加还是赋值，j是加d是赋值 默认d
    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value = currentPage.value + i;
      } else {
        currentPage.value = i;
      }
      getPlaylistCommentData();
      // 切换页面回到当前评论顶部
      console.log(CommentPageRef.value);
    };

    const getPlaylistData = () => {
      store.dispatch("playlist/ac_getPlaylistDetailInfo", {
        id: route.query?.id,
      });
      // 获取5首热门歌单
      store.dispatch("playlist/ac_getHotPlaylist", { limit: 5 });
      getPlaylistCommentData();
    };
    getPlaylistData();

    function getPlaylistCommentData() {
      store.dispatch("playlist/ac_getPlaylistComment", {
        id: route.query?.id || 0,
        limit: limit.value,
        offset: (currentPage.value - 1) * limit.value,
      });
    }

    const playlistDetailInfo = computed(
      () => store.state.playlist.playlistDetailInfo
    );
    const playlistCommentData = computed(
      () => store.state.playlist.playlistComment
    );
    const hotPlaylist = computed(() => store.state.playlist.hotPlaylist);

    const routeWatch = watch(
      () => route.query,
      () => {
        currentPage.value = 1;
        getPlaylistData();
      }
    );
    onUnmounted(() => {
      routeWatch();
    });

    return {
      toWan,
      playlistDetailInfo,
      playlistCommentData,
      currentPage,
      limit,
      total,
      CommentPageRef,
      hotPlaylist,
      formatDate,
      changeCurrentPage,
    };
  },
});
</script>

<style lang="less" scoped>
.bt-bm {
  .tags {
    color: #555;
    margin-top: 20px;
    font-size: 12px;
    a {
      color: #555;
      display: inline-block;
      padding: 4px 10px;
      margin: 0 4px;
      box-shadow: 0 0 1px #ccc;
      background-color: #f3f3f3;
      border: 1px solid #ddd;
      border-radius: 20px;
      &:hover {
        background-color: #fefefe;
      }
    }
  }
  .reco-more {
    color: #555;
    margin-top: 7px;
    font-size: 12px;
    line-height: 18px;
    white-space: pre-line;
  }
}
.bt-tp {
  .author {
    margin-bottom: 14px;
    font-size: 13px;
    .portrait {
      width: 35px;
      height: 35px;
      vertical-align: middle;
    }
    & > img {
      width: 13px;
      height: 13px;
    }
    .name {
      margin: 0 0 0 12px;
      .n-f {
        color: #0c73c2;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .crt {
      margin: 0 20px;
      font-size: 12px;
      color: #aaa;
    }
  }
}
.cover-img {
  img {
    width: 200px;
    height: 200px;
  }
  .cover-mask {
    position: absolute;
    top: -4px;
    left: -4px;
    width: 208px;
    height: 208px;
    background-position: 0 -1285px;
  }
}
.right {
}
.btns {
  overflow: hidden;
  display: block;
  .share,
  .download,
  .comment,
  .fav {
    .button2 {
      padding-left: 24px;
    }
  }
}
</style>
