<template>
  <div class="user">
    <div class="user-wamp">
      <user-info
        v-if="$route.path.indexOf('/user/songs/rank') == -1"
        :userInfo="userDetail"
      ></user-info>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import UserInfo from "./childrencp/userInfo.vue";

export default defineComponent({
  name: "User",
  components: {
    UserInfo,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const uid = route?.query?.id || 0;
    // 获取用户详情
    store.dispatch("user/ac_getUserDetail", uid);
    const userDetail = computed(() => store.state.user.userDetail);

    onUnmounted(() => {
      store.commit("user/mu_clearUserInfo");
    });

    return {
      userDetail,
    };
  },
});
</script>

<style lang="less" scoped>
.user {
  width: var(--default-banner-width);
  margin: 0 auto;
  .user-wamp {
    padding: 40px;
  }
}
</style>
