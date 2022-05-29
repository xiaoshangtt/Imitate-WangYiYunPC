<template>
  <div class="toplist">
    <ms-frame title="榜单">
      <template #title>
        <div class="title index">
          <span>新碟上市</span>
        </div>
      </template>
      <template #title-slot>
        <div class="title-slot">
          <router-link to="/discover/toplist" class="more-btn index">
            <span>更多</span>
            <i class="toright index"></i>
          </router-link>
        </div>
      </template>
      <template #content>
        <div class="content index_bill clearfix">
          <dl class="cnt-itm" v-for="item in threeToplist" :key="item.id">
            <dt class="hd clearfix">
              <div class="img-bx">
                <img v-lazy="item?.coverImgUrl" />
                <router-link
                  :to="{ path: 'discover/playlist', query: { id: item?.id } }"
                  class="msk coverall"
                ></router-link>
              </div>
              <div class="tit">
                <router-link
                  :to="{ path: '/discover/toplist', query: { id: item?.id } }"
                >
                  <h3>{{ item?.name }}</h3>
                </router-link>
                <div class="btn">
                  <a
                    href="javascript:void(0)"
                    @click="
                      $store.dispatch(
                        'musiclist/ac_playlistReplaceMusiclist',
                        item?.id
                      )
                    "
                    class="ply-icon index"
                  ></a>
                  <a
                    href="javascript:void(0)"
                    @click="
                      $store.dispatch(
                        'musiclist/ac_playlistAddMusiclist',
                        item?.id
                      )
                    "
                    class="store-icon index"
                  ></a>
                </div>
              </div>
            </dt>
            <dd class="cnt">
              <ol>
                <li
                  v-for="(song, index) in item?.tracks?.slice(0, 10)"
                  :key="song.id"
                >
                  <span class="idx">{{ index + 1 }}</span>
                  <router-link
                    class="hover_underline"
                    :to="{ path: '/song', query: { id: song?.id } }"
                    >{{ song?.name }}
                  </router-link>
                </li>
              </ol>
              <div class="more">
                <router-link
                  class="hover_underline"
                  :to="{ path: '/discover/toplist', query: { id: item.id } }"
                  >查看全部>
                </router-link>
              </div>
            </dd>
          </dl>
        </div>
      </template>
    </ms-frame>
  </div>
</template>

<script>
import { computed, defineComponent, watch } from "vue";
import { useStore } from "vuex";

import MsFrame from "@/components/ms-frame";

export default defineComponent({
  name: "Toplist",
  components: {
    MsFrame,
  },
  setup() {
    const store = useStore();
    const toplist = computed(() => store.state.discover.toplist.slice(0, 3));
    const toplistDetail = computed(
      () => store.state.discover.toplistDetail || []
    );

    const threeToplist = computed(() => {
      const arr = [];
      toplist.value?.forEach((item) => {
        const index = toplistDetail.value.findIndex((xd) => xd.id == item.id);
        if (index !== -1) {
          arr.push(toplistDetail.value[index]);
        }
      });
      return arr;
    });

    return {
      toplist,
      toplistDetail,
      threeToplist,
    };
  },
});
</script>

<style lang="less" scoped>
@import url("./common.less");

.content {
  height: 472px;
  margin-top: 20px;
  padding-left: 1px;

  dl.cnt-itm {
    float: left;
    width: 230px;

    dt.hd {
      height: 100px;
      padding: 20px 0 0 19px;

      .img-bx {
        position: relative;
        float: left;
        width: 80px;
        height: 80px;

        img {
          width: 100%;
          height: 100%;
        }

        .msk {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-position: -145px -57px;
        }
      }

      .tit {
        float: left;
        width: 116px;
        margin: 6px 0 0 10px;

        & > a {
          color: #333;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 700;

          &:hover {
            text-decoration: underline;
          }
        }

        .btn {
          margin: 0;
          margin-top: 10px;
          padding: 0;

          a {
            display: block;
            float: left;
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }

          .ply-icon {
            background-position: -267px -205px;
          }

          .store-icon {
            background-position: -300px -205px;
          }
        }
      }
    }

    dd.cnt {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12px;

      ol {
        height: 319px;
        margin-left: 50px;
        line-height: 32px;

        li {
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            color: #c10d0c;
          }

          height: 32px;

          span.idx {
            float: left;
            width: 35px;
            height: 32px;
            margin-left: -35px;
            text-align: center;
            font-size: 16px;
          }
        }
      }

      .more {
        height: 32px;
        line-height: 32px;
        margin-right: 32px;
        text-align: right;
        color: #000;
      }
    }
  }
}
</style>
