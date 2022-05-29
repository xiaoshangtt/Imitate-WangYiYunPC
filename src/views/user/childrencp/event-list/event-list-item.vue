<template>
  <li class="event-list-item">
    <div class="avatar">
      <a :href="`/user/home?id=${eventInfo?.user?.userId}`">
        <img v-lazy="eventInfo?.user?.avatarUrl" alt="" />
      </a>
    </div>
    <div class="event-info">
      <div class="hd">
        <a
          class="nickname linka hover_underline"
          :href="`/user/home?id=${eventInfo?.user?.userId}`"
        >
          {{ eventInfo?.user?.nickname }}
        </a>
        <img
          class="u-icn-new"
          v-lazy="eventInfo?.user?.avatarDetail?.identityIconUrl"
          alt=""
        />
        <span>分享单曲</span>
        <p class="time">
          <span>{{
            formatDate("YYYY年MM月DD日 hh:mm:ss", eventInfo?.eventTime)
          }}</span>
        </p>
      </div>
      <div class="event-info-content">
        <div class="info-detail">
          <span v-html="transStr(JSON?.parse(eventInfo?.json).msg)"></span>
          <br />
        </div>
        <div
          class="share-music"
          v-if="musicInfo?.song || musicInfo?.resource?.title"
        >
          <div class="music-img">
            <img
              :src="
                musicInfo?.song?.img80x80 ||
                musicInfo?.song?.album?.img80x80 ||
                musicInfo?.resource?.coverImgUrl
              "
              class="music-img"
            />
            <a class="frd_dyn_sprite frd_dyn_sprite-white mask"></a>
          </div>
          <div class="music-inf">
            <template v-if="musicInfo?.song">
              <p>
                <a
                  class="music-name hover_underline"
                  :href="`/song?id=${musicInfo?.song?.id}`"
                >
                  {{ musicInfo?.song?.name }}
                </a>
              </p>
              <p>
                <a
                  class="music-singer hover_underline"
                  v-for="ar in musicInfo?.song?.artists"
                  :href="`/user/home?id=${ar?.id}`"
                  :key="ar.id"
                  >{{ ar.name }}</a
                >
              </p>
            </template>
            <template v-else>
              <p>
                <a
                  class="title hover_underline"
                  :href="musicInfo?.resource?.webviewUrl"
                  target="_blank"
                >
                  {{ musicInfo?.resource?.title }}
                </a>
              </p>
            </template>
          </div>
        </div>
        <ul v-if="eventInfo?.pics" class="event-imglist clearfix">
          <li
            class="event-imglist-item"
            v-for="(pic, index) in eventInfo?.pics"
            :key="index"
          >
            <img v-lazyload:src="pic?.originUrl" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <div class="footer clearfix">
      <div class="opt">
        <span class="linka">
          <i class="opt-give frd_dyn_sprite frd_dyn_sprite-give"></i>
          (192)
        </span>
        <em>|</em>
        <span class="linka">转发(1)</span>
        <em>|</em>
        <span class="linka">评论(17)</span>
      </div>
    </div>
  </li>
</template>

<script>
import { computed, defineComponent } from "vue";

import { regexpChar, formatDate } from "@/utils";

export default defineComponent({
  name: "EventListItem",
  updated() {
    console.log(this.eventInfo);
  },
  props: {
    eventInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const transStr = (str) => {
      const text = regexpChar(
        "#",
        str,
        `<a href="/666" class="linka" target="_blank">(target)</a>`
      );
      return text;
    };

    const musicInfo = computed(() => {
      const obj = JSON?.parse(props.eventInfo?.json || "");
      return obj;
    });

    return {
      transStr,
      musicInfo,
      formatDate,
    };
  },
});
</script>

<style lang="less" scoped>
.event-list-item /deep/ .linka {
  color: rgb(12, 115, 194);
}
.event-list-item {
  // content-visibility: auto;
  position: relative;
  padding: 20px 0px;
  border-bottom: 1px solid #e8e8e9;
  .avatar {
    position: absolute;
    top: 20px;
    left: 0;
    width: 54px;
    a {
      img {
        width: 45px;
        height: 45px;
      }
    }
  }
  .event-info {
    position: relative;
    margin-top: 4px;
    margin-left: 55px;
    font-size: 14px;
    .hd {
      .u-icn-new {
        width: 15px;
        height: 15px;
        margin-right: 3px;
      }
      .time {
        margin-top: 7px;
        font-size: 12px;
        color: rgb(153, 153, 153);
      }
    }
    .event-info-content {
      line-height: 24px;
      .info-detail {
        margin-top: 10px;
        white-space: pre-line;
      }
      .share-music {
        display: block;
        position: relative;
        padding: 10px;
        margin: 4px 0px 5px;
        background-color: rgb(245, 245, 245);
        .music-img {
          position: relative;
          width: 40px;
          height: 40px;
          img {
            position: relative;
            top: 0;
            left: 0;
          }
          .mask {
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        .music-inf {
          display: block;
          position: absolute;
          top: 10px;
          left: 60px;
          p {
            line-height: 20px;
            .music-name {
              font-size: 14px;
            }
            .music-singer {
              font-size: 12px;
              color: rgb(102, 102, 102);
            }
            .title {
              line-height: 40px;
            }
          }
        }
      }
      .event-imglist {
        display: block;
        .event-imglist-item {
          position: relative;
          float: left;
          width: 110px;
          height: 110px;
          margin-top: 4px;
          margin-left: 4px;
          overflow: hidden;
          img {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            height: 100%;
          }
        }
      }
    }
  }
  .footer {
    margin-top: 10px;
    padding-top: 10px;
    .opt {
      float: right;
      font-size: 12px;
      .opt-give {
        display: inline-block;
      }
      em {
        margin: 0 10px 0 12px;
        color: #c7c7c7;
      }
    }
  }
}
</style>
