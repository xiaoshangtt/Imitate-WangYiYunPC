<template>
  <div class="lyric-list">
    <div class="lyric-wamp" v-for="song in dataList" :key="song?.id">
      <div class="item clearfix">
        <div class="td">
          <div class="hd">
            <i
              @click="$store.dispatch('musiclist/ac_changePlayMusic', song)"
              class="ply-icon q-table q-table-ply hover_underline"
            ></i>
          </div>
        </div>
        <div class="td w0">
          <div class="sn">
            <div class="text one-ellipsis">
              <a href="">
                <span
                  v-html="changeStr(song?.name, $route.query?.keywords || '')"
                ></span>
                <span class="alia"> - </span>
                <span class="alia" v-for="alia in song?.alia" :key="alia"
                  >({{ alia }})</span
                >
              </a>
            </div>
          </div>
        </div>
        <div class="td">
          <div class="opt">
            <a
              href="javascript:void(0)"
              class="q-icon q-icon-four q-icon-add"
              @click="$store.commit('musiclist/mu_addMusic', song)"
              title="添加到播放列表"
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
            <template v-for="(ar, index) in song?.ar" :key="ar?.id">
              <template v-if="index > 0"> / </template>
              <router-link :to="{ path: '/artist', query: { id: ar?.id } }">{{
                ar?.name
              }}</router-link>
            </template>
          </div>
        </div>
        <div class="td w2">
          <div class="text">
            <router-link :to="{ path: '/album', query: { id: song?.al?.id } }"
              >《{{ song?.al?.name }}》</router-link
            >
          </div>
        </div>
        <div class="td">{{ toMinutes(song?.dt / 1000) }}</div>
      </div>
      <div class="lyric">
        <div class="lrc_zs" v-if="!song?.showAllLyric">
          <template
            v-for="(lyricline, index) in song?.lyrics.slice(0, 4)"
            :key="index"
          >
            <p v-html="changeStr(lyricline, $route.query?.keywords || '')"></p>
          </template>
        </div>
        <div class="lrc_zs_z" v-else>
          <template v-for="(lyricline, index) in song?.lyrics" :key="index">
            <p v-html="changeStr(lyricline, $route.query?.keywords || '')"></p>
          </template>
        </div>

        <div class="moreb" v-if="!song?.showAllLyric">
          <a @click="song.showAllLyric = true" href="javascript:void(0)">
            展开<i class="down q-icon"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { toMinutes } from "@/utils";
import { changeStr } from "../xuts";

export default defineComponent({
  name: "LyricList",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      changeStr,
      toMinutes,
    };
  },
});
</script>

<style lang="less" scoped>
.lyric-list {
  .lyric-wamp {
    &:nth-child(2) {
      .item {
        background: #f7f7f7;
      }
    }
    a:hover {
      text-decoration: underline;
    }
    a {
      color: #333;
    }
    .item {
      padding: 14px 10px 12px 18px;
      border: 1px solid #fff;
      &:hover {
        border: 1px solid #e1e1e1;
        background-color: #f2f2f2;
        .td .opt {
          opacity: 1;
        }
      }
      .td {
        float: left;
        margin-right: 5px;
        .hd {
          .ply-icon {
            margin: 0;
          }
        }
        .opt {
          opacity: 0;
          margin-right: 2px;
          a,
          span {
            margin: 0 3px;
          }
        }
        .text {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .w0 {
        width: 370px;
        .alia {
          color: #aeaeae;
        }
      }
      .w1 {
        width: 15%;
        margin-right: 12px;
      }
      .w2 {
        width: 18%;
        margin-right: 12px;
        min-height: 16px;
      }
    }
    .lyric {
      padding: 10px 0 18px 52px;
      color: #666;
      line-height: 23px;
      word-wrap: break-word;
      word-break: break-all;
      .song-nm {
        color: #0c73c2;
      }
      .moreb {
        a {
          color: #666;
        }
        .down {
          width: 17px;
          height: 8px;
          margin-right: 5px;
          vertical-align: middle;
          background-position: -65px -520px;
        }
      }
    }
  }
}
</style>
