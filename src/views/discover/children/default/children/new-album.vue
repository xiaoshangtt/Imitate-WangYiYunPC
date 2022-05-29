<template>
  <div class="nwe-album">
    <ms-frame>
      <template #title>
        <div class="title index">
          <span>新碟上市</span>
        </div>
      </template>
      <template #title-slot>
        <div class="title-slot">
          <router-link to="/discover/album" class="more-btn index">
            <span>更多</span>
            <i class="toright index"></i>
          </router-link>
        </div>
      </template>
      <template #content>
        <div class="content">
          <div class="content-wamp">
            <i
              class="pre index"
              @click="changeCurrentIndex(currentIndex - 1)"
            ></i>
            <div class="wamp-cnt">
              <div
                class="wamp-cnt-bx"
                :class="!isTransitionEnd ? 'use-transition' : ''"
                :style="{
                  transform: `translate(${currentIndex * 645 * -1}px)`,
                }"
                @transitionend="transitionendFn"
              >
                <ul>
                  <li
                    class="index"
                    v-for="album in dataList.slice(5, 10)"
                    :key="album.id"
                  >
                    <div class="img-bx">
                      <img v-lazy="album?.picUrl" alt="" />
                      <router-link
                        class="bg coverall"
                        :to="`/album?id=${album?.id}`"
                      ></router-link>
                      <a class="ply-icon iconall" href=""></a>
                    </div>
                    <p class="album-name">
                      <router-link
                        :to="`/album?id=${album?.id}`"
                        :title="album?.id"
                        >{{ album?.name }}</router-link
                      >
                    </p>
                    <p class="album-ar">
                      <router-link :to="`/artist?id=${album?.artist?.id}`">{{
                        album?.artist?.name
                      }}</router-link>
                    </p>
                  </li>
                </ul>
                <ul>
                  <li
                    class="index"
                    v-for="album in dataList.slice(0, 5)"
                    :key="album.id"
                  >
                    <div class="img-bx">
                      <img v-lazy="album?.picUrl" alt="" />
                      <router-link
                        class="bg coverall"
                        :to="`/album?id=${album?.id}`"
                      ></router-link>
                      <a class="ply-icon iconall" href=""></a>
                    </div>
                    <p class="album-name">
                      <router-link
                        :to="`/album?id=${album?.id}`"
                        :title="album?.id"
                        >{{ album?.name }}</router-link
                      >
                    </p>
                    <p class="album-ar">
                      <router-link :to="`/artist?id=${album?.artist?.id}`">{{
                        album?.artist?.name
                      }}</router-link>
                    </p>
                  </li>
                </ul>
                <ul>
                  <li
                    class="index"
                    v-for="album in dataList.slice(5, 10)"
                    :key="album.id"
                  >
                    <div class="img-bx">
                      <img v-lazy="album?.picUrl" alt="" />
                      <router-link
                        class="bg coverall"
                        :to="`/album?id=${album?.id}`"
                      ></router-link>
                      <a class="ply-icon iconall" href=""></a>
                    </div>
                    <p class="album-name">
                      <router-link
                        :to="`/album?id=${album?.id}`"
                        :title="album?.id"
                        >{{ album?.name }}</router-link
                      >
                    </p>
                    <p class="album-ar">
                      <router-link :to="`/artist?id=${album?.artist?.id}`">{{
                        album?.artist?.name
                      }}</router-link>
                    </p>
                  </li>
                </ul>
                <ul>
                  <li
                    class="index"
                    v-for="album in dataList.slice(0, 5)"
                    :key="album.id"
                  >
                    <div class="img-bx">
                      <img :src="album?.picUrl" alt="" />
                      <router-link
                        class="bg coverall"
                        :to="`/album?id=${album?.id}`"
                      ></router-link>
                      <a class="ply-icon iconall" href=""></a>
                    </div>
                    <p class="album-name">
                      <router-link
                        :to="`/album?id=${album?.id}`"
                        :title="album?.id"
                        >{{ album?.name }}</router-link
                      >
                    </p>
                    <p class="album-ar">
                      <router-link :to="`/artist?id=${album?.artist?.id}`">{{
                        album?.artist?.name
                      }}</router-link>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <i
              class="next index"
              @click="changeCurrentIndex(currentIndex + 1)"
            ></i>
          </div>
        </div>
      </template>
    </ms-frame>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import MsFrame from "@/components/ms-frame";

export default defineComponent({
  name: "NewAlbum",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    MsFrame,
  },
  setup() {
    const currentIndex = ref(1);
    const isTransitionEnd = ref(false);

    const changeCurrentIndex = (i) => {
      currentIndex.value = i;
      isTransitionEnd.value = false;
    };

    const transitionendFn = () => {
      isTransitionEnd.value = true;
      if (currentIndex.value == 0) {
        currentIndex.value = 2;
      } else if (currentIndex.value == 3) {
        currentIndex.value = 1;
      }
    };

    return {
      currentIndex,
      isTransitionEnd,
      changeCurrentIndex,
      transitionendFn,
    };
  },
});
</script>

<style lang="less" scoped>
@import url("./common.less");

.content {
  margin: 20px 0 37px;
  height: 186px;
  border: 1px solid #d3d3d3;

  .content-wamp {
    position: relative;
    height: 184px;
    border: 1px solid #fff;
    background: #f5f5f5;
    padding-left: 16px;

    .pre,
    .next {
      position: absolute;
      top: 71px;
      width: 17px;
      height: 17px;
    }

    .pre {
      left: 4px;
      background-position: -260px -75px;
    }

    .next {
      background-position: -300px -75px;
    }

    .wamp-cnt {
      position: relative;
      float: left;
      width: 645px;
      height: 180px;
      overflow: hidden;

      .use-transition {
        transition: all 0.4s !important;
      }

      .wamp-cnt-bx {
        transition: none;
        width: calc(4 * 645px);
        height: 100%;

        ul {
          float: left;
          position: relative;
          top: 0;
          width: 645px;
          margin: 28px 0 0 0;

          li {
            float: left;
            width: 118px;
            height: 150px;
            margin-left: 11px;
            background-position: -260px 100px;

            &:hover {
              .ply-icon {
                display: block;
              }
            }

            .img-bx {
              position: relative;
              width: 100px;
              height: 100px;
              margin-bottom: 8px;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }

              .bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 118px;
                height: 100px;
                background-position: 0 -570px;
              }

              .ply-icon {
                display: none;
                position: absolute;
                left: 72px;
                bottom: 5px;
                width: 22px;
                height: 22px;
                background-position: 0 -85px;
                z-index: 10;
              }

              .ply-icon:hover {
                background-position: 0 -110px;
              }
            }

            p {
              font-size: 12px;
              line-height: 18px;

              a {
                display: block;
                max-width: 90%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              a:hover {
                text-decoration: underline;
              }
            }

            p.album-ar a {
              color: #666;
            }
          }
        }
      }
    }
  }
}
</style>
