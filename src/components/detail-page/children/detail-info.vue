<template>
  <div class="m-info clearfix">
    <div class="cover">
      <slot name="cover-img" :info="info"></slot>
    </div>
    <div class="cover-info">
      <div class="cover-info-b" :style="{ margin: infoMargin }">
        <div class="hd">
          <i
            class="icon"
            :class="`q-${computedIcon.split('-')[0]} ${computedIcon}`"
          ></i>
          <div
            class="pl-tit"
            :style="{
              'margin-left':
                computedIcon.split('-')[0] == 'icon' ? '64px' : '80px',
            }"
          >
            <h2>{{ info.name }}</h2>
          </div>
        </div>
        <slot name="bt-tp" :info="info"></slot>
        <slot name="btns"></slot>

        <slot name="bt-bm" :info="info"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

import { formatDate } from "@/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DetailInfo",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    infoMargin: {
      type: String,
      default: "0 0 0 220px",
    },
  },
  setup() {
    const route = useRoute();
    const computedIcon = computed(() => {
      switch (route.path) {
        case "/playlist":
          return "icon-playlist";
        case "/album":
          return "icon-album";
        case "/song":
          return "icon-song";
        case "/djradio":
          return "icon-djradio";
        case "/program":
          return "icon2-program";
        default:
          return "icon-playlist";
      }
    });

    return {
      formatDate,
      computedIcon,
    };
  },
});
</script>

<style lang="less" scoped>
.m-info {
  width: 100%;
  min-height: 250px;
  .cover {
    display: inline;
    position: relative;
    float: left;
    width: 200px;
    height: 200px;
    margin: 0 -220px 0 0;
    img {
      width: 100%;
      height: 100%;
    }
    .cover-mask {
      position: absolute;
      top: -4px;
      left: -4px;
      width: 208px;
      height: 208px;
      background-position: 0 -1285px;
    }
  }
  .cover-info {
    width: 100%;
    float: float;
    .cover-info-b {
      margin-left: 220px;
      .hd {
        margin-bottom: 12px;
        .icon {
          float: left;
        }
        .pl-tit {
          font-size: 14px;
          position: relative;
          h2 {
            font-weight: 400;
          }
        }
      }
    }
  }
}
.icon-playlist,
.icon-album,
.icon-song,
.icon-djradio {
  float: left;
  vertical-align: middle;
  margin-top: 5px;
  margin-left: -1px;
  width: 54px;
  height: 24px;
}
.icon-playlist {
  background-position: 0 -243px;
}
.icon-album {
  background-position: 0 -186px;
}
.icon-song {
  background-position: 0 -463px;
}
.icon-djradio {
  background-position: 0 -1014px;
}
.icon2-program {
  width: 73px;
  height: 24px;
  margin-top: 5px;
  margin-left: -1px;
  vertical-align: middle;
  background-position: 0 -75px;
}
</style>
