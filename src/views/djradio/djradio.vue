<template>
  <div class="djradio">
    <detail-page
      :info="{ name: djradioDetail?.name || '' }"
      infoMargin="0 0 0 230px"
    >
      <template #cover-img>
        <div class="cover-img">
          <img v-lazy="djradioDetail?.picUrl" />
          <span class="mask coverall"></span>
        </div>
      </template>
      <template #bt-tp>
        <div class="bt-tp">
          <div class="user-info">
            <router-link
              :to="{
                path: '/user/home',
                query: { id: djradioDetail?.dj?.userId },
              }"
              class="avatar"
            >
              <img v-lazy="djradioDetail?.dj?.avatarUrl" />
            </router-link>
            <div class="name">
              <router-link
                :to="{
                  path: '/user/home',
                  query: { id: djradioDetail?.dj?.userId },
                }"
                >{{ djradioDetail?.dj?.nickname }}</router-link
              >
            </div>
            <img
              v-if="djradioDetail?.dj?.avatarDetail?.identityIconUrl"
              class="icon"
              v-lazy="djradioDetail?.dj?.avatarDetail?.identityIconUrl"
            />
          </div>
        </div>
      </template>
      <template #btns>
        <div class="btns clearfix">
          <a href="" class="subscribe button2">
            <i class="i-btnu button2"
              >订阅({{ toWan(djradioDetail?.subCount) }})</i
            >
          </a>
          <a href="" class="ply-b i-btnu button2">
            <span class="button2">播放全部</span>
          </a>
          <a href="" class="share i-btnu button2">
            <span class="button2"
              >分享({{ toWan(djradioDetail?.shareCount) }})</span
            >
          </a>
        </div>
      </template>
      <template #bt-bm>
        <p class="bt-bm">
          <router-link
            :to="{
              path: '/discover/djradio/category',
              query: { id: djradioDetail?.categoryId },
            }"
            class="tit"
            >{{ djradioDetail?.category }}</router-link
          >
          {{ djradioDetail?.desc }}
        </p>
      </template>
      <template #list>
        <djradio-list
          ref="djradioListRef"
          :dataList="djradioProgram?.programs"
          :total="djradioProgram?.count"
          @changeAsc="changeAsc"
          :asc="asc"
        ></djradio-list>
        <pagination
          class="pagintaion"
          :total="djradioProgram?.count"
          :limit="limit"
          :currentPage="currentPage"
          @changeCurrentPage="changeCurrentPage"
        ></pagination>
      </template>
    </detail-page>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onUnmounted } from "vue";

import DetailPage from "@/components/detail-page";
import DjradioList from "./djradio-list.vue";
import Pagination from "@/components/pagination";

import { useRoute } from "vue-router";
import { useStore } from "vuex";

import { toWan } from "@/utils";

export default defineComponent({
  name: "Djradio",
  components: {
    DetailPage,
    DjradioList,
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const djradioListRef = ref(null);
    const rid = ref(route.query?.id || 0);
    const limit = ref(100);
    const asc = ref(false);
    const changeAsc = (bool) => {
      asc.value = bool;
    };
    const currentPage = ref(1);
    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value += i;
      } else {
        currentPage.value = i;
      }
      getDjradioProgram();
      document.getElementById("app").scrollTo({
        top: djradioListRef.value.$el.offsetTop,
      });
    };

    const djradioDetail = computed(() => store.state.djradio?.djradioDetail);
    const djradioProgram = computed(() => store.state.djradio?.djradioProgram);

    function getDjradioProgram() {
      store.dispatch("djradio/ac_getDjradioProgram", {
        rid: rid.value,
        limit: limit.value,
        asc: asc.value,
        offset: (currentPage.value - 1) * limit.value,
      });
    }
    function getDjradioData() {
      store.dispatch("djradio/ac_getDjradioDetail", rid.value);
      getDjradioProgram();
    }
    getDjradioData();

    const ascWatch = watch(asc, () => {
      currentPage.value = 1;
      getDjradioProgram();
    });
    const routeWatch = watch(
      () => route.query,
      () => {
        rid.value = route.query.id;
        currentPage.value = 1;
        getDjradioData();
      }
    );
    onUnmounted(() => {
      ascWatch();
      routeWatch();
    });

    return {
      toWan,
      asc,
      changeAsc,
      limit,
      currentPage,
      changeCurrentPage,
      djradioDetail,
      djradioProgram,
      djradioListRef,
    };
  },
});
</script>

<style lang="less" scoped>
.cover-img {
  position: relative;
  width: 200px;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: absolute;
    top: -4px;
    left: -4px;
    display: inline-block;
    width: 208px;
    height: 208px;
    background-position: 0 -1285px;
  }
}
.bt-tp {
  margin-bottom: 20px;
  .user-info {
    line-height: 35px;
    font-size: 12px;
    .avatar {
      float: left;
      width: 35px;
      height: 35px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      float: left;
      a {
        color: #0c73c2;
      }
    }
    .icon {
      width: 13px;
      height: 13px;
      vertical-align: middle;
    }
  }
}
.btns {
  overflow: hidden;
  margin-bottom: 25px;
}
.bt-bm {
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  color: #666;
  .tit {
    display: inline-block;
    margin-right: 7px;
    color: #cc0000;
    border: 1px solid #cc0000;
    padding: 0 6px;
    &:hover {
      background-color: #fbeeee;
    }
  }
}
.pagintaion {
  margin-top: 20px;
}
</style>
