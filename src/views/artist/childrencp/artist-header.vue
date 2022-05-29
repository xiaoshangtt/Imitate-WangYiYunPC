<template>
  <div class="artist-header">
    <div class="artist-img">
      <div class="artist-name clearfix">
        <h2 class="nam">{{ info?.artist?.name }}</h2>
        <h3 class="nic"></h3>
      </div>
      <img :src="`${info?.artist?.cover}?param=640y300`" />
      <div class="mask ban_mask"></div>
      <router-link
        :to="{ path: '/user/home', query: { id: info?.user?.userId } }"
        class="artist-home iconall"
        >Ta的个人主页</router-link
      >
      <a href="" class="artist-sub iconall">收藏</a>
    </div>
    <ul class="m-tabs tab">
      <li class="tab" :class="$route.path == '/artist' ? 'active' : ''">
        <router-link
          :to="{ path: '/artist', query: { id: $route.query?.id } }"
          class="tab-a tab"
        >
          <span class="tab">热门作品</span>
        </router-link>
      </li>
      <li class="tab" :class="$route.path == '/artist/album' ? 'active' : ''">
        <router-link
          :to="{ path: '/artist/album', query: { id: $route.query?.id } }"
          class="tab-a tab"
        >
          <span class="tab">所有专辑</span>
        </router-link>
      </li>
      <li class="tab" :class="$route.path == '/artist/mv' ? 'active' : ''">
        <router-link
          :to="{ path: '/artist/mv', query: { id: $route.query?.id } }"
          class="tab-a tab"
        >
          <span class="tab">相关MV</span>
        </router-link>
      </li>
      <li class="tab" :class="$route.path == '/artist/desc' ? 'active' : ''">
        <router-link
          :to="{ path: '/artist/desc', query: { id: $route.query?.id } }"
          class="tab-a tab"
        >
          <span class="tab">艺人介绍</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArtistHeader",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="less" scoped>
.artist-header {
  .artist-img {
    position: relative;
    height: 333px;
    margin-top: -20px;
    .artist-name {
      .nam {
        float: left;
        max-width: 75%;
        height: 34px;
        line-height: 24px;
        font-weight: normal;
        font-size: 24px;
      }
      .nic {
        float: left;
        max-width: 23%;
        padding-left: 10px;
        line-height: 32px;
        color: #999;
        font-weight: normal;
      }
    }
    img {
      display: block;
      width: 640px;
      height: 300px;
    }
    .mask {
      position: absolute;
      top: 34px;
      left: 0;
      width: 640px;
      height: 300px;
    }
    .artist-home,
    .artist-sub {
      display: block;
      position: absolute;
      bottom: 18px;
      height: 32px;
      text-indent: -9999px;
    }
    .artist-home {
      right: 116px;
      width: 96px;
      background-position: 0 -1156px;
      &:hover {
        background-position: 0 -1196px;
      }
    }
    .artist-sub {
      right: 20px;
      width: 76px;
      background-position: 0 -500px;
      &:hover {
        background-position: 0 -540px;
      }
    }
  }
  .m-tabs {
    height: 39px;
    background-position: 0 0;
    background-repeat: repeat-x;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    li {
      position: relative;
      float: left;
      height: 39px;
      left: -1px;
      .tab-a {
        height: 39px;
        span {
          display: inline-block;
          height: 37px;
          line-height: 37px;
          width: 134px;
          padding: 2px 2px 0 0;
          cursor: pointer;
          text-align: center;
        }
      }
    }
    li.active {
      background-position: 0 0;
      .tab-a,
      .tab-a span {
        background-position: left -90px;
      }
    }
  }
}
</style>
