<template>
  <div class="nav-h">
    <div class="main">
      <h1 class="logo">
        <a href="http://music.163.com" hidenfocus="true" target="_blank"></a>
      </h1>
      <ul class="main-nav">
        <li
          v-for="(nav, index) in Navs"
          :key="nav.name"
          @click="changeNav(index)"
        >
          <span :class="currentNav === index ? 'currentNav' : ''">
            <router-link
              v-if="!nav.to.includes('http')"
              :to="nav.to"
              hidefocus="true"
              class="nav-item-a"
            >
              <em>{{ nav.name }}</em>
              <i v-if="currentNav === index" class="cor"></i>
            </router-link>
            <a v-else :href="nav.to" class="nav-item-a" target="_blank">
              <em>{{ nav.name }}</em>
              <i v-if="currentNav === index" class="cor"></i>
            </a>
          </span>
          <i v-if="nav.hot" class="hot"></i>
        </li>
      </ul>
      <div class="main-login">
        <a href="#" class="link">登录</a>
      </div>
      <a href="#" class="createt">创作者中心</a>
      <div class="main-search">
        <div class="searchben">
          <span class="input_parent">
            <input
              type="text"
              v-model="inputValue"
              @focus="inputFocus"
              @blur="inputBlur"
              @keydown.enter="toSearch"
              @input="getSearchSuggestData"
            />
            <span
              ref="inputFocusRef"
              class="label"
              v-show="!ifInputFocus && inputValue.length == 0 ? true : false"
              >音乐/视频/电台/用户</span
            >
          </span>
        </div>
        <suggest-result
          class="suggest-result"
          v-show="inputValue.length > 0 && ifInputFocus"
          :keywords="inputValue"
          :searchSuggest="searchSuggest"
        ></suggest-result>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";

import SuggestResult from "@/views/search/childrencp/suggest-result.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { debounce } from "@/utils";

export default defineComponent({
  name: "NavH",
  props: {
    Navs: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SuggestResult,
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const currentNav = ref(0);

    const changeNav = (index) => {
      if (index in [0, 1, 2]) {
        currentNav.value = index;
        context.emit("changeCurrentNav", index);
      }
    };
    const ifInputFocus = ref(false);
    const inputValue = ref("");

    function getSearchSuggestData() {
      store.dispatch("search/ac_getSearchSuggest", {
        keywords: inputValue.value,
      });
    }
    const searchSuggest = computed(() => store.state.search.searchSuggest);

    const inputFocus = () => {
      ifInputFocus.value = true;
      getSearchSuggestData();
    };
    const inputBlur = debounce(() => {
      ifInputFocus.value = false;
    }, 200);

    const toSearch = () => {
      if (inputValue.value.length > 0) {
        router.push({
          path: "/search",
          query: {
            keywords: inputValue.value,
            type: 1,
          },
        });
      }
    };

    return {
      currentNav,
      ifInputFocus,
      inputValue,
      changeNav,
      inputFocus,
      inputBlur,
      getSearchSuggestData,
      searchSuggest,
      toSearch,
    };
  },
});
</script>

<style lang="less" scoped>
.nav-h {
  height: 70px;
  width: 100%;
  background: var(--default-main-topbar-bgc);
  overflow: hidden;

  .main {
    width: var(--default-main-width);
    margin: 0 auto;
    height: 100%;
    overflow: hidden;

    .logo {
      float: left;
      background: url(~@/assets/images/topbar.png) no-repeat 0 0;
      width: 176px;
      height: 69px;

      a {
        display: block;
        width: 157px;
        height: 69px;
        padding-right: 20px;
      }
    }

    .main-nav {
      float: left;
      height: 70px;
      font-size: 14px;

      li {
        float: left;
        height: 70px;
        line-height: 70px;
        position: relative;

        span {
          display: inline-block;
          height: 100%;

          .nav-item-a {
            position: relative;
            display: inline-block;
            color: #ccc;
            padding: 0 19px;

            em {
              display: inline-block;
            }

            .cor {
              position: absolute;
              bottom: 0;
              left: 50%;
              width: 12px;
              height: 7px;
              transform: translateX(-50%);
              background: url(~@/assets/images/topbar.png) no-repeat -226px 0;
            }
          }
        }

        span.currentNav {
          background: #000;

          .nav-item-a {
            color: white;
          }
        }

        .hot {
          position: absolute;
          display: block;
          width: 28px;
          height: 19px;
          top: 21px;
          left: 100px;
          background: url(~@/assets/images/topbar.png) no-repeat -190px 0;
        }
      }

      li:hover {
        .nav-item-a {
          color: white;
        }
      }
    }

    .main-login {
      float: right;
      height: 45px;
      margin: 19px 0 0 20px;
      padding: 0 22px 0 0;
      font-size: 12px;

      .link {
        display: block;
        width: 28px;
        margin-top: 7px;
        color: #787878;
        text-decoration: none;
      }
    }

    .main-login:hover {
      .link {
        color: #999;
        text-decoration: underline;
      }
    }

    .createt {
      float: right;
      width: 90px;
      text-align: center;
      height: 32px;
      line-height: 32px;
      color: #ccc;
      font-size: 12px;
      margin-top: 18px;
      border: 1px solid #666;
      border-radius: 30px;
    }

    .main-search {
      float: right;
      width: 160px;
      height: 100%;
      margin-right: 14px;

      .searchben {
        width: 158px;
        height: 32px;
        background: url(~@/assets/images/topbar.png) no-repeat 0 -99px;
        margin-top: 19px;
        background-color: #fff;
        border-radius: 32px;
        overflow: hidden;

        .input_parent {
          display: block;
          position: relative;
          margin: 8px 0 0 28px;
          height: 14px;

          * {
            line-height: 14px;
            position: absolute;
            top: 0;
            left: 0;
          }

          input {
            font-size: 13px;
            width: 95%;
            height: 100%;
            border: none;
            outline: none;
          }

          span.label {
            margin-top: 1px;
            font-size: 12px;
            color: #817f7f;
            pointer-events: none;
          }
        }
      }
    }
  }
}
.suggest-result {
  margin-top: 15px;
  width: 240px;
}
</style>
