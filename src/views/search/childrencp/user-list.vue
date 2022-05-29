<template>
  <div class="user-list">
    <table class="user-wamp">
      <tr v-for="user in dataList" :key="user.userId">
        <td class="t1">
          <div class="cover-img">
            <router-link
              :to="{ path: '/user/home', query: { id: user?.userId } }"
            >
              <img :src="user?.avatarUrl" />
              <span class="mask coverall"></span>
            </router-link>
          </div>
        </td>
        <td class="t2">
          <div class="ttc one-ellipsis">
            <router-link
              :to="{ path: '/user/home', query: { id: user?.userId } }"
              v-html="changeStr(user?.nickname, $route.query?.keywords || '')"
            ></router-link>
          </div>
          <div
            class="desc one-ellipsis"
            v-if="user?.signature"
            v-html="changeStr(user?.signature, $route.query?.keywords || '')"
          ></div>
        </td>
        <td class="t3">
          <a href="javascript:void(0)" class="button">
            <i>关注</i>
          </a>
        </td>
        <td class="t4">歌单：{{ toWan(user?.playlistCount) }}</td>
        <td class="t5">
          粉丝：<span>{{ user?.followeds }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { toWan } from "@/utils";
import { changeStr } from "../xuts";

export default defineComponent({
  name: "UserList",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      changeStr,
      toWan,
    };
  },
});
</script>

<style lang="less" scoped>
.user-list {
  .user-wamp {
    width: 100%;
    table-layout: fixed;
    tr {
      td {
        padding: 6px 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        color: #999;
      }
      .t1 {
        width: 50px;
        .cover-img {
          position: relative;
          width: 50px;
          height: 50px;
          img {
            width: 100%;
            height: 100%;
          }
          .mask {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-position: -160px 0;
          }
        }
      }
      .t2 {
        .ttc {
          height: 18px;
          margin-right: 20px;
          a {
            position: relative;
            padding-right: 25px;
            margin-right: -25px;
            max-width: 99%;
            height: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
          }
        }
        .desc {
          width: 100%;
          margin-top: 5px;
        }
      }
      .t3 {
        width: 96px;
        a {
          display: inline-block;
          width: 64px;
          height: 27px;
          line-height: 27px;
          background-position: 0 -990px;
          &:hover {
            background-position: 0 -1020px;
          }
          i {
            display: inline-block;
            height: 25px;
            line-height: 25px;
            padding-left: 26px;
            color: #5d5d5d;
          }
        }
      }
      .t4 {
        width: 96px;
      }
      .t5 {
        width: 96px;
      }
    }
  }
}
</style>
