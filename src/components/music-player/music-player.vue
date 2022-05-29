<template>
  <div
    class="music-player"
    @mouseenter="changeMusicPlayerStatus(true)"
    @mouseleave="changeMusicPlayerStatus(false)"
  >
    <div class="play-wamp" :style="{ top: ifMusicPlayerShow ? '-53px' : '0' }">
      <div class="updn">
        <div class="left playbar">
          <a
            @click="changeFrameFixedStatus"
            href="javascript:void(0)"
            class="btn-unlock playbar"
            :class="ifFrameFixed ? '' : 'btn-lock'"
          ></a>
        </div>
        <div class="right playbar"></div>
      </div>
      <div class="bg playbar"></div>
      <div class="hand" title="展开播放条"></div>
      <div class="wamp-main">
        <div class="btns">
          <a href="javascript:void(0)" class="pre playbar" title="上一首"></a>
          <a
            href="javascript:void(0)"
            class="play playbar"
            :class="currentPlayStatus == 'pause' ? '' : 'pas'"
            title="播放/暂停（p）"
            @click="controllPly"
            >播放/暂停</a
          >
          <a href="javascript:void(0)" class="next playbar" title="下一首"></a>
        </div>
        <div class="head">
          <img :src="currentPlayMusic?.al?.picUrl" />
          <a href="" class="mask playbar"></a>
        </div>
        <div class="play">
          <div class="words">
            <a href="javascript:void(0)" class="name hed-ellipsis">{{
              currentPlayMusic?.name
            }}</a>
            <span class="ar hed-ellipsis">
              <template
                v-for="(ar, index) in currentPlayMusic?.ar"
                :key="ar.id"
              >
                <template v-if="index > 0"> / </template>
                <a href="javascript:void(0)" title="职业十宗最 | 自由撰稿人">{{
                  ar?.name
                }}</a>
              </template>
            </span>
            <a href="javascript:void(0)" class="src playbar"></a>
          </div>
          <div class="pgs-br">
            <div class="pgs-mn statbar" ref="bgBxRef" @click.stop="changeBg">
              <div class="rdy statbar" :style="{ width: cachePg + '%' }"></div>
              <div
                class="cur statbar"
                ref="bgRef"
                :style="{ width: bgValue * 100 + '%' }"
              >
                <span class="cur-btn iconall"></span>
              </div>
            </div>
            <span class="time">
              <span>{{ toMinutes(currentTime) }}</span> /
              {{ toMinutes(currentPlayMusic?.dt / 1000) }}
            </span>
          </div>
        </div>
        <div class="oper">
          <a href="javascript:void(0)" class="icn icn-pip" title="画中画歌词"
            >画中画歌词</a
          >
          <a href="javascript:void(0)" class="icn icn-zan playbar" title="赞"
            >赞</a
          >
          <a
            href="javascript:void(0)"
            class="icn icn-share playbar"
            title="分享"
            >分享</a
          >
        </div>
        <div class="ctrl">
          <div class="m-vol" v-show="showVolume">
            <div class="barbg playbar"></div>
            <div class="vbg">
              <div
                class="curr playbar"
                :style="{ height: 93 * volume + 'px' }"
              ></div>
              <span
                ref="volumeRef"
                class="btn iconall"
                :style="{ top: 81 * (1 - volume) + 'px' }"
              ></span>
            </div>
          </div>
          <a
            @click="showVolume = !showVolume"
            href="javascript:void(0)"
            class="icn icn-vol playbar"
            :class="volume == 0 ? 'icn-volno' : ''"
          ></a>
          <a href="javascript:void(0)" class="icn icn-loop playbar"></a>
          <span class="add">
            <span class="tip playbar" style="display: none"
              >已添加到播放列表</span
            >
            <a
              href="javascript:void(0)"
              @click="changeMusicListStatus"
              title="播放列表"
              class="icn icn-list playbar"
              >{{ musiclist?.length }}</a
            >
          </span>
        </div>
      </div>
      <div class="music-list" v-show="showMusicList">
        <div class="list-hd playlist_bg">
          <div class="list-hdc">
            <h4>播放列表(17)</h4>
            <a href="javascript:void(0)" class="addall">
              <i class="ico ico-add playlist"></i>
              <span>收藏全部</span>
            </a>
            <span class="line"></span>
            <a href="javascript:void(0)" class="clear">
              <i class="ico ico-clear playlist"></i>
              <span>清除</span>
            </a>
            <p class="lytit hed-ellipsis">Belly Dancer</p>
            <span class="close playlist" @click="changeMusicListStatus"
              >关闭</span
            >
          </div>
        </div>
        <div class="list-bd playlist_bg">
          <img class="imgbg" style="top: -180px" src="~@/assets/images/1.jpg" />
          <div class="list-bdc">
            <ul
              ref="musiclistBxRef"
              :style="{ transform: `translateY(${listOffset}px)` }"
            >
              <template v-for="music in musiclist" :key="music.id">
                <li
                  class="clearfix"
                  :class="music.id == currentPlayMusic.id ? ' list-active' : ''"
                  @dblclick="changePlayMusic(music)"
                >
                  <div class="col col1">
                    <div
                      v-if="currentPlayMusic.id == music.id"
                      class="playicn playlist"
                    ></div>
                  </div>
                  <div class="col col2">{{ music?.name }}</div>
                  <div class="col col3">
                    <div class="icns">
                      <i class="icon icon-del playlist" title="删除">删除</i>
                      <i class="icon icon-dl playlist" title="下载">下载</i>
                      <i class="icon icon-share playlist" title="分享">分享</i>
                    </div>
                  </div>
                  <div class="col col4">
                    <template v-for="(ar, index) in music?.ar" :key="ar.id">
                      <template v-if="index > 1"> /</template>
                      <a href="javascript:void(0)" :title="ar?.name">{{
                        ar?.name
                      }}</a>
                    </template>
                  </div>
                  <div class="col col5">
                    {{ toMinutes((music?.dt || 1) / 1000) }}
                  </div>
                  <div class="col col6">
                    <div class="icon icon-src playlist"></div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div class="bline">
            <span
              ref="musiclistScrollRef"
              class="scrol"
              style="display: block; top: 0px"
              :style="{
                height: `${
                  ((musiclistBxRef?.offsetHeight + canListHeight) /
                    musiclistBxRef?.offsetHeight) *
                  100
                }%`,
                top: 260 * (-listOffset / musiclistBxRef?.offsetHeight) + 'px',
              }"
            ></span>
          </div>
          <div class="mask2"></div>
          <div class="listlyric">
            <div class="nocnt nolyric">
              <span>电台节目，无歌词</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getSongUrl } from "@/network/com";

import { musicP, debounce, toMinutes } from "@/utils";

export default defineComponent({
  name: "MusicPlayer",
  setup() {
    const store = useStore();
    const route = useRoute();
    const showMusicList = ref(false);
    const ifFrameFixed = ref(true);
    const ifMusicPlayerShow = ref(true);
    // 当前音量
    const showVolume = ref(false);
    const volume = ref(0.5);
    const volumeRef = ref(null);
    musicP.setVolume(volume.value);
    const volumeWatch = watch(volume, () => {
      musicP.setVolume(volume.value);
    });
    onUnmounted(() => {
      volumeWatch();
    });

    onMounted(() => {
      volumeRef.value.addEventListener("mousedown", (de) => {
        let top = de.target.offsetTop;
        let startY = de.clientY;
        function moveFn(me) {
          let volumeValue = 1 - (me.clientY - startY + top) / 81;
          if (volumeValue >= 0 && volumeValue <= 1) {
            volume.value = volumeValue;
          }
        }
        volumeRef.value.addEventListener("mousemove", moveFn);
        volumeRef.value.addEventListener("mouseup", (ue) => {
          volumeRef.value.removeEventListener("mousemove", moveFn);
        });
        volumeRef.value.addEventListener("mouseover", (oe) => {
          volumeRef.value.removeEventListener("mousemove", moveFn);
        });
      });
    });

    // 处理歌单那边的滚动条
    const musiclistBxRef = ref(null);
    const musiclistScrollRef = ref(null);

    const listParent = ref(null);
    const listbx = ref(null);

    // 歌单可滚动高度
    let canScrollHeight = 0;
    let canListHeight = ref(0);
    let listScroll = null;
    let listScrollParent = null;

    // 对列表进行偏移的量
    const listOffset = ref(0);
    onUpdated(() => {
      listScroll = musiclistScrollRef.value;
      listScrollParent = musiclistScrollRef.value.parentNode;
      canScrollHeight = listScrollParent.offsetHeight - listScroll.offsetHeight;
      canListHeight.value =
        listParent?.value?.offsetHeight - listbx?.value?.offsetHeight;
    });

    onMounted(() => {
      listParent.value = musiclistBxRef.value.parentNode;
      listbx.value = musiclistBxRef.value;

      listParent.value.addEventListener("wheel", (e) => {
        if (canListHeight.value < 0) {
          if (listOffset.value - e.deltaY >= 0) {
            listOffset.value = 0;
          } else if (listOffset.value - e.deltaY <= canListHeight.value) {
            listOffset.value = canListHeight.value;
          } else {
            listOffset.value -= e.deltaY;
          }
        }
      });
    });

    const changeMusicListStatus = (bool = false) => {
      showMusicList.value = !showMusicList.value;
    };
    const changeFrameFixedStatus = () => {
      ifFrameFixed.value = !ifFrameFixed.value;
    };
    let timer = null;
    // 修改音乐播放器的固定状态
    const changeMusicPlayerStatus = debounce((bool = false) => {
      if (bool == true) {
        timer && clearTimeout(timer);
        ifMusicPlayerShow.value = bool;
      }
      if (bool == false && !ifFrameFixed.value && !showMusicList.value) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          ifMusicPlayerShow.value = bool;
        }, 2000);
      }
    }, 100);

    // 获取播放列表歌曲
    const musiclist = computed(() => store.state.musiclist.musiclist);
    // 获取当前正在播放歌曲
    const currentPlayMusic = computed(
      () => store.getters["musiclist/ge_getCurrentPlayMusic"]
    );
    store.dispatch("musiclist/ac_playMusic");

    // 缓存进度
    const cachePg = ref(0);
    // 是否缓冲到可播放时
    const ifCanply = ref(false);
    // 当前播放时间
    const currentTime = ref(0);
    // 播放进度
    const currentPg = computed(() => {
      return (currentTime.value / duration.value).toFixed(3) * 100;
    });
    // 总时间
    const duration = ref(0);
    // 播放状态
    const currentPlayStatus = ref("pause");
    musicP.Ctx.loop = true;
    // 修改播放状态
    const controllPly = () => {
      if (ifCanply.value) {
        if (musicP.Ctx.paused) {
          currentPlayStatus.value = "play";
        } else {
          currentPlayStatus.value = "pause";
        }
      }
    };

    watch(currentPlayStatus, (newValue) => {
      if (newValue == "play") {
        musicP.play();
      } else if (newValue == "pause") {
        musicP.pause();
      }
    });

    // 绑定事件
    // 监听开始请求数据时
    musicP.on("loadstart", () => {
      currentTime.value = 0;
    });
    // 监听是否缓冲到可播放时
    musicP.on("canplay", () => {
      duration.value = musicP.Ctx.duration;
      ifCanply.value = true;
    });
    // 正在请求数据
    musicP.on("progress", () => {
      // console.log(musicP.Ctx.duration);b
    });
    musicP.on("timeupdate", () => {
      currentTime.value = musicP.Ctx.currentTime;
    });
    musicP.on("emptied ", () => {
      // 为空时显示歌单的第一首，如果歌单第一首没有的话就显示空白
    });
    musicP.on("ended ", () => {
      // 切换下一首或循环
    });
    // 当播放时长改变时，代表切换了src
    musicP.on("durationchange", () => {
      currentPlayStatus.value = "pause";
      currentTime.value = 0;
      ifCanply.value = false;
    });

    // 进度条ref
    const bgRef = ref(null);

    // 进度条值
    const bgValue = ref(0);
    // 进度条的背景
    const bgBxRef = ref(null);
    // 修改进度条
    const changeBg = (e) => {
      const value =
        1 - (bgBxRef.value.offsetWidth - e.offsetX) / bgBxRef.value.offsetWidth;
      if (value >= 0 && value <= 1) {
        bgValue.value = value;
        musicP.setCurrentTime(value * duration.value);
      }
    };
    onMounted(() => {
      const btn = bgRef.value.children[0];
      btn.addEventListener("mousedown", (de) => {
        const oX = de.target.offsetLeft;
        const startX = de.clientX;
        function mouseMoveFn(me) {
          console.log(oX, startX, me.clientX);
          const vl = me.clientX - startX + oX;
          if (vl >= 0 && vl <= bgBxRef.value.offsetWidth) {
            bgValue.value = vl / bgBxRef.value.offsetWidth;
          }
        }
        btn.addEventListener("mousemove", mouseMoveFn);
        btn.addEventListener("mouseup", () => {
          btn.removeEventListener("mousemove", mouseMoveFn);
        });
        btn.addEventListener("mouseover", () => {
          btn.removeEventListener("mousemove", mouseMoveFn);
        });
      });
    });

    // 切换播放音乐
    const changePlayMusic = (music) => {
      store.dispatch("musiclist/ac_changePlayMusic", music);
      currentTime.value = 0;
    };

    return {
      canListHeight,
      listOffset,
      showVolume,
      volume,
      volumeRef,
      musiclistBxRef,
      musiclistScrollRef,
      toMinutes,
      ifFrameFixed,
      showMusicList,
      ifMusicPlayerShow,
      changeMusicListStatus,
      changeFrameFixedStatus,
      changeMusicPlayerStatus,
      musiclist,
      currentPlayMusic,
      currentTime,
      currentPlayStatus,
      cachePg,
      currentPg,
      bgValue,
      bgBxRef,
      controllPly,

      bgRef,
      changeBg,

      changePlayMusic,
    };
  },
});
</script>

<style lang="less" scoped>
a:hover {
  text-decoration: underline;
}

.hed-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
}

.music-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  width: 100%;
  z-index: 1002;
  font-size: 12px;

  .playlist_bg {
    background-image: url(~@/assets/images/playlist_bg.png);
    background-repeat: no-repeat;
  }

  .playlist {
    background-image: url(~@/assets/images/playlist.png);
    background-repeat: no-repeat;
  }

  .play-wamp {
    position: absolute;
    left: 0;
    width: 100%;
    height: 53px;
    margin: 0 auto;
    transition: all 0.2s ease;

    .updn {
      position: relative;
      z-index: 11;

      .left {
        float: left;
        position: absolute;
        top: -14px;
        right: 15px;
        width: 52px;
        height: 67px;
        background-position: 0 -380px;

        .btn-unlock {
          display: block;
          width: 18px;
          height: 18px;
          margin: 6px 0 0 17px;
          background-position: -100px -380px;
        }

        .btn-lock {
          background-position: -80px -380px;
        }
      }

      .right {
        float: right;
        position: absolute;
        top: -1px;
        right: 0;
        width: 15px;
        height: 54px;
        background-position: -52px -393px;
        pointer-events: none;
      }
    }

    .bg {
      height: 53px;
      margin-right: 67px;
      background-position: 0 0;
      background-repeat: repeat-x;
    }

    .hand {
      position: absolute;
      top: -20px;
      width: 100%;
      height: 40px;
      cursor: pointer;
    }

    .wamp-main {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 6px;
      z-index: 15;
      width: 980px;
      height: 47px;
      margin: 0 auto;

      .btns {
        float: left;
        width: 137px;
        padding: 6px 0 0 0;

        a {
          display: block;
          float: left;
          width: 28px;
          height: 28px;
          margin-right: 8px;
          margin-top: 5px;
          text-indent: -9999px;
        }

        .pre {
          background-position: 0 -130px;

          &:hover {
            background-position: -30px -130px;
          }
        }

        .play {
          width: 36px;
          height: 36px;
          margin-top: 0;
          background-position: 0 -204px;

          &:hover {
            background-position: -40px -204px;
          }

          &.pas {
            background-position: 0 -165px;

            &:hover {
              background-position: -40px -165px;
            }
          }
        }

        .next {
          background-position: -80px -130px;

          &:hover {
            background-position: -110px -130px;
          }
        }
      }

      .head {
        float: left;
        position: relative;
        margin: 6px 15px 0 0;

        img {
          width: 34px;
          height: 34px;
        }

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 34px;
          height: 35px;
          background-position: 0 -80px;
        }
      }

      .play {
        float: left;
        width: 581px;
        position: relative;

        .words {
          height: 28px;
          line-height: 28px;
          overflow: hidden;
          color: #e8e8e8;
          text-shadow: 0 1px 0 #171717;

          .name {
            float: left;
            max-width: 300px;
            color: #e8e8e8;
          }

          .ar {
            float: left;
            max-width: 220px;
            margin-left: 15px;
            color: #9b9b9b;

            a {
              color: #9b9b9b;
            }
          }

          .src {
            float: left;
            width: 14px;
            height: 15px;
            margin: 7px 0 0 13px;
            background-position: -110px -103px;
          }
        }

        .pgs-br {
          position: relative;
          width: 466px;

          .pgs-mn,
          .pgs-mn .cur,
          .pgs-mn .rdy {
            height: 9px;
            cursor: pointer;
          }

          .pgs-mn {
            width: 466px;
            background-position: right 0;

            .rdy {
              background-position: right -30px;
            }

            .cur {
              position: absolute;
              top: 0;
              left: 0;
              background-position: left -66px;

              .cur-btn {
                position: absolute;
                top: -7px;
                right: -13px;
                width: 22px;
                height: 24px;
                padding: 10px 0;
                margin-left: -11px;
                background-position: 0 -250px;
              }
            }
          }

          .time {
            position: absolute;
            top: -3px;
            right: -100px;
            color: #797979;
            text-shadow: 0 1px 0 #121212;

            span {
              color: #a1a1a1;
            }
          }
        }
      }

      .oper {
        float: left;
        width: 87px;
      }

      .ctrl {
        float: left;
        position: relative;
        z-index: 10;
        width: 113px;
        padding-left: 13px;
        background-position: -147px -238px;
        .m-vol {
          position: absolute;
          top: -113px;
          left: 9px;
          clear: both;
          width: 32px;
          height: 113px;
          .barbg {
            position: absolute;
            top: 0;
            left: 0;
            width: 32px;
            height: 113px;
            background-position: 0 -503px;
          }
          .vbg {
            position: absolute;
            left: 14px;
            width: 4px;
            height: 93px;
            padding: 4px 0;
            top: 7px;
            .curr {
              position: absolute;
              top: auto;
              width: 4px;
              bottom: 4px;
              left: 0;
              background-position: -40px bottom;
              overflow: hidden;
            }
            .btn {
              padding: 0;
              margin: 0;
              position: absolute;
              left: -8px;
              display: block;
              width: 18px;
              height: 20px;
              padding: 10px 10px;
              background-position: -40px -250px;
              background-repeat: no-repeat;
              cursor: pointer;
            }
          }
        }
        .add {
          float: left;
          width: 59px;
          height: 36px;

          a:hover {
            text-decoration: none;
          }

          .tip {
            position: absolute;
            top: -51px;
            left: -65px;
            width: 152px;
            height: 49px;
            background-position: 0 -287px;
            text-align: center;
            color: #fff;
            line-height: 37px;
          }
        }
      }
    }
  }

  .music-list {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 47px;
    width: 986px;
    height: 301px;

    .list-hd,
    .list-bd {
      padding: 0 5px;
    }

    .list-hd {
      background-position: 0 0;
      height: 41px;

      .list-hdc {
        position: relative;
        height: 40px;

        a {
          color: #ccc;
        }

        h4 {
          position: absolute;
          left: 25px;
          top: 0;
          height: 39px;
          line-height: 39px;
          font-size: 14px;
          color: #e2e2e2;
        }

        .addall {
          position: absolute;
          top: 12px;
          height: 15px;
          line-height: 15px;
          left: 398px;
          cursor: pointer;

          &:hover {
            color: #e2e2e2;

            .ico-add {
              background-position: -24px -20px;
            }
          }
        }

        .line {
          position: absolute;
          top: 13px;
          left: 477px;
          height: 15px;
          border-left: 1px solid #000;
          border-right: 1px solid #2c2c2c;
        }

        .clear {
          position: absolute;
          left: 490px;
          top: 12px;
          height: 15px;
          line-break: 15px;
          cursor: pointer;

          &:hover {
            color: #e2e2e2;

            .ico-clear {
              background-position: -51px -20px;
            }
          }
        }

        .lytit {
          position: absolute;
          left: 595px;
          top: 0;
          width: 346px;
          text-align: center;
          height: 39px;
          line-height: 39px;
          color: #fff;
          font-size: 14px;
        }

        .close {
          position: absolute;
          top: 6px;
          right: 8px;
          width: 30px;
          height: 30px;
          overflow: hidden;
          text-indent: -999px;
          cursor: pointer;
          background-position: -195px 9px;
        }
      }
    }

    .list-bd {
      position: absolute;
      left: 0;
      top: 41px;
      width: 976px;
      height: 260px;
      overflow: hidden;
      background-position: -1014px 0;
      background-repeat: repeat-y;

      .imgbg {
        position: absolute;
        left: 2px;
        z-index: 1;
        width: 980px;
        height: auto;
        opacity: 0.1;
      }

      .list-bdc {
        position: absolute;
        left: 2px;
        top: 0;
        z-index: 4;
        height: 260px;
        width: 553px;
        overflow: hidden;

        ul {
          color: #ccc;
          overflow: hidden;
          transition: all 0.3s;
          li {
            &.list-active {
              background-color: rgba(0, 0, 0, 0.3);
              color: white;

              a {
                color: white;
              }
            }

            &:hover {
              .icns {
                display: block !important;
              }
            }

            .col {
              float: left;
              padding-left: 10px;
              height: 28px;
              line-height: 28px;
              overflow: hidden;
              cursor: pointer;

              a {
                color: #9b9b9b;
              }
            }

            .col2,
            .col4 {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .col1 {
              width: 10px;

              .playicn {
                display: block;
                margin-top: 8px;
                width: 10px;
                height: 13px;
                background-position: -182px 0;
              }
            }

            .col2 {
              width: 256px;
            }

            .col3 {
              position: relative;
              width: 78px;

              .icns {
                display: none;
                position: absolute;
                right: 0;
                top: 0;
                width: 100px;
                height: 23px;
              }
            }

            .col4 {
              width: 70px;
            }

            .col5 {
              width: 35px;
              color: #666;
            }

            .col6 {
              width: 37px;
              padding-left: 6px;
            }
          }
        }
      }

      .bline {
        position: absolute;
        left: 555px;
        top: -1px;
        z-index: 2;
        width: 6px;
        height: 260px;
        background: #000;
        opacity: 0.5;

        .scrol {
          position: absolute;
          left: 0;
          width: 4px;
          border-radius: 5px;
          cursor: pointer;
          background: #868686;
          border: 1px solid #a6a6a6;
          opacity: 0.8;
          transition: all 0.2s;
        }
      }

      .mask2 {
        position: absolute;
        left: 560px;
        top: 0;
        z-index: 3;
        width: 420px;
        height: 250px;
        background: #121212;
        opacity: 0.01;
      }

      .listlyric {
        position: absolute;
        right: 40px;
        top: 0;
        z-index: 4;
        margin: 21px 0 20px 0;
        height: 219px;
        width: 354px;
        overflow: hidden;

        .nocnt,
        .nocnt a {
          color: #aaa;
        }

        .nocnt {
          text-align: center;
          line-height: 43px;
        }

        .nolyric {
          padding-top: 85px;

          span {
            color: #999;
          }
        }
      }
    }
  }
}

.icn {
  float: left;
  width: 25px;
  height: 25px;
  margin: 11px 2px 0 0;
  text-indent: -9999px;
  cursor: pointer;
}

.icn-pip {
  position: relative;
  background: url(https://p1.music.126.net/DLVi_1eymwAX8gDunfd2bg==/109951165524394991.png)
    no-repeat 0 0;

  &:hover {
    background-position-y: -25px;
  }
}

.icn-zan {
  margin-top: 12px;
  width: 26px;
  background-position: -60px -502px;

  &:hover {
    background-position: -90px -502px;
  }
}

.icn-share {
  background-position: -114px -163px;

  &:hover {
    background-position: -114px -189px;
  }
}

.icn-vol {
  background-position: -2px -248px;

  &:hover {
    background-position: -31px -248px;
  }
}

.icn-volno {
  background-position: -104px -69px;

  &:hover {
    background-position: -126px -69px;
  }
}

.icn-loop {
  background-position: -3px -344px;

  &:hover {
    background-position: -33px -344px;
  }
}

.icn-list {
  display: block;
  float: none;
  width: 38px;
  padding-left: 21px;
  background-position: -42px -68px;
  line-height: 27px;
  text-align: center;
  color: #666;
  text-shadow: 0 1px 0 #080707;
  text-indent: 0;
  text-decoration: none;

  &:hover {
    background-position: -42px -98px;
  }
}

.ico {
  float: left;
  margin: 1px 6px 0 0;
  height: 16px;
}

.ico-add {
  width: 16px;
  background-position: -24px 0;
}

.ico-clear {
  width: 13px;
  background-position: -51px 0;
}

.icon {
  float: right;
  overflow: hidden;
  margin: 7px 0 0 10px;
  text-indent: -9999px;
  height: 16px;
}

.icon-del {
  width: 13px;
  background-position: -51px 0;

  &:hover {
    background-position: -51px -20px;
  }
}

.icon-dl {
  width: 14px;
  background-position: -57px -50px;

  &:hover {
    background-position: -80px -50px;
  }
}

.icon-share {
  width: 14px;
  background-position: 0 0;

  &:hover {
    background-position: 0 -20px;
  }
}

.icon-src {
  width: 14px;
  margin-left: 0;
  background-position: -80px 0;

  &:hover {
    background-position: -80px -20px;
  }
}
</style>
