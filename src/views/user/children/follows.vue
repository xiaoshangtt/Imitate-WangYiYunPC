<template>
  <div class="follow">
    <user-info-content>
      <template #t-hd>
        <div class="t-hd">
          <span>粉丝（{{ total }}）</span>
        </div>
      </template>
      <template #content>
        <follow-list :dataList="userFollows"></follow-list>
        <pagination
          v-if="total > limit"
          class="pagination"
          :limit="limit"
          :total="total"
          :currentPage="currentPage"
          @changeCurrentPage="changeCurrentPage"
        ></pagination>
      </template>
    </user-info-content>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";

import UserInfoContent from "../childrencp/user-info-content.vue";
import FollowList from "../childrencp/follow-list";
import Pagination from "@/components/pagination";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "UserFollow",
  components: {
    UserInfoContent,
    FollowList,
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const uid = route?.query?.id || 0;
    const limit = ref(30);
    const currentPage = ref(1);

    store.dispatch("user/ac_getUserFollows", {
      limit: limit.value,
      offset: (currentPage.value - 1) * limit.value,
      uid,
    });

    const userFollows = computed(
      () => store.state.user.userFollows?.follow || []
    );
    const total = computed(
      () => store.state.user.userDetail?.profile?.follows || 0
    );

    const changeCurrentPage = (i, type = "d") => {
      if (type == "j") {
        currentPage.value += i;
      } else {
        currentPage.value = i;
      }
    };
    // watch(currentPage, (newValue) => {});

    return {
      limit,
      currentPage,
      userFollows,
      total,
      changeCurrentPage,
    };
  },
});
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 30px;
}
.t-hd {
  font-size: 21px;
  color: #666;
}
</style>
