<template>
  <div class="playlist" :class="categorySongList.length > 0 ? '' : 'opacity0'">
    <list-song
      :showHeader="true"
      title=""
      :dataList="categorySongList"
      :songOptions="{
        showMask: true,
        showBottomText: true,
        'margin-top': '8px',
        'margin-bottom': '8px',
      }"
    >
      <template #title>
        <h3 class="title">
          <span class="title-text">{{ currentCat }}</span>
          <button class="category">
            <span class="select-btn">选择分类</span>
            <img src="~@/assets/images/下拉.png" alt="" />
            <span class="categorySelectsan" v-if="showSelectCategory"></span>
            <span
              class="msk cursor_pointer"
              @click.stop="changeShowSelectCategory"
            ></span>
            <div class="categorySelect" v-if="showSelectCategory">
              <h3>
                <span class="categoryAllBtn cursor_pointer" @click="clearQuery"
                  >全部分类</span
                >
              </h3>
              <table class="category-content">
                <tr
                  v-for="categoryClass in allPlaylistCategoryList"
                  :key="categoryClass.categoryId"
                >
                  <th>
                    <i
                      class="q-icon"
                      :class="`q-icon-${categoryClass.categoryId}`"
                    ></i>
                    <span>{{ categoryClass.name }}</span>
                  </th>
                  <td>
                    <div
                      v-for="(category, cindex) in categoryClass.sub"
                      :key="cindex"
                    >
                      <span
                        class="hover_underline"
                        :class="
                          category.name === currentCat
                            ? 'category-item-active'
                            : ''
                        "
                        @click="toCategory(category.name)"
                        >{{ category.name }}</span
                      ><i>|</i>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </button>
          <div class="hot cursor_pointer" @click="changeOrderHot">热门</div>
        </h3>
      </template>
      <template #song-subtext="{ song }">
        <p class="song-subtext">
          <span class="song-prefix">by</span>
          <span class="nickname">{{ song?.subscribers[0]?.nickname }}</span>
        </p>
      </template>
    </list-song>
    <pagination
      :currentPage="currentPage"
      :total="categorySongListTotal"
      @changeCurrentPage="changeCurrentPage"
    ></pagination>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";

import ListSong from "@/components/list-song";
import Pagination from "@/components/pagination";

export default defineComponent({
  name: "PlayList",
  components: {
    ListSong,
    Pagination,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    function getData(query) {
      store.dispatch("discover/getCategorySongList", query);
    }
    getData(route.query);
    const categorySongList = computed(
      () => store.state.discover.categorySongList
    );
    const categorySongListTotal = computed(
      () => store.state.discover.categorySongListTotal
    );

    store.dispatch("discover/getAllPlaylistCategoryList");
    const allPlaylistCategoryList = computed(
      () => store.state.discover.allPlaylistCategoryList
    );
    let currentCat = computed(() => {
      return route.query.cat || "全部";
    });

    const showSelectCategory = ref(false);
    const changeShowSelectCategory = () => {
      showSelectCategory.value = !showSelectCategory.value;
    };
    document.body.addEventListener("click", function () {
      showSelectCategory.value = false;
    });

    const toCategory = (cat) => {
      currentPage.value = 1;
      router.push({ query: { cat } });
    };
    const changeOrderHot = () => {
      router.push({ query: { cat: currentCat.value, order: "hot" } });
    };

    let currentPage = ref(route?.query?.offset / route?.query?.limit + 1 || 1);
    let limit = ref(35);
    // 当当前的currentCat变化，重新请求，然后重载页面，实现刷新
    watch(
      route,
      (newRoute) => {
        getData({
          limit: limit.value,
          offset: 0,
          ...newRoute.query,
        });
      },
      { deep: true }
    );

    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value = currentPage.value + i;
      } else {
        currentPage.value = i;
      }
      router.push({
        query: {
          cat: route.query.cat,
          limit: limit.value,
          offset: (currentPage.value - 1) * limit.value,
        },
      });
    };

    // watch(currentCat, (newValue) => {
    //   getData({
    //     cat: newValue,
    //     limit: limit,
    //     offset: (currentPage.value - 1) * limit.value,
    //   });
    //   location.reload();
    // });
    // // 当currentPage变化时
    // watch(currentPage, (newValue) => {
    //   getData({
    //     cat: currentCat,
    //     limit: limit,
    //     offset: (newValue - 1) * limit.value,
    //   });
    // });

    const clearQuery = () => {
      router.push({
        path: route.fullPath,
        query: {},
      });
    };

    return {
      categorySongList,
      categorySongListTotal,
      allPlaylistCategoryList,
      currentCat,
      showSelectCategory,
      currentPage,
      changeCurrentPage,
      changeShowSelectCategory,
      clearQuery,
      toCategory,
      changeOrderHot,
    };
  },
});
</script>
<style lang="less" scoped>
.playlist {
  box-sizing: border-box;
  min-height: 600px;
  margin: 0 auto;
  width: var(--default-banner-width);
  // padding: 42px 36px;
  padding: 42px 40px;
}
.title {
  font-weight: 400;
  font-size: 26px;
  padding-bottom: 10px;
  // border-bottom: 2px solid rgb(203, 10, 10);
  & > .category {
    position: relative;
    bottom: 5px;
    z-index: 99;
    margin-left: 30px;
    padding-left: 12px;
    height: 28px;
    line-height: 24px;
    color: rgb(5, 183, 254);
    font-size: 14px;
    background: rgb(255, 251, 251);
    border: 1px solid #ddd;
    border-radius: 5px;
    &:hover {
      background: rgb(240, 236, 236);
    }
    img {
      vertical-align: middle;
      margin-top: -3px;
    }
  }
  .hot {
    float: right;
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    color: white;
    border-radius: 6px;
    background: #cc0e0e;
  }
  .msk {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.song-subtext {
  font-size: 13px;
  margin-top: 6px;
  .song-prefix {
    margin: 0 4px;
    color: rgb(133, 133, 133);
    font-size: 12px;
  }
  .nickname {
    color: rgb(97, 96, 96);
  }
}
.category {
  .categorySelect {
    position: absolute;
    top: 35px;
    left: -50%;
    width: 700px;
    box-shadow: 0 0 2px #d1d1d1;
    background: white;
    border: 1px solid rgb(224, 224, 224);
    color: black;
    z-index: 99;
    h3 {
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgb(228, 228, 228);
      overflow: hidden;
      .categoryAllBtn {
        display: block;
        font-size: 13px;
        font-weight: 400;
        width: 70px;
        height: 30px;
        margin: 13px 0 0 30px;
        line-height: 30px;
        background: white;
        border-radius: 6px;
        border: 1px solid #ccc;
        &:hover {
          background: rgb(245, 73, 73);
          color: white;
        }
      }
    }
  }

  .category-content {
    border-collapse: collapse;
    tr {
      th {
        display: block;
        width: 60px;
        padding: 3px 20px 3px 30px;
        font-size: 12px;
      }
      td {
        border-left: 1px solid rgb(224, 224, 224);
        padding-left: 12px;
        font-size: 12px;
        transform: scale(0.97);
        text-align: left;
        padding: 6px 0;
        div {
          display: inline-block;
          margin: 0 4px;
        }
        span {
          margin-right: 5px;
          padding: 2px 5px;
        }
        span:hover {
          color: red;
          text-decoration: underline;
        }
        i {
          color: #aaa;
          font-size: 10px;
        }
      }
    }
  }
}
.categorySelectsan {
  position: absolute;
  top: 28px;
  left: 30px;
  transform: rotate(45deg);
  width: 20px;
  height: 20px;
  box-shadow: 0 0 2px #d1d1d1;
  border: 1px solid rgb(224, 224, 224);
  background: white;
}
.category-item-active {
  background: #ccc;
}
</style>
