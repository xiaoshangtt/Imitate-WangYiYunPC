<template>
  <div class="cat">
    <wamp-frame
      :lineDataList="artistList.slice(0, 10)"
      :smlDataList="artistList.slice(10)"
      :isShowBottom="true"
      :title="currentNav?.title"
      :isShowLetterFind="true"
    ></wamp-frame>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";

import WampFrame from "../childrencp/wamp-frame.vue";

import { ArtistNavConfig } from "../artist-nav.config";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Cat",
  components: {
    WampFrame,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    function getArtistListData() {
      store.dispatch("discover/ac_getArtistList", {
        type: currentNav.value?.params?.type || 1,
        area: currentNav.value?.params?.area || 7,
        initial: route.query?.initial || -1,
      });
    }
    onMounted(() => {
      getArtistListData();
    });

    const artistList = computed(() => store.state.discover?.artistList);

    const currentNav = computed(() => {
      let nav = null;
      ArtistNavConfig.forEach((item) => {
        item.subnav.forEach((xitem) => {
          if (xitem.selectId == route.query.id) {
            nav = xitem;
            return;
          }
        });
      });
      return nav;
    });
    const routeWatch = watch(
      () => route.query,
      () => {
        getArtistListData();
      }
    );
    onUnmounted(() => {
      routeWatch();
    });

    return {
      currentNav,
      artistList,
    };
  },
});
</script>

<style lang="less" scoped>
.cat {
  padding: 40px;
}
</style>
