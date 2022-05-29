<template>
  <div class="default">
    <wamp-frame
      title="热门歌手"
      :lineDataList="hotArtistList.slice(0, 10)"
      :smlDataList="hotArtistList.slice(10)"
    ></wamp-frame>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import WampFrame from "../childrencp/wamp-frame.vue";

export default defineComponent({
  name: "Default",
  components: {
    WampFrame,
  },
  setup() {
    const store = useStore();
    store.dispatch("discover/ac_getHotArtistList");
    const hotArtistList = computed(() => store.state.discover.hotArtistList);

    return {
      hotArtistList,
    };
  },
});
</script>

<style scoped>
.default {
  padding: 40px;
}
</style>
