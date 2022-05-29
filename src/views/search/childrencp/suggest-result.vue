<template>
  <div class="simi-result">
    <div>
      <p class="note">
        <router-link
          :to="{ path: '/search', query: { keywords: keywords, type: 1002 } }"
          v-html="changeStr(`搜${keywords || ''}” 相关用户`, keywords)"
        ></router-link>
        &gt;
      </p>
      <div class="cnt">
        <template v-for="suggestItm of searchSuggest?.order" :key="suggestItm">
          <div class="cnt-item">
            <h3 class="hd">
              <i class="q-icon-sh" :class="`q-icon-sh-${suggestItm}`"></i>
              <span>{{ computedFieldType(suggestItm) }}</span>
            </h3>
            <div class="re-ls clearfix">
              <li
                v-for="item in searchSuggest[suggestItm] || []"
                :key="item?.id"
              >
                <router-link
                  :to="{
                    path: `/${suggestItm.slice(0, suggestItm.length - 1)}`,
                    query: { id: item?.id },
                  }"
                  v-html="
                    changeStr(
                      `${item?.name}${
                        item?.artist?.name ? ' - ' + item?.artist?.name : ''
                      }`,
                      keywords
                    )
                  "
                >
                </router-link>
              </li>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { changeStr } from "../xuts";

export default defineComponent({
  name: "SuggestResult",
  props: {
    searchSuggest: {
      type: Object,
      default: () => ({}),
    },
    keywords: {
      type: String,
      default: "",
    },
  },
  setup() {
    const computedFieldType = (str) => {
      switch (str) {
        case "songs":
          return "单曲";
        case "artists":
          return "歌手";
        case "albums":
          return "专辑";
        case "playlists":
          return "歌单";
      }
    };
    return {
      changeStr,
      computedFieldType,
    };
  },
});
</script>

<style lang="less" scoped>
/deep/ .suggest {
  color: #0c73c2;
}
.simi-result {
  font-size: 12px;
  position: absolute;
  top: 43px;
  z-index: 120;
  box-sizing: border-box;
  border: 1px solid #bebebe;
  box-shadow: 0 4px 7px #555;
  text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
  border-radius: 4px;
  background: #fff;
  width: 418px;
  .note {
    height: 17px;
    padding: 11px 10px;
    border-bottom: 1px solid #e2e2e2;
    a:hover {
      background-color: #e3e5e7;
    }
    a {
      color: #666;
    }
  }
  .cnt {
    .cnt-item {
      &:nth-child(2n) {
        .re-ls {
          background-color: #f9f8f8;
        }
      }
      .hd {
        float: left;
        width: 52px;
        margin-right: -100px;
        padding: 10px 0 0 10px;
        border-right: 1px solid #e2e2e2;
        line-height: 17px;
        font-weight: normal;
        font-size: 12px;
        .q-icon-sh {
          margin-right: 5px;
        }
      }
      .re-ls {
        margin-left: 62px;
        margin-top: -1px;
        padding: 6px 0 5px;
        border-top: 1px solid #e2e2e2;
        border-left: 1px solid #e2e2e2;
        li {
          width: 100%;
          float: left;
          &:hover {
            background-color: #e3e5e7;
          }
          a {
            display: block;
            width: 100%;
            text-indent: 12px;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>
