<template>
  <div>
    <user-info-content>
      <template #t-hd>
        <div class="t-hd">
          <span>粉丝（{{ total }}）</span>
        </div>
      </template>
      <template #content>
        <follow-list :dataList="userFans"></follow-list>
        <!-- 粉丝列表最多只显示1000个 -->
        <pagination
          v-if="total > limit"
          :limit="limit"
          :total="total >= 1000 ? 1000 : total"
          :currentPage="currentPage"
          @changeCurrentPage="changeCurrentPage"
          class="pagination"
        ></pagination>
      </template>
    </user-info-content>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";

import UserInfoContent from "../childrencp/user-info-content.vue";
import FollowList from "../childrencp/follow-list";
import Pagination from "@/components/pagination";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "UserFans",
  components: {
    UserInfoContent,
    FollowList,
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const uid = route?.query?.id || 0;
    const limit = ref(20);
    const currentPage = ref(1);

    function getUserFansData() {
      store.dispatch("user/ac_getUserFans", {
        uid,
        limit: limit.value,
        offset: (currentPage.value - 1) * limit.value,
      });
    }
    getUserFansData();
    const userFans = computed(() => store.state.user.userFans.followeds);
    const total = computed(() => store.state.user.userFans.size);

    const changeCurrentPage = (i, type = "d") => {
      console.log(i);
      if (type == "j") {
        currentPage.value += i;
      } else {
        currentPage.value = i;
      }
    };
    watch(currentPage, (newValue) => {
      getUserFansData();
    });

    return {
      userFans,
      total,
      currentPage,
      limit,
      changeCurrentPage,
    };
  },
});
</script>

<style lang="less" scoped>
.t-hd {
  font-size: 21px;
  color: #666;
}
.pagination {
  margin-top: 25px;
}
</style>
