<template>
  <div class="program-list">
    <div class="hd">
      <a
        href="javascript:void(0)"
        @click="pickStatus = !pickStatus"
        class="pickop"
      >
        {{ pickStatus ? "收起" : "展开" }}
        <i class="q-icon2" :class="pickStatus ? 'pickup' : 'pickdown'"></i>
      </a>
      <div class="tit">
        <strong>节目包含歌曲列表</strong>
        <span>（3首歌）</span>
      </div>
    </div>
    <div class="content">
      <table class="cn-table" v-show="pickStatus">
        <tr v-for="song in dataList" :key="song.id">
          <td class="first col1">
            <div class="ihd">
              <i class="ply-icon q-table q-table-ply"></i>
              <span class="idx">1</span>
            </div>
          </td>
          <td class="col2 one-ellipsis">
            <div class="col2-bx">
              <a
                href=""
                class="song-name hover_underline"
                :title="song?.name"
                >{{ song?.name }}</a
              >
              <span class="song-subname" v-if="song?.transName"
                > - ({{ song?.transNames?.join("/") }})</span
              >
            </div>
          </td>
          <td class="col3">
            <div class="time">{{ toMinutes(song?.duration / 1000) }}</div>
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
          <td class="col4">
            <div>
              <a class="song-artist one-ellipsis">
                <router-link
                  class="hover_underline"
                  :to="{ path: '/artist', query: { id: artist?.id } }"
                  v-for="artist in song?.artists || []"
                  :key="artist.id"
                  >{{ artist?.name }}</router-link
                >
              </a>
            </div>
          </td>
          <td class="col5 one-ellipsis">
            <router-link
              :to="{ path: '/album', query: { id: song?.album?.id } }"
              class="song-album hover_underline"
              >{{ song?.album?.name }}</router-link
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { toMinutes } from "@/utils";

export default defineComponent({
  name: "ProgramList",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    // true是展开状态
    const pickStatus = ref(true);
    return {
      toMinutes,
      pickStatus,
    };
  },
});
</script>

<style lang="less" scoped>
.program-list {
  font-size: 12px;
  .hd {
    height: 32px;
    line-height: 33px;
    padding: 0 10px;
    margin-bottom: -1px;
    overflow: hidden;
    background: #f7f7f7;
    border: 1px solid #d9d9d9;
    strong {
      color: #333;
    }
    span {
      color: #666;
    }
    .pickop {
      float: right;
      line-height: 17px;
      margin: 7px 6px 0 0;
    }
    .pickup,
    .pickdown {
      display: inline-block;
      width: 9px;
      height: 5px;
      margin-left: 5px;
      vertical-align: middle;
    }
    .pickup {
      background-position: -75px -29px;
    }
    .pickdown {
      background-position: -75px -20px;
    }
  }
  .content {
    .cn-table {
      table-layout: fixed;
      border: 1px solid #d9d9d9;
      tr:nth-child(2n) {
        background-color: #f7f7f7;
      }
      td {
        padding: 6px 10px;
        line-height: 18px;
        text-align: left;
      }
      .col1 {
        width: 54px;
      }
      .col2 {
        width: 238px;
        span {
          color: #aeaeae;
        }
      }
      .col3 {
        width: 69px;
        position: relative;
        &:hover {
          .time {
            display: none;
          }
          .opt {
            display: block;
          }
        }
        .opt {
          display: none;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 10px;
          a,
          span {
            height: 14px !important;
            margin: 0px;
          }
        }
      }
      .col4 {
        width: 70px;
        div {
          max-width: 70;
        }
        .song-artist {
          max-width: 70px;
          display: block;
        }
      }
      .col5 {
        width: 107px;
      }
      .first {
        .ihd {
          height: 18px;
          .ply-icon {
            float: right;
            vertical-align: middle;
            margin: 0;
          }
          .idx {
            width: 25px;
            margin-left: 5px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
