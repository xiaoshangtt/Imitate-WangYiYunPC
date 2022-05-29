<template>
  <div class="dj-radio">
    <div class="hd" v-if="$route.meta.isShowNav">
      <dj-radio-nav
        :currentProgramId="currentProgramId"
        :dataList="djCategory"
      ></dj-radio-nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";

import DjRadioNav from "./djradio-nav.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { emitter } from "@/utils";

export default defineComponent({
  name: "DjRadio",
  components: {
    DjRadioNav,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = Number(route?.query?.id || 0);
    const currentProgramId = ref(id);

    store.dispatch("discover/ac_getDjCategory");
    const djCategory = computed(() => store.state.discover.djCategory);
    watch(
      () => route.query,
      () => {
        currentProgramId.value = route.query.id;
      }
    );

    emitter.on("changeProgram", (id) => {
      currentProgramId.value = id;
    });

    return {
      djCategory,
      currentProgramId,
    };
  },
});
</script>

<style lang="less" scoped>
.dj-radio {
  width: calc(var(--default-banner-width) + 2px);
  margin: 0 auto;
  padding: 40px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  box-shadow: 0 0 1px #ccc;
}
</style>
