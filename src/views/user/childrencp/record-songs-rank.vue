<template>
  <div class="record-songs-rank">
    <user-info-content title="听歌排行" class="play-record">
      <template #t-hd>
        <div class="t-hd clearfix">
          <span class="tit">听歌排行</span>
          <span class="song-count">累计听过9718首</span>
          <div class="tip">
            <i class="tip-btn q-icon2 q-icon2-tip cursor_pointer"></i>
            <span class="tip-msg">实际播放时间过短的歌曲将不纳入计算。</span>
          </div>
          <div class="change-data">
            <span
              class="hover_underline"
              :class="UserRecordType == 1 ? 'active' : ''"
              @click="changeUserRecordType(1)"
              >最近一周</span
            >
            <i></i>
            <span
              class="hover_underline"
              :class="UserRecordType == 0 ? 'active' : ''"
              @click="changeUserRecordType(0)"
              >所有时间</span
            >
          </div>
        </div>
      </template>
      <template #content>
        <record-songs :dataList="dataList">
          <template #record-item="{ data, index }">
            <div class="record-item">
              <div class="hd">
                <span class="song-index">{{ index + 1 }}.</span>
                <span class="play-icon cursor_pointer"
                  ><i class="q-table q-table-ply"></i
                ></span>
              </div>
              <div class="so-inf clearfix">
                <span class="so-sa"
                  ><a :href="`/song?id=${data?.song?.id || 0}`">{{
                    data?.song?.name
                  }}</a></span
                >
                <em>-</em>
                <i class="so-na"
                  ><a :href="`/artist?id=${data?.song?.ar[0]?.id || 0}`">{{
                    data?.song?.ar[0]?.name
                  }}</a></i
                >
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
              </div>
              <div class="progre">
                <div
                  class="progre-v"
                  :style="{ width: `${data?.score || 0}%` }"
                ></div>
              </div>
            </div>
          </template>
          <template #footer v-if="showFooter">
            <div class="record-footer">
              <a class="hover_underline" :href="`/user/songs/rank?id=${id}`"
                >查看更多></a
              >
            </div>
          </template>
        </record-songs>
      </template>
    </user-info-content>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import UserInfoContent from "./user-info-content.vue";
import RecordSongs from "./record-songs.vue";

export default defineComponent({
  name: "RecordSongsRank",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    UserRecordType: {
      type: Number,
      default: 1,
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserInfoContent,
    RecordSongs,
  },
  emits: ["changeUserRecordType"],
  setup(props, context) {
    const route = useRoute();
    const id = route?.query?.id | 0;

    const changeUserRecordType = (type = 1) => {
      context.emit("changeUserRecordType", type);
    };

    return {
      id,
      changeUserRecordType,
    };
  },
});
</script>

<style lang="less" scoped>
.t-hd {
  color: #666;
  .tit {
    float: left;
    font-size: 20px;
  }
  .song-count {
    float: left;
    font-size: 12px;
    margin: 0 9px;
    margin-top: 8px;
  }
  .tip {
    float: left;
    position: relative;
    &:hover {
      .tip-msg {
        display: block;
      }
    }
    .tip-btn {
      position: relative;
    }
    .tip-msg {
      display: none;
      padding: 12px 20px;
      border-radius: 2px;
      position: absolute;
      left: -40px;
      top: 27px;
      width: 295px;
      font-size: 12px;
      background-color: white;
      box-shadow: 0 0 1px #666;
    }
  }
  .change-data {
    float: right;
    span {
      font-size: 12px;
      vertical-align: middle;
    }
    span.active {
      color: #555;
      font-weight: 700;
    }
    i {
      display: inline-block;
      margin: 0 6px;
      width: 1px;
      height: 10px;
      background: #aaa;
    }
  }
}
.record-item {
  &:hover {
    background-color: #efefef !important;
    .opt {
      opacity: 1 !important;
    }
  }
  a:hover {
    text-decoration: underline;
  }
  height: 38px;
  line-height: 38px;
  .hd {
    float: left;
    .song-index {
      float: left;
      font-size: 16px;
      width: 38px;
      text-align: right;
      padding: 0 8px 0 5px;
    }
  }
  .so-inf {
    float: left;
    margin-left: 10px;
    width: 480px;
    font-size: 12px;
    color: #333;
    .so-sa a {
      font-weight: 700;
    }
    em {
      margin: 0 6px;
    }
    .so-na a {
      color: #aeaeae;
    }
    .opt {
      opacity: 0;
      transition: all 0.1s;
      float: right;
    }
  }
  .progre {
    float: right;
    width: 319px;
    height: 38px;
    .progre-v {
      background: #4eb4f5;
      opacity: 0.1;
      height: 38px;
      width: 0;
    }
  }
}
.record-footer {
  margin-top: 7px;
  text-align: right;
  font-size: 12px;
  a {
    color: #777;
    &:hover {
      color: #444;
    }
  }
}
</style>
