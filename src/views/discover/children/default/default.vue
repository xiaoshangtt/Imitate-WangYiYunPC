<template>
  <div class="discover-default clearfix">
    <banner :banners="bannerList"></banner>
    <div class="content">
      <div class="left">
        <div class="left-wamp">
          <hot-recommend
            class="hot-recommend"
            :dataList="dayRecommendList"
          ></hot-recommend>
          <new-album
            :dataList="newAlbumWeekData.slice(0, 10)"
            class="new-album"
          ></new-album>
          <toplist ></toplist>
        </div>
      </div>
      <div class="right">
        <div class="ti-inf index">
          <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
          <a href="" class="user-login-btn index">用户登录</a>
        </div>
        <div class="right-content">
          <right-reco-item title="推荐歌手">
            <template #title-slot>
              <router-link to="/discover/artist" class="title-slot">查看全部 &gt;</router-link>
            </template>
            <template #pl-item>
              <ul class="pl-item clearfix">
                <li class="pl-imt-i" v-for="artist in recommendArtist" :key="artist.artist.id">
                  <a class="pl-i-box" href="/user/home?id=29879272">
                    <div class="img-bx">
                      <img v-lazy="artist?.artist?.cover">
                    </div>
                    <div class="inf">
                      <h4>
                        <span class="one-ellipsis">{{artist?.artist?.name}}</span>
                      </h4>
                      <p class="one-ellipsis">{{artist?.identify?.imageDesc}}</p>
                    </div>
                  </a>
                </li>
              </ul>
            </template>
          </right-reco-item>
          <right-reco-item title="热门主播">
            <template #pl-item>
              <ul class="pl-item-ho clearfix">
                <li v-for="item in toplistPopular" :key="item.id">
                  <router-link :to="{path: '/user/home',query: {id: item?.id}}" class="img-bx">
                    <img v-lazy="item?.avatarUrl" alt="">
                  </router-link>
                  <div class="inf">
                    <p class="name one-ellipsis hover_underline">
                      <a :href="{path: '/user/home', query: {id: item?.id}}">{{item?.nickName}}</a>
                    </p>
                    <p class="ds one-ellipsis">热门主播</p>
                  </div>
                </li>
              </ul>
            </template>
          </right-reco-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {defineComponent, computed} from "vue";
  import {useStore} from "@/store";

  import Banner from "@/views/discover/children/default/children/banner.vue";
  import RightRecoItem from "@/components/right_reco_item";
  import HotRecommend from "./children/hot-recommend.vue";
  import NewAlbum from "./children/new-album.vue";
  import Toplist from "./children/toplist.vue";

  export default defineComponent({
    name: "Default",
    components: {
      Banner,
      RightRecoItem,
      HotRecommend,
      NewAlbum,
      Toplist,
    },
    setup() {
      const store = useStore();
      store.dispatch("discover/getBannerList");
      const bannerList = computed(() => store.state.discover.bannerList);

      store.dispatch("discover/getDayRecommendList");
      const dayRecommendList = computed(
        () => store.state.discover.dayRecommendList
      );

      store.dispatch("discover/getNewSongList");
      const newSongList = computed(() => store.state.discover.newSongList);

      // 获取热门新碟
      store.dispatch("discover/ac_getNewAlbum");
      const newAlbumWeekData = computed(
        () => store.state.discover.newAlbumWeekData
      );

      // 获取歌手推荐 5个
      store.dispatch("discover/ac_getArtistDetailList");
      const recommendArtist = computed(() => store.state.discover.recommendArtist);

      // 获取最热主播榜 5个
      store.dispatch("discover/getToplistPopular");
      const toplistPopular = computed(() => store.state.discover.toplistPopular);

      // 获取推荐榜单（前三）
      store.dispatch("discover/ac_getThreeToplist");

      return {
        bannerList,
        dayRecommendList,
        newSongList,
        newAlbumWeekData,
        recommendArtist,
        toplistPopular
      };
    },
  });
</script>

<style scoped lang="less">
  .discover-default {
    box-sizing: border-box;

    .content {
      width: calc(var(--default-banner-width) + 4px);
      margin: 0 auto;
    }

    .left {
      float: left;
      width: 100%;
      box-sizing: border-box;
      margin-right: -250px;
      border: 1px solid #ccc;
      box-shadow: 0 0 1px #ccc;

      .left-wamp {
        border-right: 1px solid #ccc;
        box-shadow: 0 0 1px #ccc;
        margin-right: 250px;
        padding: 20px 20px 40px;
      }
    }
  }

  .right {
    float: right;
    width: 250px;
    padding-top: 1px;

    .ti-inf {
      height: 126px;
      padding-top: 0;
      margin-right: 1px;
      font-size: 12px;

      p {
        margin: 0 auto;
        width: 205px;
        padding: 16px 0;
        line-height: 22px;
      }

      .user-login-btn {
        display: block;
        width: 100px;
        height: 31px;
        margin: 0 auto;
        line-height: 31px;
        text-align: center;
        color: #fff;
        text-shadow: 0 1px 0 #8a060b;
        background-position: 0 -195px;

        &:hover {
          background-position: -110px -195px;
        }
      }
    }

    .right-content {
      margin-top: 15px;
      padding: 0 20px;
    }
  }

  .pl-item {

    .pl-imt-i {
      float: left;
      width: 210px;
      height: 62px;
      background-color: #fafafa;
      margin-bottom: 14px;

      &:hover {
        background-color: #e9e9e9;
      }

      .img-bx {
        float: left;
        width: 62px;
        height: 62px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .inf {
        float: left;
        width: 132px;
        height: 60px;
        padding-left: 14px;
        border: 1px solid #e9e9e9;

        h4 {
          margin-top: 8px;
          font-size: 14px;

          span {
            width: 90%;
          }
        }

        p {
          font-size: 12px;
          margin-top: 4px;
          color: #666;
          width: 90%;
        }
      }
    }


  }

  .title-slot {
    float: right;
    color: #666;
    font-weight: normal;
  }

  .pl-item-ho {
    li {
      float: left;
      width: 210px;
      height: 50px;
      font-size: 12px;

      .img-bx {
        float: left;
        width: 40px;
        margin-left: 10px;

        img {
          width: 40px;
          height: 40px;
        }
      }

      .inf {
        padding-left: 10px;
        float: left;
        width: 150px;

        p {
          width: 90%;
          line-height: 21px;
        }

        .ds {
          color: #666;
        }
      }
    }
  }
</style>
