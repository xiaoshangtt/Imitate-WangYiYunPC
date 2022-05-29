<template>
  <div class="song-list">
    <div class="song-item clearfix" v-for="song in dataList" :key="song.id">
      <div class="td">
        <div class="hd">
          <i
            @click="$store.dispatch('musiclist/ac_changePlayMusic', song)"
            class="cursor_pointer q-table q-table-ply"
          ></i>
        </div>
      </div>
      <div class="td w0">
        <div class="sn">
          <div class="text">
            <router-link
              :to="{ path: '/song', query: { id: song?.id } }"
              v-html="changeStr(song?.name, $route.query?.keywords || '')"
            ></router-link>
          </div>
        </div>
      </div>
      <div class="td">
        <div class="opt">
          <a
            href="javascript:void(0)"
            class="q-icon q-icon-four q-icon-add"
            title="添加到播放列表"
            @click="$store.commit('musiclist/mu_addMusic', song)"
          ></a>
          <span
            class="q-table q-icon-four q-icon-store cursor_pointer"
            title="收藏"
          ></span>
          <span
            class="q-table q-icon-four q-icon-share cursor_pointer"
            title="分享"
          ></span>
          <span
            class="q-table q-icon-four q-icon-download cursor_pointer"
            title="下载"
          ></span>
        </div>
      </div>
      <div class="td w1">
        <div class="text">
          <template v-for="(ar, index) in song?.ar" :key="ar.id">
            <template v-if="index > 0"> / </template>
            <router-link :to="{ path: '/artist', query: { id: ar?.id } }">{{
              ar?.name
            }}</router-link>
          </template>
        </div>
      </div>
      <div class="td w2">
        <div class="text">
          <router-link
            :to="{ path: '/album', query: { id: song?.al?.id } }"
            v-html="
              changeStr(`《${song?.al?.name}》`, $route.query?.keywords || '')
            "
          ></router-link>
        </div>
      </div>
      <div class="td">{{ toMinutes(song?.dt / 1000) }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { toMinutes } from "@/utils";
import { changeStr } from "../xuts";

export default defineComponent({
  name: "SongList",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      toMinutes,
      changeStr,
    };
  },
});
</script>

<style lang="less" scoped>
.song-list {
  .song-item {
    padding: 10px 10px 8px 18px;
    border: 1px solid #fff;
    &:nth-child(2n) {
      background: #f7f7f7;
      border-color: #f7f7f7;
    }
    &:hover {
      border-color: #e1e1e1;
      background: #f2f2f2;
      .opt {
        opacity: 1 !important;
      }
    }
    .td {
      float: left;
      margin-right: 5px;
      padding-bottom: 2px;
      a:hover {
        text-decoration: underline;
      }
      .hd {
        width: 17px;
        height: 17px;
        i {
          margin: 0;
          margin-right: 15px;
        }
      }
      .opt {
        opacity: 0;
        a,
        span {
          margin: 0 3px;
        }
      }
      .text {
        position: relative;
        display: inline-block;
        padding-right: 25px;
        width: auto;
        max-width: 100%;
        height: 20px;
      }
    }
    .w0 {
      width: 370px;
    }
    .w1 {
      width: 15%;
      margin-right: 12px;
      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      a {
        color: #333;
      }
    }
    .w2 {
      width: 18%;
      .text {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
