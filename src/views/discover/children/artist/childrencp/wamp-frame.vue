<template>
  <div class="wamp-frame">
    <ms-frame :title="title">
      <template #title-slot v-if="isShowMore">
        <div class="title-slot">
          <router-link :to="{ path: moreUrl }">更多&gt;</router-link>
        </div>
      </template>
      <template #content>
        <div class="find-first-letter clearfix" v-if="isShowLetterFind">
          <div
            class="hot"
            :class="currentSelectInitial == '-1' ? 'select-active' : ''"
          >
            <router-link :to="{ query: { ...$route.query, initial: -1 } }"
              >热门</router-link
            >
          </div>
          <ul class="letter-list clearfix">
            <li
              v-for="i of letterList"
              :key="i"
              :class="
                currentSelectInitial == String.fromCharCode(i).toLowerCase()
                  ? 'select-active'
                  : ''
              "
            >
              <router-link
                :to="{
                  query: {
                    ...$route.query,
                    initial: String.fromCharCode(i).toLowerCase(),
                  },
                }"
                >{{ String.fromCharCode(i) }}</router-link
              >
            </li>
          </ul>
          <div
            class="other"
            :class="currentSelectInitial == '0' ? 'select-active' : ''"
          >
            <router-link :to="{ query: { ...$route.query, initial: 0 } }"
              >其他</router-link
            >
          </div>
        </div>
        <div class="artist-list clearfix">
          <li
            v-for="(artist, index) in lineDataList"
            :key="artist.id"
            class="artist-list-item line"
            :class="isShowBottom && index > 5 ? 'line-bottom' : ''"
          >
            <div class="img-bx">
              <router-link
                :to="{ path: '/artist', query: { id: artist?.id } }"
                :title="`${artist?.name}的音乐`"
              >
                <img v-lazy="artist?.img1v1Url" />
              </router-link>
            </div>
            <p class="artist-name">
              <router-link
                :to="{ path: '/artist', query: { id: artist?.id } }"
                class="name"
                :title="`${artist?.name}的音乐`"
                >{{ artist?.name }}</router-link
              >
              <router-link
                v-if="artist?.accountId"
                :to="{ path: '/user/home', query: { id: artist?.accountId } }"
                class="icon-bx hover_underline"
                title="查看歌手资料"
              >
                <i class="q-icon q-icon-artist-icon"></i>
              </router-link>
            </p>
          </li>
          <li
            class="artist-list-item sml"
            v-for="artist in smlDataList"
            :key="artist"
          >
            <router-link
              :to="{ path: '/artist', query: { id: artist?.id } }"
              class="name"
              :title="`${artist?.name}的音乐`"
              >{{ artist?.name }}</router-link
            >
            <router-link
              :to="{ path: '/user/home', query: { id: artist?.accountId } }"
              class="icon-bx hover_underline"
              title="查看歌手资料"
            >
              <i class="q-icon q-icon-artist-icon"></i>
            </router-link>
          </li>
        </div>
      </template>
    </ms-frame>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";

import MsFrame from "@/components/ms-frame";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "WampFrame",
  props: {
    title: {
      type: String,
      defualt: "默认title",
    },
    lineDataList: {
      type: Array,
      default: () => [],
    },
    smlDataList: {
      type: Array,
      default: () => [],
    },
    isShowLetterFind: {
      type: Boolean,
      default: false,
    },
    isShowBottom: {
      type: Boolean,
      default: false,
    },
    isShowMore: {
      type: Boolean,
      default: false,
    },
    moreUrl: {
      type: String,
      default: "",
    },
  },
  components: {
    MsFrame,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const letterList = ref([]);

    for (let i = 65; i <= 90; i++) {
      letterList.value.push(i);
    }

    const currentSelectInitial = computed(() => {
      return route?.query?.initial || -1;
    });

    return {
      letterList,
      currentSelectInitial,
    };
  },
});
</script>

<style lang="less" scoped>
.title-slot {
  float: right;
  font-size: 12px;
  line-height: 40px;
  cursor: pointer;
  a {
    color: rgb(102, 102, 102);
  }
}
.find-first-letter {
  margin-top: 20px;
  font-size: 14px;
  .hot,
  .other {
    float: left;
    line-height: 24px;
    font-size: 12px;
    a {
      display: block;
      width: 45px;
      height: 24px;
      text-align: center;
    }
  }
  a:hover {
    text-decoration: underline;
  }
  .select-active {
    a {
      background: #c20c02;
      color: white;
    }
  }
  .letter-list {
    float: left;
    li {
      float: left;
      margin-left: 3px;
      a {
        display: block;
        width: 21px;
        line-height: 24px;
        text-align: center;
      }
    }
  }
}
.artist-list {
  padding: 20px 0 0 0;
  margin-left: -17px;
  .artist-list-item {
    float: left;
    width: 130px;
    font-size: 12px;
    .artist-name {
      margin-top: 8px;
      a:hover {
        text-decoration: underline;
      }
    }
    .icon-bx {
      vertical-align: middle;
      display: inline-block;
    }
    .name {
      display: inline-block;
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .artist-list-item.line {
    height: 154px;
    padding: 0 0 30px 17px;
    .img-bx {
      width: 130px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .artist-name {
      .icon-bx {
        float: right;
      }
    }
  }
  .artist-list-item.sml {
    width: 130px;
    height: 30px;
    padding-left: 17px;
    line-height: 23px;
    .icon-bx {
      vertical-align: top;
    }
  }
  .artist-list-item.line-bottom {
    border-bottom: 1px dotted #999;
    margin-bottom: 20px;
  }
}
</style>
