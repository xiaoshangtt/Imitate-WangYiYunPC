<template>
  <div class="detail-page clearfix">
    <div class="left">
      <div class="wamp">
        <div class="wamp-b">
          <detail-info
            class="detail-info"
            :infoMargin="infoMargin"
            :info="info || {}"
          >
            <template #cover-img="{ info }">
              <slot name="cover-img" :info="info"></slot>
            </template>
            <!-- 按钮插槽 -->
            <template #btns>
              <slot name="btns"></slot>
            </template>
            <template #bt-tp="{ info }">
              <slot name="bt-tp" :info="info"></slot>
            </template>
            <template #bt-bm="{ info }">
              <slot name="bt-bm" :info="info"></slot>
            </template>
          </detail-info>
          <slot name="list">
            <detail-song-list
              v-if="showSongList"
              class="detail-song-list"
              :TrackAllList="info?.tracks"
            ></detail-song-list>
          </slot>
          <comment
            v-if="showComment"
            class="detail-comment"
            ref="commentRef"
            :hotComments="hotComments"
            :comments="comments"
            :total="commentTotal"
          ></comment>
          <pagination
            v-if="comments.length && showComment"
            :currentPage="commentCurrentPage"
            :limit="commentLimit"
            :total="commentTotal"
            class="pagination"
            @changeCurrentPage="changeCurrentPage"
          ></pagination>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="wamp-t">
        <div class="likev" v-if="ShowLiveR">
          <h3 class="lk-hd">
            <span>喜欢这个歌单的人</span>
          </h3>
          <ul class="lik-pl-u">
            <li v-for="subscribe in LiveR" :key="subscribe.userId">
              <router-link
                :to="{ path: '/user/home', query: { id: subscribe?.userId } }"
              >
                <img :src="subscribe.avatarUrl" :alt="subscribe?.nickname" />
              </router-link>
            </li>
          </ul>
        </div>

        <detail-reco>
          <template v-slot:right="{ hotPlaylists }">
            <slot name="right" :hotPlaylists="hotPlaylists.playlist"></slot>
          </template>
        </detail-reco>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import DetailInfo from "./children/detail-info.vue";
import DetailSongList from "./children/detail-song-list.vue";
import DetailReco from "./children/detail-reco.vue";
import Comment from "@/components/comment";
import Pagination from "@/components/pagination";

export default defineComponent({
  name: "Playlist",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    trackallList: {
      type: Array,
      default: () => [],
    },
    showSongList: {
      type: Boolean,
      default: false,
    },
    hotComments: {
      type: Array,
      default: () => [],
    },
    comments: {
      type: Array,
      default: () => [],
    },
    commentTotal: {
      type: Number,
      default: 0,
    },
    commentCurrentPage: {
      type: Number,
      default: 1,
    },
    commentLimit: {
      type: Number,
      default: 20,
    },
    LiveR: {
      type: Array,
      default: () => [],
    },
    ShowLiveR: {
      type: Boolean,
      default: false,
    },
    showComment: {
      type: Boolean,
      default: false,
    },
    infoMargin: {
      type: String,
      default: "0 0 0 220px",
    },
  },
  components: {
    DetailInfo,
    DetailSongList,
    Comment,
    DetailReco,
    Pagination,
  },
  emits: ["changeCurrentPage"],
  setup(props, context) {
    const commentRef = ref(null);
    const changeCurrentPage = (i, type = "d") => {
      context.emit("changeCurrentPage", i, type);
      commentRef.value.backCmTp();
    };

    return {
      commentRef,
      changeCurrentPage,
    };
  },
});
</script>

<style lang="less" scoped>
.detail-page {
  margin: 0 auto;
  width: var(--default-banner-width);
  background: white;
  border: 1px solid #d3d3d3;
  .left,
  .right {
    width: 100%;
    height: 100%;
  }
  .left {
    float: left;
    // .left元素时左浮动，.right是右浮动，但是.left width为100%，所有.right换行了，
    // 通过margin-right: -270px;设置给.left，那么.left就会向右偏移270，但是.left是左浮动，所以还是在左边
    // 这时右边就刚好有270px的空位，然后.right就会补上这个位置
    margin-right: -270px;
    .wamp {
      margin-right: 270px;
      .wamp-b {
        padding: 47px 30px 40px 39px;
        border: 1px solid #d3d3d3;
      }
    }
  }
  .right {
    float: right;
    width: 270px;
    height: 600px;
    .wamp-t {
      padding: 20px 40px 40px 30px;
    }
  }
}
.pagination {
  margin-top: 30px;
}
.likev {
  h3 {
    font-size: 12px;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .lik-pl-u {
    margin-left: -13px;
    padding-bottom: 25px;
    li {
      display: inline-block;
      padding: 0 0 13px 13px;
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
