<template>
  <div>
    <user-info-content>
      <template #t-hd>
        <div class="t-hd">
          <span>TA的动态（{{ eventCount }}）</span>
        </div>
      </template>
      <template #content>
        <div class="content clearfix">
          <div class="dynamic">
            <div class="dynamic-wp">
              <event-list
                class="event-list"
                @scrollDoneBottom="scrollDoneBottom"
                :dataList="userEventList"
              ></event-list>
              <loading v-if="eventDataLoading" class="loading"></loading>
            </div>
          </div>
          <div class="follows">
            <right-reco-item title="TA的关注">
              <template #pl-item>
                <li
                  class="p-item"
                  v-for="info in userFollows"
                  :key="info?.userId"
                >
                  <a class="avatar" :href="`/user/home?id=${info?.userId}`">
                    <img v-lazy="info.avatarUrl" alt="" />
                  </a>
                  <p>
                    <a
                      :href="`/user/home?id=${info?.userId}`"
                      class="nickname one-ellipsis"
                      >{{ info?.nickname }}</a
                    >
                    <img
                      v-if="info?.avatarDetail?.identityIconUrl"
                      v-lazy="info?.avatarDetail?.identityIconUrl"
                      alt=""
                    />
                  </p>
                </li>
              </template>
            </right-reco-item>
          </div>
        </div>
      </template>
    </user-info-content>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";

import UserInfoContent from "../childrencp/user-info-content.vue";
import EventList from "../childrencp/event-list";
import RightRecoItem from "@/components/right_reco_item";
import Loading from "@/components/loading";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "UserEvent",
  components: {
    UserInfoContent,
    RightRecoItem,
    EventList,
    Loading,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const uid = route?.query?.id || 0;
    const limit = ref(10);
    const eventDataLoading = ref(false);

    store.dispatch("user/ac_getUserFollows", {
      limit: 20,
      offset: 0,
      uid,
    });
    const userFollows = computed(() =>
      store.state.user.userFollows.follow.slice(0, 6)
    );

    async function getUserEventData() {
      await store.dispatch("user/ac_getUserEvent", {
        uid,
        limit: limit.value,
      });
    }
    getUserEventData();
    const more = computed(() => store.state.user.userEvent.more || false);
    const eventCount = computed(() => {
      return (
        store.state.user?.userDetail?.profile?.eventCount ||
        store.state.userEvent?.size
      );
    });
    const userEventList = computed(
      () => store.state.user?.userEvent?.events || []
    );

    const scrollDoneBottom = async () => {
      if (more.value) {
        console.log(1);
        eventDataLoading.value = true;
        await getUserEventData();
        eventDataLoading.value = false;
      }
    };

    return {
      userFollows,
      userEventList,
      eventCount,
      eventDataLoading,
      scrollDoneBottom,
    };
  },
});
</script>

<style lang="less" scoped>
.t-hd {
  font-size: 21px;
  color: #666;
}
.content {
  min-height: 700px;
  .dynamic {
    float: left;
    width: 100%;
    margin-right: -251px;
    .dynamic-wp {
      margin-right: 250px;
      border-right: 1px solid #ccc;
      padding: 10px 25px 0px 0px;
    }
  }
  .follows {
    float: right;
    width: 250px;
    box-sizing: border-box;
    padding: 10px 0px 0px 25px;
  }
}
.p-item {
  float: left;
  padding-left: 16px;
  width: 64px;
  height: 105px;
  &:nth-child(3n + 1) {
    margin-left: -16px;
  }
  .avatar {
    display: block;
    height: 64px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    margin-top: 4px;
    .nickname {
      max-width: 70%;
      font-size: 12px;
    }
    img {
      float: right;
      width: 13px;
      height: 13px;
      vertical-align: middle;
    }
  }
}
.loading {
  margin: 20px auto;
  width: 40px;
  height: 40px;
}
</style>
