<template>
  <div class="playlist-song-list">
    <ms-frame>
      <template #title>
        <div class="title">包含歌曲列表</div>
      </template>
      <template #title-slot>
        <div class="title-slot">
          <span class="song-count">1首歌</span>
        </div>
      </template>
      <template #content>
        <div class="content">
          <table class="m-table">
            <thead>
              <tr>
                <th class="first">
                  <div>&nbsp;</div>
                </th>
                <th>
                  <div class="wp">歌曲列表</div>
                </th>
                <th class="w2-1">
                  <div class="wp">时长</div>
                </th>
                <th class="w4">
                  <div class="wp">歌手</div>
                </th>
                <th class="w5">
                  <div class="wp">专辑</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(song, index) in TrackAllList" :key="song.id">
                <td class="left">
                  <div class="hd">
                    <span
                      class="ply-icon table"
                      @click="
                        $store.dispatch('musiclist/ac_changePlayMusic', song)
                      "
                    ></span>
                    <span class="num">{{ index + 1 }}</span>
                  </div>
                </td>
                <td>
                  <div class="f-cb one-ellipsis">
                    <router-link
                      :to="{ path: '/song', query: { id: song?.id } }"
                      class="hover_underline"
                      >{{ song?.name }}</router-link
                    >
                  </div>
                </td>
                <td>
                  <div class="time one-ellipsis">
                    <span class="vl">03:13</span>
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
                </td>
                <td>
                  <div class="artist one-ellipsis">
                    <router-link
                      :to="{ path: '/artist', query: { id: ar?.id } }"
                      class="hover_underline"
                      v-for="ar in song?.ar"
                      :key="ar?.id"
                      >{{ ar?.name }}</router-link
                    >
                  </div>
                </td>
                <td>
                  <div class="alb one-ellipsis">
                    <router-link
                      class="hover_underline"
                      :to="{ path: '/album', query: { id: song?.al?.id } }"
                      >{{ song?.al?.name }}</router-link
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </ms-frame>
    <div class="more">
      <p>查看更多内容，请下载客户端</p>
      <div>
        <span>立即下载</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { toMinutes } from "@/utils";
import MsFrame from "@/components/ms-frame";

export default defineComponent({
  name: "DetailSongList",
  components: {
    MsFrame,
  },
  props: {
    TrackAllList: {
      type: Array,
      defautl: () => [],
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
.playlist-song-list {
  margin-top: 20px;
  box-sizing: border-box;
  width: 100%;
  .more {
    margin: 30px 0 40px 0;
    font-size: 14px;
    p {
      text-align: center;
    }
    div {
      span {
        display: block;
        width: 100px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        background: red;
        color: white;
        margin: 20px auto;
        border-radius: 25px;
      }
    }
  }
}
.title {
  float: left;
  font-size: 22px;
  line-height: 22px;
  padding-top: 10px;
}
.title-slot {
  margin: 16px 0 0 20px;
  float: left;
  font-size: 12px;
  color: #666;
}
.content {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  .m-table {
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    width: 100%;
    color: #666;
    text-align: left;
    border: 1px solid #d9d9d9;
    tr:nth-child(2n + 1) {
      td {
        background-color: #f7f7f7;
      }
    }
    th {
      height: 38px;
      background: url(~@/assets/images/table.png) repeat-x 0 0;
      background-color: #f7f7f7;
      vertical-align: top;
      font-weight: 400;
      vertical-align: middle;
    }
    td {
      padding: 6px 10px;
      vertical-align: top;
    }
    .first {
      width: 74px;
    }
    .w2-1 {
      width: 91px;
    }
    .w4 {
      width: 15%;
    }
    .w5 {
      width: 20%;
    }
    .wp {
      height: 18px;
      line-height: 18px;
      padding: 8px 10px;
    }
    tbody {
      color: #333;
      .left {
        .hd {
          height: 18px;
          .ply-icon {
            width: 17px;
            height: 17px;
            cursor: pointer;
            background-position: 0 -103px;
            float: right;
            &:hover {
              background-position: 0 -128px;
            }
          }
          .num {
            width: 25px;
            margin-left: 5px;
            color: #999;
          }
        }
      }
      .time {
        &:hover {
          .vl {
            display: none;
          }
          .opt {
            display: block;
          }
        }
        .opt {
          display: none;
          a,
          span {
            height: 14px !important;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
