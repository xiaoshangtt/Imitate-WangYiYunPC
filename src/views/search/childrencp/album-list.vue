<template>
  <div class="album-list">
    <ul class="album-wamp clearfix">
      <li v-for="album in dataList" :key="album.id">
        <div class="cover-img">
          <router-link :to="{ path: '/album', query: { id: album?.id } }">
            <img v-lazy="album?.picUrl" />
            <span class="album-bg coverall"></span>
          </router-link>
          <a
            href="javascript:void(0)"
            @click="
              $store.dispatch('musiclist/ac_albumReplaceMusiclist', album?.id)
            "
            class="ply-icon iconall iconall-ply"
          ></a>
        </div>
        <p class="desc">
          <router-link
            :to="{ path: '/album', query: { id: album?.id } }"
            v-html="changeStr(album?.name, $route.query.keywords || '')"
          ></router-link>
        </p>
        <p>
          <span class="artist-name" :title="album?.artist?.name">
            <router-link
              :to="{ path: '/artist', query: { id: album?.artist?.id } }"
              >{{ album?.artist?.name }}</router-link
            >
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { changeStr } from "../xuts";

export default defineComponent({
  name: "AlbumList",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      changeStr,
    };
  },
});
</script>

<style lang="less" scoped>
.album-list {
  .album-wamp {
    margin-left: -33px;
    a:hover {
      text-decoration: underline;
    }
    li {
      float: left;
      padding: 0 0 30px 33px;
      width: 153px;
      height: 178px;
      line-height: 1.4;
      &:hover {
        .cover-img .ply-icon {
          display: block;
        }
      }
      .cover-img {
        position: relative;
        width: 130px;
        height: 130px;
        img {
          width: 100%;
          height: 100%;
        }
        .album-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 153px;
          height: 130px;
          background-position: 0 -845px;
        }
        .ply-icon {
          display: none;
          position: absolute;
          bottom: 5px;
          right: 10px;
        }
      }
      p {
        width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        a {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .artist-name {
          display: inline-block;
          max-width: 85%;
          vertical-align: middle;
          a {
            display: block;
            color: #666;
          }
        }
      }
      .desc {
        margin: 8px 0 3px;
        font-size: 14px;
        a {
          display: inline-block;
          max-width: 100%;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
