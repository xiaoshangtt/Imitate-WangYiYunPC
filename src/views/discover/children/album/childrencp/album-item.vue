<template>
  <div class="album-item">
    <ms-frame :title="title">
      <template #title-slot>
        <slot name="title-slot"></slot>
      </template>
      <template #content>
        <ul class="content clearfix">
          <li class="b-item" v-for="album in dataList" :key="album.id">
            <div class="img-bx">
              <img v-lazy="album?.picUrl" />
              <a
                :href="`/album?id=${album?.id}`"
                class="m-bg coverall coverall-m-bg"
              ></a>
              <a
                href="javascript:void(0)"
                @click="
                  $store.dispatch(
                    'musiclist/ac_albumReplaceMusiclist',
                    album?.id
                  )
                "
                :title="album?.name"
                class="ply iconall iconall-ply"
              ></a>
            </div>
            <p class="album-name">
              <a
                :href="`/album?id=${album?.id}`"
                class="one-ellipsis"
                :title="album?.name"
                >{{ album?.name }}</a
              >
            </p>
            <p class="album-author">
              <a
                :href="`/artist?id=${album?.artist?.id}`"
                class="one-ellipsis"
                title="123"
                >{{ album?.artist?.name }}</a
              >
            </p>
          </li>
        </ul>
      </template>
    </ms-frame>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import MsFrame from "@/components/ms-frame";

export default defineComponent({
  name: "AlbumItem",
  props: {
    title: {
      type: String,
      default: "默认title",
    },
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    MsFrame,
  },
});
</script>

<style lang="less" scoped>
.content {
  margin: 20px 0 0 -33px;
  .b-item {
    float: left;
    width: 153px;
    height: 178px;
    padding: 0 0 30px 50px;
    padding-left: 33px;
    .img-bx {
      position: relative;
      width: 130px;
      height: 130px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .m-bg {
        top: 0;
        left: 0;
        width: 153px;
        height: 130px;
      }
      .m-bg,
      .ply {
        position: absolute;
      }
      .ply {
        display: none;
        left: 90px;
        bottom: 10px;
      }
      &:hover {
        .ply {
          display: block;
        }
      }
    }
    p a {
      max-width: 85%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #666;
    }
    p a:hover {
      text-decoration: underline;
    }
    p.album-name {
      margin: 8px 0 3px;
      a {
        font-size: 14px;
        color: #000;
      }
    }
    p.album-author {
      font-size: 12px;
    }
  }
}
</style>
