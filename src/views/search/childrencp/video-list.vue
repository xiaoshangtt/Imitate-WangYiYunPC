<template>
  <div class="video-list">
    <ul class="video-wamp clearfix">
      <li v-for="video in dataList" :key="video.vid">
        <div class="cover-img">
          <img :src="video?.coverUrl" />
          <p class="ply-cut">
            <i class="video-icon q-icon2"></i>
            {{ toWan(video?.playTime) }}
          </p>
          <p class="time">{{ toMinutes(video?.durationms / 1000) }}</p>
          <a href="" class="mask"></a>
        </div>
        <p class="title">
          <a href="" class="one-ellipsis">
            <span
              v-html="changeStr(video?.title, $route.query?.keywords || '')"
            ></span>
          </a>
        </p>
        <p class="author">
          by&nbsp;
          <template v-for="ar in video?.creator" :key="ar.userId">
            <router-link :to="{ path: '/artist', query: { id: ar?.userId } }">{{
              ar?.useerName
            }}</router-link>
          </template>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { toWan, toMinutes } from "@/utils";
import { changeStr } from "../xuts";

export default defineComponent({
  name: "VideoList",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      changeStr,
      toWan,
      toMinutes,
    };
  },
});
</script>

<style lang="less" scoped>
.video-list {
  .video-wamp {
    margin-left: -26px;
    li {
      float: left;
      width: 159px;
      padding: 0 0 30px 26px;
      line-height: 1.5;
      a:hover {
        text-decoration: underline;
      }
      .cover-img {
        position: relative;
        width: 159px;
        height: 90px;
        img {
          width: 100%;
          height: 90px;
        }
        .ply-cut {
          position: absolute;
          top: 0;
          right: 0;
          padding-right: 5px;
          height: 20px;
          widows: 90px;
          line-height: 20px;
          color: #fff;
          box-sizing: border-box;
          text-align: right;
          text-shadow: -2px 1px rgb(0 0 0 / 40%);
          .video-icon {
            margin: -2px 2px 0 0;
            width: 15px;
            height: 10px;
            background-position: -60px -310px;
            vertical-align: middle;
          }
        }
        .time {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding-left: 5px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          text-shadow: -2px 1px rgb(0 0 0 / 40%);
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 9;
        }
      }
      p {
        height: auto;
      }
      .title {
        width: 100%;
        margin-top: 7px;
        font-size: 14px;
        height: 23px;
        a {
          display: inline-block;
          max-width: 100%;
        }
      }
    }
  }
}
</style>
