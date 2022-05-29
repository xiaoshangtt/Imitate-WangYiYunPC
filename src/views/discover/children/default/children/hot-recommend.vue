<template>
  <div class="hot-recommend">
    <list-song
      class="list-song"
      :dataList="dataList"
      songContentMarginLeft="-42px"
      moEllipsis="two"
      :songOptions="{
        showBottomText: true,
        showMask: true,
        style: { margin: '0 0 40px 42px' },
      }"
    >
      <template #title>
        <div class="title index">
          <span>热门推荐</span>
        </div>
      </template>
      <template #title-slot>
        <div class="title-slot">
          <router-link
            class="to-category-btn"
            :to="{ path: '/discover/playlist', query: { cat: '华语' } }"
            >华语</router-link
          >
          <span>|</span>
          <router-link
            class="to-category-btn"
            :to="{ path: '/discover/playlist', query: { cat: '流行' } }"
            >流行</router-link
          >
          <span>|</span>
          <router-link
            class="to-category-btn"
            :to="{ path: '/discover/playlist', query: { cat: '摇滚' } }"
            >摇滚</router-link
          >
          <span>|</span>
          <router-link
            class="to-category-btn"
            :to="{ path: '/discover/playlist', query: { cat: '民谣' } }"
            >民谣</router-link
          >
          <span>|</span>
          <router-link
            class="to-category-btn"
            :to="{ path: '/discover/playlist', query: { cat: '电子' } }"
            >电子</router-link
          >
          <router-link to="/discover/playlist/" class="more-btn index">
            <span>更多</span>
            <i class="toright index"></i>
          </router-link>
        </div>
      </template>
    </list-song>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ListSong from "@/components/list-song/list-song.vue";

export default defineComponent({
  name: "HotRecommend",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ListSong,
  },
});
</script>

<style lang="less" scoped>
.title {
  display: inline-block;
  background-position: -225px -156px;
  padding-left: 30px;
  font-size: 22px;
}
.title-slot {
  margin-left: 20px;
  font-size: 12px;
  display: inline-block;
  color: #666;
  & > span {
    margin: 0 10px;
  }
  a:hover {
    text-decoration: underline;
  }
  .more-btn {
    position: absolute;
    right: 10px;
    .toright {
      float: right;
      width: 12px;
      height: 12px;
      margin-top: 3px;
      margin-left: 4px;
      background-position: 0 -240px;
    }
  }
}
</style>
