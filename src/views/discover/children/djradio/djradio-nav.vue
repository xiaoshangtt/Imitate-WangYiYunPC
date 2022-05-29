<template>
  <div class="dj-radio-nav">
    <ul
      v-if="dataList?.length"
      class="box clearfix"
      :style="{ display: currentP == 1 ? 'block' : 'none' }"
    >
      <li
        @click="changeProgram(djcls.id)"
        v-for="djcls in dataList.slice(0, 18)"
        :key="djcls.id"
      >
        <router-link
          :to="{ path: '/discover/djradio/category', query: { id: djcls.id } }"
          class="radio-bg"
          :class="currentProgramId == djcls.id ? 'radio-bg-active' : ''"
        >
          <div
            class="icon"
            :style="{ background: `url(${djcls.picWebUrl})` }"
          ></div>
          <em>{{ djcls?.name }}</em>
        </router-link>
      </li>
    </ul>
    <ul
      class="box clearfix"
      :style="{ display: currentP == 2 ? 'block' : 'none' }"
    >
      <li>
        <a href="https://music.163.com/#/topic?id=18652232" target="_blank">
          <div class="icon radio_faq"></div>
          <em>常见问题</em>
        </a>
      </li>
      <li>
        <a class="cursor_pointer">
          <div class="icon radio_apply"></div>
          <em>我要做主播</em>
        </a>
      </li>
    </ul>
    <span
      class="pre"
      :class="`pre-${currentP == 1 ? 'shallow' : 'middle'}`"
      @click="changePage(1)"
    ></span>
    <span
      class="next"
      :class="`next-${currentP == 2 ? 'shallow' : 'middle'}`"
      @click="changePage(2)"
    ></span>
    <div class="dots">
      <span class="dot" :class="currentP == 1 ? 'dot-active' : ''"></span>
      <span class="dot" :class="currentP == 2 ? 'dot-active' : ''"></span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import { emitter } from "@/utils";

export default defineComponent({
  name: "DjRadioNav",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    currentProgramId: {
      type: [Number, String],
      default: 0,
    },
  },
  emits: ["changeProgram"],
  setup(props, context) {
    const currentP = ref(1);

    const changePage = (i) => {
      currentP.value = i;
    };

    const changeProgram = (id) => {
      emitter.emit("changeProgram", id);
    };

    return {
      currentP,
      changePage,
      changeProgram,
    };
  },
});
</script>

<style lang="less" scoped>
.dj-radio-nav {
  position: relative;
  margin-bottom: 20px;
  height: 194px;
  .box {
    margin-left: -33px;
    li {
      float: left;
      padding: 0 0 25px 33px;
      a {
        display: block;
        width: 70px;
        height: 70px;
        text-align: center;
        color: #888;
        .icon {
          margin: 0 auto;
          width: 48px;
          height: 48px;
        }
        em {
          font-size: 13px;
        }
      }
      .radio_apply {
        background-image: url(~@/assets/images/radio_apply.png);
      }
      .radio_faq {
        background-image: url(~@/assets/images/radio_faq.png);
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    text-align: center;
    .dot {
      margin: 0 4px;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      cursor: pointer;
      background: #ddd;
    }
    .dot-active {
      background: #ba2300;
    }
  }
  .pre,
  .next {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 70px;
    transform: translateY(-50%);
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 9;
    cursor: pointer;
  }
  .pre {
    left: -30px;
  }
  .next {
    right: -30px;
  }
  .pre-middle {
    background-image: url(~@/assets/images/左-middle.png);
  }
  .pre-shallow {
    background-image: url(~@/assets/images/左-shallow.png);
  }
  .pre-middle:hover {
    background-image: url(~@/assets/images/左-deep.png);
  }
  .next-middle {
    background-image: url(~@/assets/images/右-middle.png);
  }
  .next-shallow {
    background-image: url(~@/assets/images/右-shallow.png);
  }
  .next-middle:hover {
    background-image: url(~@/assets/images/右-deep.png);
  }
}
</style>
