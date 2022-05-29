<template>
  <div class="recommend-program clearfix">
    <ms-frame class="ms-frame program">
      <template #title>
        <slot name="title">
          <a class="hover_underline" href="">{{ title }}</a>
        </slot>
      </template>
      <template #title-slot>
        <slot name="title-slot"></slot>
      </template>
      <template #content>
        <ul class="content">
          <template v-if="$route.meta.isShowNav">
            <li
              class="content-item clearfix"
              v-for="(radio, index) in dataList"
              :key="radio.id"
            >
              <slot name="pre" :radio="radio" :index="index"></slot>
              <a class="img-bx cursor_pointer">
                <img v-lazy="radio?.coverUrl" alt="" />
                <i class="mask iconall iconall-mask"></i>
              </a>
              <div class="inf">
                <h3>
                  <router-link
                    class="one-ellipsis"
                    :to="{ path: '/program', query: { id: radio?.id } }"
                    :title="radio?.name"
                    >{{ radio?.name }}</router-link
                  >
                </h3>
                <p class="cnt">
                  <router-link
                    class="one-ellipsis"
                    :to="{ path: '/djradio', query: { id: radio?.radio?.id } }"
                    :title="radio?.radio?.name"
                    >{{ radio?.radio?.name }}</router-link
                  >
                </p>
              </div>
              <slot name="pris" :radio="radio"></slot>
              <router-link
                v-if="showTag"
                class="right-button"
                :to="{
                  path: '/discover/djradio/category',
                  query: { id: radio?.radio?.categoryId },
                }"
                >{{ radio?.radio?.category }}</router-link
              >
            </li>
          </template>
          <template v-else-if="dataList?.length">
            <li
              class="content-item-d clearfix"
              v-for="radio in dataList"
              :key="radio.id"
            >
              <slot name="pre" :radio="radio"></slot>
              <a class="img-bx cursor_pointer">
                <img v-lazy="radio?.coverUrl" alt="" />
                <i class="mask iconall iconall-mask"></i>
              </a>
              <div class="a-name">
                <router-link
                  class="one-ellipsis hover_underline"
                  :to="{ path: '/program', query: { id: radio?.id } }"
                  :title="radio?.name"
                  >{{ radio?.name }}</router-link
                >
              </div>
              <slot name="cnt" :radio="radio"></slot>
              <slot name="pris" :radio="radio"></slot>
              <router-link
                class="right-button"
                :to="{
                  path: '/discover/djradio/category',
                  query: { id: radio?.radio?.categoryId },
                }"
                >{{ radio?.radio?.category }}</router-link
              >
            </li>
          </template>
        </ul>
      </template>
    </ms-frame>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import MsFrame from "@/components/ms-frame";

export default defineComponent({
  name: "RecommendProgram",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    showTag: {
      type: Boolean,
      default: false,
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
.ms-frame.toplist {
  float: right;
}
.content {
  border: 1px solid #e2e2e2;
  box-shadow: 0 0 1px #ccc;
  .content-item-d,
  .content-item {
    position: relative;
    height: 40px;
    line-height: 40px;
    padding: 10px 0;
    &:nth-child(2n) {
      background-color: rgb(247, 247, 247);
    }
    &:hover {
      background-color: rgb(238, 238, 238);
    }
    .img-bx {
      position: relative;
      float: left;
      margin-left: 20px;
      width: 40px;
      height: 40px;
      &:hover {
        .mask {
          display: block;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      .mask {
        display: none;
      }
    }
    a.right-button {
      position: relative;
      left: 7px;
      top: -1px;
      font-size: 12px;
      color: #999;
      border: 1px solid #999;
      line-height: 16px;
      height: 16px;
      padding: 0 6px;
      &:hover {
        color: #666;
        border-collapse: #666;
      }
    }
  }
  .content-item {
    .inf {
      float: left;
      width: 254px;
      line-height: 20px;
      margin: -1px 0 0 10px;
      a {
        font-size: 12px;
        font-weight: 400;
      }
      a:hover {
        text-decoration: underline;
      }
      .cnt {
        a {
          color: #999;
        }
      }
    }
  }
  .content-item-d {
    font-size: 12px;
    line-height: 40px;
    & > div,
    & > a {
      float: left;
    }
    .a-name {
      width: 304px;
      margin-left: 20px;
    }
    a.right-button {
      top: 10px;
    }
  }
}
</style>
