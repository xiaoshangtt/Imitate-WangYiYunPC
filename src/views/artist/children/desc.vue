<template>
  <div class="desc">
    <div class="n-bx">
      <h2>
        <i class="icn">&nbsp;</i>
        张惠妹简介
      </h2>
      <p>
        {{ artistDesc?.briefDesc }}
      </p>
      <template v-for="indn in artistDesc?.introduction" :key="indn.ti">
        <h2 class="indn">{{ indn?.ti }}</h2>
        <p class="indn-cn">{{ indn?.txt }}</p>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Desc",
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = ref(route?.query?.id || 0);

    store.dispatch("artist/ac_getArtistDesc", id.value);

    const artistDesc = computed(() => store.state.artist.artistDesc);

    return {
      artistDesc,
    };
  },
});
</script>

<style lang="less" scoped>
.desc {
  .n-bx {
    font-family: Arial, Helvetica, sans-serif;
    .icn {
      height: 14px;
      width: 3px;
      margin-right: 7px;
      background-color: #c10d0c;
    }
    h2 {
      display: inline-block;
      margin: 28px 0 8px 0;
      color: #333;
      font-size: 14px;
    }
    p {
      line-height: 25px;
      color: #666;
      text-indent: 2em;
    }
    .indn-cn {
      text-indent: 0;
    }
  }
}
</style>
