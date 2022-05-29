<template>
  <div class="new-dj">
    <ms-frame :title="title">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #title-slot>
        <slot name="title-slot"></slot>
      </template>
      <template #content>
        <ul class="clearfix">
          <li v-for="djcls in dataList.slice(0, 5)" :key="djcls.id">
            <router-link
              :to="{ path: '/djradio', query: { id: djcls?.id } }"
              class="dj-img"
            >
              <img v-lazy="djcls?.intervenePicUrl" alt="" />
            </router-link>
            <h3 class="dj-name hover_underline">
              <router-link
                :to="{ path: '/djradio', query: { id: djcls?.id } }"
                >{{ djcls?.name }}</router-link
              >
            </h3>
            <p class="dj-intro">{{ djcls?.rcmdtext }}</p>
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
  name: "NewDj",
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
.new-dj {
  ul {
    margin: 16px 0px 0px -37px;
    li {
      float: left;
      width: 150px;
      margin-left: 37px;
      .dj-img {
        width: 150px;
        height: 150px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .dj-name {
        margin: 7px 0;
      }
      h3 {
        line-height: 16px;
        font-size: 14px;
        font-weight: normal;
        a {
          color: rgb(51, 51, 51);
        }
      }
      p {
        line-height: 18px;
        color: rgb(153, 153, 153);
        font-size: 12px;
      }
    }
  }
}
</style>
