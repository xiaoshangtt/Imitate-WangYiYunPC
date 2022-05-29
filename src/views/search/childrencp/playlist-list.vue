<template>
  <div class="playlist-list">
    <table class="playlist-wamp">
      <tbody>
        <tr v-for="playlist in dataList" :key="playlist.id">
          <td class="w0">
            <div class="hd">
              <i
                @click="
                  $store.dispatch(
                    'musiclist/ac_playlistReplaceMusiclist',
                    playlist?.id
                  )
                "
                class="cursor_pointer ply-icon q-table q-table-ply"
              ></i>
            </div>
          </td>
          <td class="w1">
            <div class="cover-img">
              <router-link
                :to="{ path: '/playlist', query: { id: playlist?.id } }"
              >
                <img :src="playlist?.coverImgUrl" />
                <span class="mask coverall"></span>
              </router-link>
            </div>
          </td>
          <td class="w2">
            <div class="f-c clearfix">
              <div class="opt">
                <a
                  href="javascript:void(0)"
                  class="q-icon q-icon-four q-icon-add"
                  @click="
                    $store.dispatch(
                      'musiclist/ac_playlistAddMusiclist',
                      playlist?.id
                    )
                  "
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
              </div>
              <div class="tt">
                <span class="text">
                  <router-link
                    :to="{ path: '/playlist', query: { id: playlist?.id } }"
                    v-html="
                      changeStr(playlist?.name, $route.query?.keywords || '')
                    "
                  ></router-link>
                </span>
              </div>
            </div>
          </td>
          <td class="w3">{{ playlist?.trackCount }}首</td>
          <td class="w4">
            <div class="text">
              <span>by</span>
              &nbsp;
              <router-link
                :to="{
                  path: '/user/home',
                  query: { id: playlist?.creator?.userId },
                }"
                v-html="
                  changeStr(
                    playlist?.creator?.nickname,
                    $route.query?.keywords || ''
                  )
                "
              ></router-link>
            </div>
          </td>
          <td class="w5">
            收藏：
            <span>{{ toWan(playlist?.bookCount) }}</span>
          </td>
          <td class="w6">
            收听：
            <span>{{ toWan(playlist?.playCount) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { toWan } from "@/utils";
import { changeStr } from "../xuts";

export default defineComponent({
  name: "PlaylistList",
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
    };
  },
});
</script>

<style lang="less" scoped>
.playlist-list {
  .playlist-wamp {
    table-layout: fixed;
    border-collapse: collapse;
    tr:nth-child(2n) {
      background-color: #f7f7f7;
      td {
        border-color: #f7f7f7;
      }
    }
    tr:hover {
      td {
        border-color: #f2f2f2;
        border-top-color: #e1e1e1;
        border-bottom-color: #e1e1e1;
        background-color: #f2f2f2;
      }
      .w0 {
        border-left-color: #e1e1e1;
      }
      .w6 {
        border-right-color: #e1e1e1;
      }
      .w2 {
        .opt {
          display: block !important;
        }
      }
    }
    tr {
      td {
        padding: 6px 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        color: #999;
        border: 1px solid #fff;
        a:hover {
          text-decoration: underline;
        }
      }
      .w0 {
        width: 25px;
        .hd {
          height: 18px;
          padding-left: 5px;
        }
        .ply-icon {
          float: right;
          margin: 0;
        }
      }
      .w1 {
        widows: 50px;
        .cover-img {
          position: relative;
          width: 50px;
          height: 50px;
          img {
            width: 100%;
            height: 100%;
          }
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-position: -160px 0;
          }
        }
      }
      .w2 {
        width: 327px;
        .f-c {
          .tt {
            float: left;
            width: 100%;
            margin-right: -100px;
            .text {
              position: relative;
              display: inline-block;
              margin-right: -25px;
              max-width: 75%;
              height: 20px;
              white-space: nowrap;
              a {
                display: inline-block;
                max-width: 210px;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
          .opt {
            position: relative;
            z-index: 9;
            display: none;
            float: right;
            a,
            span {
              margin: 0 2px;
            }
          }
        }
      }
      .w3 {
        width: 35px;
        padding-right: 0;
        padding-left: 25px;
      }
      .w4 {
        width: 18%;
        .text {
          width: 100%;
          position: relative;
          white-space: nowrap;
          color: #666;
          a {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #666;
            max-width: 100px;
            vertical-align: middle;
          }
        }
      }
      .w5,
      .w6 {
        width: 100px;
      }
    }
  }
}
</style>
