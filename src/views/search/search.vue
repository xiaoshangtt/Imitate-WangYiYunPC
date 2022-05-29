<template>
  <div class="search">
    <div class="search-wamp">
      <div class="search-main sprite">
        <input
          type="text"
          class="pgsearch"
          @focus="inputFocus"
          @blur="inputBlur"
          @keydown.enter="toSearch"
          @input="getSearchSuggestData"
          v-model="searchValue"
        />
        <a
          href="javascript:void(0)"
          @click="toSearch"
          class="sh-btn sprite"
          title="搜索"
        ></a>
        <suggest-result
          :searchSuggest="searchSuggest"
          :keywords="searchValue"
          v-show="
            $route.query.keywords && showSimiResult && searchValue.length > 0
          "
        ></suggest-result>
      </div>
      <div class="m-search">
        <div
          class="search-tip"
          :class="
            $route.query?.keywords && computeCurrentResult.total
              ? ''
              : 'opacity0'
          "
        >
          搜索“{{ $route.query?.keywords || "" }}”，找到
          <span>{{ computeCurrentResult.total }}</span
          >首{{ computeCurrentResult.title }}
        </div>
        <ul class="m-tabs tab clearfix">
          <li v-for="nav in searchNavConfig" :key="nav.type">
            <router-link
              :to="{
                path: $route.path,
                query: { ...$route.query, type: nav?.type },
              }"
              class="slt tab"
              :class="
                ($route.query?.type || 1) == nav?.type ? 'slt-active' : ''
              "
            >
              <span class="tab">{{ nav?.name }}</span>
            </router-link>
          </li>
        </ul>
        <div class="tab-cnt">
          <div class="cnt-wamp" v-if="Object.keys(searchResult).length">
            <artist-list
              v-if="$route.query?.type == 100"
              :dataList="searchResult?.artists || []"
            ></artist-list>
            <album-list
              v-else-if="$route.query?.type == 10"
              :dataList="searchResult?.albums || []"
            ></album-list>
            <video-list
              v-else-if="$route.query?.type == 1014"
              :dataList="searchResult?.videos || []"
            ></video-list>
            <lyric-list
              v-else-if="$route.query?.type == 1006"
              :dataList="searchResult?.songs || []"
            ></lyric-list>
            <playlist-list
              v-else-if="$route.query?.type == 1000"
              :dataList="searchResult?.playlists || []"
            ></playlist-list>
            <sound-anchor-list
              v-else-if="$route.query?.type == 1009"
              :dataList="searchResult?.djRadios || []"
            ></sound-anchor-list>
            <user-list
              v-else-if="$route.query?.type == 1002"
              :dataList="searchResult?.userprofiles || []"
            ></user-list>

            <song-list v-else :dataList="searchResult?.songs || []"></song-list>
          </div>
          <div class="loading-bx" v-else>
            <loading class="loading"></loading>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onUnmounted, ref, watch } from "vue";

import SongList from "./childrencp/song-list.vue";
import ArtistList from "./childrencp/artist-list.vue";
import AlbumList from "./childrencp/album-list.vue";
import VideoList from "./childrencp/video-list.vue";
import LyricList from "./childrencp/lyric-list.vue";
import PlaylistList from "./childrencp/playlist-list.vue";
import SoundAnchorList from "./childrencp/sound-anchor-list.vue";
import UserList from "./childrencp/user-list.vue";
import Loading from "@/components/loading";
import SuggestResult from "./childrencp/suggest-result.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { searchNavConfig } from "./searchNav.config";

import { changeStr } from "./xuts";

import { debounce } from "@/utils";

export default defineComponent({
  name: "Search",
  components: {
    SongList,
    ArtistList,
    AlbumList,
    VideoList,
    LyricList,
    PlaylistList,
    SoundAnchorList,
    UserList,
    Loading,
    SuggestResult,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const showSimiResult = ref(false);
    const searchValue = ref("");

    const toSearch = () => {
      router.push({
        path: "/search",
        query: {
          ...route.query,
          keywords: searchValue.value,
        },
      });
    };
    const inputFocus = () => {
      showSimiResult.value = true;
      getSearchSuggestData();
    };
    const inputBlur = debounce(() => {
      showSimiResult.value = false;
    }, 200);

    const computeCurrentResult = computed(() => {
      const type = route.query?.type || 1;
      const currentNav = searchNavConfig.find((item) => {
        return item.type == type;
      });
      return {
        title: currentNav.name || "",
        total: (searchResult.value[currentNav.propsData] || []).length,
      };
    });

    function getSearchResultData() {
      if (route.query.keywords) {
        store.dispatch("search/ac_getSearchResult", {
          keywords: route.query?.keywords || "",
          type: route.query?.type || 1,
        });
      }
    }
    function getSearchSuggestData() {
      store.dispatch("search/ac_getSearchSuggest", {
        keywords: searchValue.value || "",
      });
    }

    getSearchResultData();
    const searchResult = computed(() => store.state.search.searchResult);
    const searchSuggest = computed(() => store.state.search.searchSuggest);

    const routeWatch = watch(
      () => route.query,
      () => {
        getSearchResultData();
      }
    );
    onUnmounted(() => {
      routeWatch();
    });

    return {
      changeStr,
      searchNavConfig,
      showSimiResult,
      searchResult,
      searchSuggest,
      computeCurrentResult,
      searchValue,
      toSearch,
      getSearchSuggestData,
      inputFocus,
      inputBlur,
    };
  },
});
</script>

<style lang="less" scoped>
/deep/ .suggest {
  color: #0c73c2;
}
/deep/ a:hover {
  text-decoration: underline;
}
.search {
  width: var(--default-banner-width);
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  min-height: 700px;
  color: #fff;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
  .search-wamp {
    padding: 40px;
    .search-main {
      position: relative;
      width: 420px;
      height: 40px;
      margin: 0 auto;
      background-position: 0 0;
      z-index: 10;
      .pgsearch {
        float: left;
        width: 320px;
        height: 17px;
        margin: 12px 0 0 20px;
        padding: 0;
        background: #fff;
        border: none;
        outline: none;
        color: #333;
      }
      .sh-btn {
        float: right;
        width: 50px;
        height: 40px;
        text-indent: -9999px;
        &:hover {
          background-position: -430px 0;
        }
      }
    }
    .m-search {
      .search-tip {
        color: #999;
        margin: 28px 0 17px;
        span {
          color: #c20c0c;
        }
      }
      .m-tabs {
        position: relative;
        left: -1px;
        border: 1px solid #ccc;
        border-top: none;
        border-bottom: none;
        background-repeat: repeat-x;
        li {
          float: left;
          .slt {
            display: inline-block;
            span {
              font-size: 14px;
              display: inline-block;
              width: 108px;
              height: 37px;
              line-height: 37px;
              padding: 2px 2px 0 0;
              cursor: pointer;
              text-align: center;
            }
          }
          .slt-active {
            background-position: left -90px;
            span {
              background-position: left -90px;
            }
          }
        }
      }
      .tab-cnt {
        .cnt-wamp {
          margin-top: 20px;
        }
        .loading-bx {
          margin-top: 40px;
        }
      }
    }
  }
}
</style>
