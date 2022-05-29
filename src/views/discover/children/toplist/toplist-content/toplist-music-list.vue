<template>
  <div class="toplist-music-list">
    <div class="hd clearfix">
      <h3>歌曲列表</h3>
      <span class="listCount">{{ dataList.length }}首歌</span>
      <div class="playerCount">
        播放：<em>{{ playCount }}</em
        >次
      </div>
    </div>
    <div class="table-bx">
      <table>
        <thead>
          <tr>
            <th class="w1"></th>
            <th class="">标题</th>
            <th class="w3">时长</th>
            <th class="w4">歌手</th>
          </tr>
        </thead>
        <tbody>
          <tr class="listitem" v-for="(song, index) in dataList" :key="song.id">
            <td class="index">
              <span class="indexnum">{{ index + 1 }}</span>
              <i
                class="type q-icon"
                :class="`q-icon-${
                  song?.fee == 0 ? 'new' : song?.fee > 0 ? 'up' : 'down'
                }`"
              >
                <template v-if="song?.fee != 0">
                  {{ song?.fee }}
                </template>
              </i>
            </td>
            <td>
              <router-link
                class="cursor_pointer"
                :to="{ path: '/song', query: { id: song?.id } }"
                v-if="index < 3"
              >
                <img class="img" :src="song?.al?.picUrl || ''" alt="" />
              </router-link>
              <div class="songar clearfix">
                <i
                  class="q-table q-table-ply"
                  @click="$store.dispatch('musiclist/ac_changePlayMusic', song)"
                ></i>

                <span class="hover_underline">
                  <router-link :to="{ path: '/song', query: { id: song?.id } }">
                    {{ song?.name }}
                  </router-link>
                </span>
              </div>
            </td>
            <td class="time">
              <span class="val">{{ toMinutes(song?.dt / 1000 || 0) }}</span>
              <div class="opt">
                <a
                  href=""
                  class="q-icon q-icon-four q-icon-add"
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
            </td>
            <td>
              <a href="">
                <span
                  class="hover_underline"
                  v-for="ar in song?.ar"
                  :key="ar.id"
                  >{{ ar.name }}</span
                >
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { toMinutes } from "@/utils";

export default defineComponent({
  name: "ToplistMusicList",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    playCount: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {
      toMinutes,
    };
  },
});
</script>

<style lang="less" scoped>
.toplist-music-list {
  .hd {
    font-size: 12px;
    color: rgb(102, 102, 102);
    height: 33px;
    border-bottom: 2px solid rgb(194, 12, 12);
    h3 {
      float: left;
      font-size: 20px;
      font-weight: 400;
      color: rgb(51, 51, 51);
    }
    .listCount {
      float: left;
      padding: 9px 0px 0px 20px;
    }
    .playerCount {
      margin-top: 5px;
      float: right;
      em {
        color: rgb(194, 12, 12);
      }
    }
  }
  .table-bx {
    border: 1px solid #d9d9d9;

    table {
      border-collapse: collapse;
      text-align: left;
      width: 100%;
      font-size: 12px;
      color: rgb(102, 102, 102);
      table-layout: fixed;
      th {
        height: 38px;
        padding-left: 10px;
      }
      th.w1 {
        width: 77px;
      }
      th.w3 {
        width: 91px;
      }
      th.w4 {
        width: 26%;
      }
      td {
        padding: 6px 10px;
        line-height: 18px;
      }
      thead {
        tr {
          border-bottom: 1px solid #eee;
        }
      }
      tbody {
        tr:nth-child(1),
        tr:nth-child(2),
        tr:nth-child(3) {
          td {
            padding-top: 10px !important;
            padding-bottom: 10px !important;
          }
          .songar {
            margin-top: 12px;
          }
        }
        .listitem:nth-child(2n + 1) {
          background-color: rgb(247, 247, 247);
        }
        tr {
          td {
            height: auto;
          }
          .index {
            .indexnum {
              float: left;
              width: 25px;
              text-align: center;
            }
            .type {
              margin-left: 10px;
              float: left;
              width: 16px;
              padding-left: 8px;
              line-height: 17px;
              height: 17px;
              font-size: 10px;
              font-family: Arial, Helvetica, sans-serif;
            }
          }
          .img {
            float: left;
            width: 50px;
            height: 50px;
            vertical-align: top;
            margin-right: 14px;
          }
          .songar {
            margin-right: 20px;
            // height: 20px;
            i {
              float: left;
              transform: translateY(-5px);
              margin-right: 5px;
              cursor: pointer;
            }
            span {
              float: left;
              width: 66%;
              margin-top: 5px;
              cursor: pointer;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .time {
            .val {
              display: block;
            }
            .opt {
              display: none;
              * {
                margin: 0 1px !important;
              }
            }
          }
          .time:hover {
            .val {
              display: none;
            }
            .opt {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
