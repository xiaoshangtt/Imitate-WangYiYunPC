<template>
  <div class="playlist-reco">
    <div class="right">
      <slot name="right" :hotPlaylists="hotPlaylists"></slot>
    </div>
    <h3>
      <span>网易云音乐多端下载</span>
    </h3>
    <ul class="wy-dn sprite">
      <li>
        <a
          href="https://itunes.apple.com/cn/app/id590338362"
          target="_blank"
        ></a>
      </li>
      <li>
        <a
          class="pc"
          href="https://music.163.com/api/pc/download/latest"
          target="_blank"
        ></a>
      </li>
      <li>
        <a
          href="https://music.163.com/api/android/download/latest2"
          target="_blank"
        ></a>
      </li>
    </ul>
    <p class="tb">同步歌单，随时畅听320k好音乐</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DetailReco",
  props: {
    subscribers: {
      type: Array,
      default: () => [],
    },
    hotPlaylists: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="less" scoped>
.playlist-reco {
  h3 {
    font-size: 12px;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .hot-pl {
    li {
      margin-bottom: 15px;
      img {
        float: left;
        width: 50px;
        height: 50px;
      }
      .txt {
        margin-left: 60px;
        a:hover {
          text-decoration: underline;
        }
        .t-h {
          font-size: 14px;
          margin-top: 4px;
        }
        .t-d {
          margin-top: 9px;
          .by {
            float: left;
            font-size: 10px;
            color: #999;
            margin-right: 3px;
          }
          a {
            font-size: 12px;
            float: left;
            max-width: 106px;
          }
        }
      }
    }
  }
  .wy-dn {
    height: 65px;
    background-position: 0 -392px;
    margin-bottom: 10px;
    li {
      float: left;
      a {
        display: block;
        width: 42px;
        height: 48px;
        text-indent: -9999px;
      }
      .pc {
        width: 60px;
        margin: 0 26px 0 30px;
      }
    }
  }
  .tb {
    font-size: 12px;
    color: #999;
  }
}
</style>
