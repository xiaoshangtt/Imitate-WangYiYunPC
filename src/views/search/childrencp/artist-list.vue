<template>
  <div class="artist-list">
    <ul class="artist-wamp clearfix">
      <li v-for="artist in dataList" :key="artist?.id">
        <div class="cover-img">
          <router-link :to="{ path: '/artist', query: { id: artist?.id } }">
            <img v-lazy="artist?.picUrl" />
            <span class="mask coverall"></span>
          </router-link>
        </div>
        <p>
          <router-link
            :to="{ path: '/artist', query: { id: artist?.id } }"
            class="nme"
            v-html="changeStr(artist?.name, $route.query.keywords || '')"
          ></router-link>
          <router-link
            v-if="artist?.accountId"
            :to="{ path: '/user/home', query: { id: artist?.accountId } }"
          >
            <i class="q-icon"></i>
          </router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { changeStr } from "../xuts";

export default defineComponent({
  name: "ArtistList",
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
.artist-list {
  .artist-wamp {
    margin-left: -24px;
    li {
      float: left;
      padding-left: 24px;
      width: 130px;
      height: 154px;
      line-height: 1.4;
      padding: 0 0 30px 24px;
      .cover-img {
        position: relative;
        width: 130px;
        height: 130px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-position: 0 -680px;
        }
      }
      p {
        margin-top: 8px;
        width: 100%;
        a {
          color: #333;
          i {
            float: right;
            width: 17px;
            height: 18px;
            background-position: 0 -740px;
          }
        }
        .nme {
          display: inline-block;
          max-width: 85%;
          vertical-align: middle;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
