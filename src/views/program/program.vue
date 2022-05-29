<template>
  <div class="program">
    <detail-page
      infoMargin="15px 0 0 170px"
      :info="programDetail"
      :showComment="true"
      :hotComments="programComment?.hotComments || []"
      :comments="programComment?.comments || []"
      :commentLimit="limit"
      :commentTotal="programComment?.total"
      :commentCurrentPage="currentPage"
      @changeCurrentPage="changeCurrentPage"
    >
      <template #cover-img>
        <div class="cover-img">
          <img :src="programDetail?.coverUrl" />
        </div>
      </template>
      <template #bt-tp>
        <div class="bt-tp">
          <i class="q-icon2 q-icon2-music"></i>
          <router-link
            :to="{ path: '/djradio', query: { id: programDetail?.radio?.id } }"
            class="djradio-name hover_underline"
            :title="programDetail?.radio?.name"
            >{{ programDetail?.radio?.name }}</router-link
          >
          <span class="sub-bx">
            <a href="" class="button2">
              <em class="button2">
                <i class="q-icon2 q-icon2-pentagram"></i>
                订阅({{ toWan(programDetail?.radio?.subCount) }})
              </em>
            </a>
          </span>
        </div>
      </template>
      <template #btns>
        <div class="btns clearfix">
          <a href="" class="ply ply-one button2">
            <i class="button2">
              <em class="ply-icon button2"></em>
              播放
              {{
                parseInt(String(programDetail?.duration / 1000 / 60)) < 10
                  ? "0" + parseInt(String(programDetail?.duration / 1000 / 60))
                  : parseInt(String(programDetail?.duration / 1000 / 60))
              }}分{{
                parseInt(String((programDetail?.duration / 1000) % 60)) < 10
                  ? "0" +
                    parseInt(String((programDetail?.duration / 1000) % 60))
                  : parseInt(String((programDetail?.duration / 1000) % 60))
              }}秒
            </i>
          </a>
          <a href="" class="like i-btnu button2">
            <em class="button2">
              <i class="like-icon button2"></i>
              <span class="button2"
                >({{ toWan(programDetail?.likedCount) }})</span
              >
            </em>
          </a>
          <a href="" class="comment i-btnu button2">
            <span class="button2"
              >({{ toWan(programDetail?.commentCount) }})</span
            >
          </a>
          <a href="" class="share i-btnu button2">
            <span class="button2"
              >({{ toWan(programDetail?.shareCount) }})</span
            >
          </a>
          <a href="" class="download i-btnu button2">
            <span class="button2">下载</span>
          </a>
        </div>
      </template>
      <template #bt-bm>
        <div class="bt-bm">
          <div class="sub">
            <router-link
              :to="{
                path: '/discover/djradio/category',
                query: { id: programDetail?.categoryId },
              }"
              class="tit"
              >{{ programDetail?.categoryName }}</router-link
            >
            <strong class="tit-txt">
              {{ programDetail?.radio?.name }} 第{{
                programDetail?.radio?.programCount
              }}期
            </strong>
            <span class="createTime"
              >{{
                formatDate("YYYY-MM-DD", programDetail?.createTime)
              }}
              创建</span
            >
            <span class="plyCount"
              >播放：<em>{{ programDetail?.listenerCount }}</em
              >次</span
            >
          </div>
          <p class="desc">
            <span>介绍：</span>
            {{ programDetail?.description }}
          </p>
        </div>
      </template>
      <template #list>
        <program-list
          v-if="programDetail?.songs?.length"
          class="prgram-list"
          :dataList="programDetail?.songs || []"
        ></program-list>
      </template>
      <template #right>
        <div class="right-item-bx">
          <right-reco-item title="更多节目">
            <template #title-slot>
              <div class="title-slot">
                <router-link
                  :to="{ path: '/djradio', query: { id: djradioId } }"
                  class="cursor_pointer"
                  >更多&gt;</router-link
                >
              </div>
            </template>
            <template #pl-item>
              <ul class="pl-item clearfix">
                <li
                  v-for="program in djradioProgram.slice(0, 5)"
                  :key="program.id"
                >
                  <div class="img-bx">
                    <router-link
                      class="hover_underline"
                      :to="{ path: '/program', query: { id: program?.id } }"
                    >
                      <img :src="program?.coverUrl" />
                    </router-link>
                  </div>
                  <div class="info">
                    <div class="info-wamp">
                      <p class="program-name one-ellipsis">
                        <router-link
                          class="hover_underline"
                          :to="{ path: '/program', query: { id: program?.id } }"
                          :title="program?.name"
                          >{{ program?.name }}</router-link
                        >
                      </p>
                      <p class="one-ellipsis">
                        <span>Vol.{{ program?.serialNum }}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </template>
          </right-reco-item>
        </div>
      </template>
    </detail-page>
  </div>
</template>

<script>
import { computed, defineComponent, onUnmounted, ref, watch } from "vue";

import DetailPage from "@/components/detail-page";
import ProgramList from "./program-list.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import RightRecoItem from "@/components/right_reco_item";

import { toWan, formatDate } from "@/utils";

export default defineComponent({
  name: "Program",
  components: {
    DetailPage,
    ProgramList,
    RightRecoItem,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = ref(route.query?.id || 0);
    const djradioId = ref(0);
    const limit = ref(20);
    const currentPage = ref(1);

    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value += i;
      } else {
        currentPage.value = i;
      }
      getProgramComment();
    };

    function getProgramComment() {
      store.dispatch("program/ac_getProgramComment", {
        id: id.value,
        limit: limit.value,
        offset: (currentPage.value - 1) * limit.value,
      });
    }
    function getProgramData() {
      store.dispatch("program/ac_getProgramDetail", id.value);
      getProgramComment();
    }
    getProgramData();
    // 在programDetail节目详情中拿到电台的id，然后获取电台 的节目， 然后推荐到右边区域
    // 监听programDetail变化，变化后获取电台id，并请求电台中包含的节目
    const programDetailWatch = watch(
      () => store.state.program.programDetail,
      () => {
        djradioId.value = store.state.program.programDetail?.radio?.id || 0;
        store.dispatch("djradio/ac_getDjradioProgram", {
          rid: djradioId.value,
        });
      }
    );
    const djradioProgram = computed(() => {
      return (store.state.djradio.djradioProgram?.programs || [])
        .slice(0, 6)
        .filter((item) => item.id != id.value);
    });

    const programDetail = computed(() => {
      return store.state.program.programDetail;
    });
    const programComment = computed(() => store.state.program.programComment);

    const routeWatch = watch(
      () => route.query,
      () => {
        id.value = route.query?.id || 0;
        getProgramData();
      }
    );
    onUnmounted(() => {
      routeWatch();
      programDetailWatch();
    });

    return {
      toWan,
      formatDate,
      limit,
      currentPage,
      changeCurrentPage,
      programDetail,
      programComment,
      djradioProgram,
      djradioId,
    };
  },
});
</script>

<style lang="less" scoped>
.cover-img {
  width: 140px;
  height: 140px;
  padding: 3px;
  border: 1px solid #d5d5d5;
  margin: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
.bt-tp {
  margin-top: 30px;
  line-height: 29px;
  .q-icon2-music {
    vertical-align: middle;
  }
  .sub-bx {
    display: inline-block;
    & > a {
      display: inline-block;
      background-position: right -2400px;
      margin-left: 17px;
      font-size: 12px;
      height: 28px;
      padding: 0 7px 0 0;
      &:hover {
        background-position: right -2470px;
      }
      em {
        display: inline-block;
        padding: 0 6px;
        background-position: 0 -2370px;
        &:hover {
          background-position: 0 -2440px;
        }
        i {
          vertical-align: middle;
        }
      }
    }
  }
}
.btns {
  margin: 65px 0 0 -170px;
}
.bt-bm {
  margin: 25px 0 30px -170px;
  font-size: 12px;
  .sub {
    height: 35px;
    line-height: 35px;
    a.tit {
      display: inline-block;
      height: 16px;
      line-height: 16px;
      padding: 0 6px;
      color: #cc0000;
      border: 1px solid #cc0000;
      margin: -3px 9px 0 0;
      vertical-align: middle;
      &:hover {
        background-color: #fbeeee;
      }
    }
    .tit-txt {
      font-size: 14px;
    }
    .createTime {
      margin-left: 18px;
      color: #999;
    }
    .plyCount {
      margin-left: 18px;
      color: #999;
      em {
        color: #c20c0c;
        font-weight: 700;
      }
    }
  }
  .desc {
    line-height: 23px;
    color: #666;
  }
}
.prgram-list {
  margin: 0 0 20px 0;
}
.title-slot {
  float: right;
  font-size: 12px;
  font-weight: 400;
  a {
    color: #888;
  }
}
.pl-item {
  li {
    float: left;
    margin-bottom: 20px;
    height: 50px;
    .img-bx {
      position: relative;
      float: left;
      width: 50px;
      height: 50px;
      margin-right: -50px;
      z-index: 10;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      float: left;
      width: 100%;
      font-size: 12px;
      .info-wamp {
        padding-left: 60px;
        padding-right: 10px;
        p {
          margin-top: 4px;
          width: 90%;
        }
        p.program-name {
          font-size: 14px;
        }
        p:nth-child(2) {
          color: #999;
        }
      }
    }
  }
}
</style>
