<template>
  <div class="sound-anchor-list">
    <div class="hd">
      <h4>声音主播</h4>
    </div>
    <ul class="sound-anchor-wamp clearfix">
      <li v-for="sound in dataList" :key="sound.id">
        <div class="cover-img">
          <router-link :to="{ path: '/djradio', query: { id: sound?.id } }">
            <img v-lazy="sound?.picUrl" />
          </router-link>
        </div>
        <h3 class="tit one-ellipsis">
          <router-link
            :to="{ path: '/djradio', query: { id: sound?.id } }"
            v-html="changeStr(sound?.name, $route.query?.keywords || '')"
          ></router-link>
        </h3>
        <p class="author one-ellipsis">
          by
          <router-link
            :to="{ path: '/user/home', query: { id: sound?.dj?.userId } }"
            >{{ sound?.dj?.nickname }}</router-link
          >
          <i class="gendersm" :class="`gendersm-${sound?.dj?.gender || 1}`"></i>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { changeStr } from "../xuts";

export default defineComponent({
  name: "SoundAnchorList",
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
.sound-anchor-list {
  .hd {
    font-size: 12px;
    font-weight: 400;
    padding: 7px 0;
    border-bottom: 1px solid #ccc;
  }
  .sound-anchor-wamp {
    margin: 16px 0 0 -37px;
    li {
      float: left;
      width: 150px;
      padding: 0 0 40px 37px;
      .cover-img {
        width: 150px;
        height: 150px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .tit {
        margin: 13px 0 6px;
        line-height: 16px;
        font-size: 14px;
        font-weight: 400;
        width: 95%;
        a span {
          color: #0c73c2;
        }
      }
      .author {
        line-height: 18px;
        color: #999;
        .gendersm {
          vertical-align: middle;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
