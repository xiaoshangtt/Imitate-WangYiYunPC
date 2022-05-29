<template>
  <div class="toplist-content">
    <div class="hd clearfix">
      <div class="hd-img">
        <img :src="info?.coverImgUrl" alt="" />
        <span class="mask coverall coverall-mask"></span>
      </div>
      <div class="hd-inop">
        <div class="inopc">
          <div class="top-name">
            <h2>{{ info?.name }}</h2>
          </div>
          <div class="rece-uptime">
            <em
              ><i class="q-icon q-icon-clock"></i> 最近更新：{{
                formatDate("MM月DD日", info?.updateTime)
              }}</em
            >
            <em
              class="tip"
              v-if="info?.updateTime < Date.now() - 1000 * 3600 * 24 * 7"
              >(刚刚更新)</em
            >
          </div>
          <!-- <div class="opt">
            <div class="play">
              <em>播放</em>
              <i>+</i>
            </div>
            <div class="add">
              <i></i>
              <em>（{{ info?.subscribedCount }}）</em>
            </div>
            <div class="fowd">
              <i></i>
              <em>（{{ info?.shareCount }}）</em>
            </div>
            <div class="download">
              <i></i>
              <em>下载</em>
            </div>
            <div class="comment">
              <i></i>
              <em>（{{ info?.commentCount }}）</em>
            </div>
          </div> -->
          <div class="btns clearfix">
            <a
              href="javascript:void(0)"
              class="ply button2"
              @click="
                $store.dispatch(
                  'musiclist/ac_playlistReplaceMusiclist',
                  info?.id
                )
              "
            >
              <i class="button2">
                <em class="ply-icon button2"></em>
                播放
              </i>
            </a>
            <a
              href="javascript:void(0)"
              @click="$store.dispatch('musiclist/ac_playlistAddMusiclist', info?.id)"
              class="ad button2"
            ></a>
            <a href="" class="fav i-btnu button2">
              <span class="button2">(2688081)</span>
            </a>
            <a href="" class="share i-btnu button2">
              <span class="button2">(12198)</span>
            </a>
            <a href="" class="download i-btnu button2">
              <span class="button2">下载</span>
            </a>
            <a href="" class="comment i-btnu button2">
              <span class="button2">评论</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <toplist-music-list
        :dataList="info?.tracks || []"
        :playCount="info?.playCount"
      ></toplist-music-list>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import ToplistMusicList from "./toplist-music-list.vue";

import { formatDate } from "@/utils";

export default defineComponent({
  name: "ToplistContent",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ToplistMusicList,
  },
  setup() {
    return {
      formatDate,
    };
  },
  update() {
    console.log(this.info);
  },
});
</script>

<style lang="less" scoped>
.toplist-content {
  .hd {
    padding: 40px;
    .hd-img {
      float: left;
      position: relative;
      width: 150px;
      height: 150px;
      border: 1px solid #ccc;
      padding: 3px;
      margin: 0 -220px 0 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .hd-inop {
      float: right;
      width: 100%;
      .inopc {
        margin-left: 187px;
        .top-name {
          padding: 16px 0 4px;
          h2 {
            font-size: 20px;
            font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
            font-weight: normal;
          }
        }
        .rece-uptime {
          margin: 0 0 20px;
          line-height: 35px;
          font-size: 12px;
          color: #666;
          .tip {
            color: #999;
          }
        }
        .opt {
          color: #333;
          & > div {
            display: inline-block;
            line-height: 30px;
            padding: 0 4px;
            margin: 0 4px;
            background: #fcfcfc;
            border: 1px solid #ccc;
            box-shadow: 0 0 2px #aaa;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            &:hover {
              background: white;
            }
          }
          .play {
            em {
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
  .content {
    padding: 0px 30px 40px 40px;
  }
}
</style>
