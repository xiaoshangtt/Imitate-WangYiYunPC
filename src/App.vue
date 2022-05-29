<template>
  <div>
    <nav-header></nav-header>
    <!-- vue3的router-view在配合transition或keep-alive使用时，需要这样写 -->
    <router-view v-slot="{ Component }">
      <transition name="page" appear>
        <component class="component-bx" :is="Component"></component>
      </transition>
    </router-view>
    <Footer></Footer>
    <music-player></music-player>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import NavHeader from "@/components/nav-header";
import Footer from "@/components/footer";
import MusicPlayer from "@/components/music-player";

export default defineComponent({
  name: "App",
  components: {
    NavHeader,
    Footer,
    MusicPlayer,
  },
  setup() {
    const musicListShow = ref(false);
    const changeMusicListShow = (bool: any) => {
      musicListShow.value = bool;
    };

    return {
      musicListShow,
      changeMusicListShow,
    };
  },
});
</script>

<style lang="less" scoped>
.page-enter-from,
.page-leave-to {
  display: none;
  opacity: 0;
}
.page-enter-active,
.page-leave-active {
  transition: all 1s;
}
.page-enter-to,
.page-leave-from {
  display: block;
  opacity: 1;
}
.component-bx {
  min-height: 700px;
}
</style>
