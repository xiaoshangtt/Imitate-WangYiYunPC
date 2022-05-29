<template>
  <div class="dj-toplist">
    <ms-frame :title="title">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #title-slot>
        <slot name="title-slot"></slot>
      </template>
      <template #content>
        <div class="content">
          <ul class="bx clearfix">
            <li v-for="dj in dataList" :key="dj.id">
              <router-link
                class="hover_underline us-img"
                :to="{ path: '/djradio', query: { id: dj?.id } }"
              >
                <img v-lazy="dj?.intervenePicUrl" alt="" />
              </router-link>
              <div class="cnt">
                <h3 class="cnt-tit one-ellipsis">
                  <router-link
                    class="hover_underline"
                    :to="{ path: '/djradio', query: { id: dj?.id } }"
                    >{{ dj?.name }}</router-link
                  >
                </h3>
                <p class="name">
                  <router-link
                    class="hover_underline"
                    :to="{ path: '/user/home', query: { id: dj?.dj?.userId } }"
                  >
                    <i class="user-icon q-icon q-icon-user"></i>
                    <span>{{ dj?.dj?.nickname }}</span>
                  </router-link>
                </p>
                <p class="inf">
                  <em>共{{ dj?.programCount || 0 }}期</em>
                  <em>订阅{{ dj?.subCount }}次</em>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </ms-frame>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import MsFrame from "@/components/ms-frame";

export default defineComponent({
  name: "DjToplist",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "默认title",
    },
  },
  components: {
    MsFrame,
  },
});
</script>

<style lang="less" scoped>
.content {
  .bx {
    margin-left: -30px;
    li {
      float: left;
      width: 435px;
      height: 120px;
      padding: 20px 0;
      margin-left: 30px;
      border-bottom: 1px solid rgb(231, 231, 231);
      a.us-img {
        float: left;
        width: 120px;
        height: 120px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cnt {
        margin-left: 140px;
        h3 {
          line-height: 64px;
          height: 64px;
        }
        p {
          font-size: 12px;
          color: rgb(51, 51, 51);
        }
        p.name {
          line-height: 20px;
          margin-bottom: 8px;
        }
        p.inf {
          color: rgb(153, 153, 153);
          em {
            margin-right: 18px;
          }
        }
      }
    }
  }
}
</style>
