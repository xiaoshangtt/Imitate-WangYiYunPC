<template>
  <div class="album">
    <detail-page
      :hotComments="albumComment?.hotComments"
      :comments="albumComment?.comments"
      :commentLimit="limit"
      :commentCurrentPage="currentPage"
      :commentTotal="albumComment?.total"
      @changeCurrentPage="changeCurrentPage"
      :info="albumContent?.album"
      :showSongList="true"
    >
      <template #cover-img>
        <div class="cover-img">
          <img :src="albumContent?.album?.picUrl || ''" alt="" />
          <span class="mask coverall"></span>
        </div>
      </template>
      <template #bt-tp>
        <div class="bt-tp">
          <p class="artist">
            <span>歌手：</span>
            <a href="" class="artist-name">Justin Bieber / Don Toliver</a>
          </p>
          <p class="time">
            <span>发行时间：</span>
            <span>2022-04-29</span>
          </p>
        </div>
      </template>
      <template #btns>
        <div class="btns">
          <a
            href="javascript:void(0)"
            @click="
              $store.dispatch(
                'musiclist/ac_albumReplaceMusiclist',
                albumContent?.album?.id
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
            @click="
              $store.dispatch(
                'musiclist/ac_albumAddMusiclist',
                albumContent?.album?.id
              )
            "
            class="ad button2"
          ></a>
          <a href="javascript:void(0)" class="fav i-btnu button2">
            <span class="button2">收藏</span>
          </a>
          <a href="javascript:void(0)" class="share i-btnu button2">
            <span class="button2">(100)</span>
          </a>
          <a href="javascript:void(0)" class="download i-btnu button2">
            <span class="button2">下载</span>
          </a>
          <a href="javascript:void(0)" class="comment i-btnu button2">
            <span class="button2">(143)</span>
          </a>
        </div>
      </template>
      <template #bt-bm>
        <div class="bt-bm">
          <h3>专辑介绍：</h3>
          <p>
            继《I Feel Funny》先行预热之后，比伯Justin Bieber携手美国说唱歌手Don
            Toliver带来新作《Honest》
          </p>
        </div>
      </template>
    </detail-page>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, onUnmounted } from "vue";

import DetailPage from "@/components/detail-page";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Album",
  components: {
    DetailPage,
  },
  updated() {
    console.log(this.albumContent);
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = ref(route.query?.id);
    const limit = ref(20);
    const currentPage = ref(1);

    function getAlbumData() {
      store.dispatch("album/ac_getAlbumContent", id.value);
      getAlbumCommentData();
    }
    function getAlbumCommentData() {
      store.dispatch("album/ac_getAlbumComment", {
        id: id.value,
        limit: limit.value,
        offset: (currentPage.value - 1) * limit.value,
      });
    }
    getAlbumData();

    const albumContent = computed(() => {
      const albumContent = store.state.album.albumContent;
      const album = store.state.album.albumContent.album;
      if (album) {
        album.tracks = albumContent.songs;
      }
      return albumContent;
    });
    const albumComment = computed(() => store.state.album.albumComment);

    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value += i;
      } else {
        currentPage.value = i;
      }
      getAlbumCommentData();
    };

    const watchAlbum = watch(
      () => route.query,
      () => {
        id.value = route.query.id;
        getAlbumData();
      }
    );
    onUnmounted(() => {
      watchAlbum();
    });

    return {
      limit,
      currentPage,
      changeCurrentPage,
      albumContent,
      albumComment,
    };
  },
});
</script>

<style lang="less" scoped>
.cover-img {
  position: relative;
  width: 177px;
  height: 177px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 209px;
    height: 177px;
    background-position: 0 -986px;
  }
}
.bt-tp {
  font-size: 12px;
  p {
    margin-top: 4px;
    line-height: 18px;
    color: #666;
  }
  .artist-name {
    color: #0c73c2;
  }
}
.btns {
  margin-top: 20px;
  .share,
  .download,
  .comment {
    span {
      padding-left: 25px;
    }
  }
}
.bt-bm {
  position: relative;
  margin-top: 120px;
  margin-left: -220px;
  font-size: 12px;
  line-height: 22px;
  h3 {
    font-size: 100%;
  }
  p {
    text-indent: 2em;
  }
}
</style>
