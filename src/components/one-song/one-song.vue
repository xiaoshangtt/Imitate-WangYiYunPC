<template>
  <div class="one-song">
    <div class="song-img" :style="{ width, height }">
      <img
        v-lazy="song?.picUrl || song.coverImgUrl || song?.al?.picUrl"
        alt=""
        v-bind="imgOriginAttr"
      />
      <router-link
        class="coverall"
        :to="{ path: '/playlist', query: { id: song.id } }"
      ></router-link>
      <div class="mask" v-if="showMask">
        <slot name="mask">
          <img class="t" src="~@/assets/images/听歌.png" alt="" />
          <span v-tent="song.playCount || 0"></span>
          <img
            @click="changePlaylist"
            class="b"
            src="~@/assets/images/播放.png"
            alt=""
          />
        </slot>
      </div>
    </div>
    <div v-if="showBottomText" class="song-text">
      <slot name="song-text" :song="song">
        <p :class="`${moEllipsis}-ellipsis`">{{ song?.name }}</p>
      </slot>
      <slot name="song-subtext" :song="song"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "OneSong",
  props: {
    width: {
      type: String,
      default: "140px",
    },
    height: {
      type: String,
      default: "140px",
    },
    moEllipsis: {
      validate(value) {
        return value in ["one", "two"];
      },
      default: "one",
    },
    imgOriginAttr: {
      type: Object,
      default: () => ({}),
    },
    song: {
      type: Object,
      default: () => ({}),
    },
    showMask: {
      type: Boolean,
      default: false,
    },
    showBottomText: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const changePlaylist = () => {
      store.dispatch("musiclist/ac_playlistReplaceMusiclist", props.song.id);
    };
    return {
      changePlaylist,
    };
  },
});
</script>

<style lang="less" scoped>
.one-song {
  cursor: pointer;
  overflow: hidden;
  .song-img {
    position: relative;
    width: 140px;
    height: 140px;
    overflow: hidden;
    border-radius: 4px;
    img {
      width: 100%;
      transition: all 0.3s;
    }
    .coverall {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url(~@/assets/images/coverall.png) no-repeat 0 0;
      z-index: 5;
    }
    .mask {
      position: absolute;
      z-index: 9;
      bottom: 0;
      width: 100%;
      height: 25px;
      line-height: 25px;
      font-size: 13px;
      background: rgba(0, 0, 0, 0.4);
      color: #ddd;
      padding-left: 9px;
      img {
        vertical-align: text-top;
      }
      img.t {
        margin-top: 1px;
        width: 15px;
        margin-right: 5px;
      }
      img.b {
        width: 20px;
        float: right;
        margin-right: 15px;
        margin-top: 2px;
      }
    }
  }
  .song-img:hover {
    & > img {
      transform-origin: 50% 50%;
      transform: scale(1.03);
    }
  }
  .song-text {
    font-size: 14px;
    width: 140px;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 17px;
    margin-top: 6px;
  }
}
</style>
