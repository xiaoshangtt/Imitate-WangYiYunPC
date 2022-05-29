<template>
  <div class="nav-header">
    <nav-h
      :Navs="Navs"
      @changeCurrentNav="(newNav) => (currentNav = newNav)"
    ></nav-h>
    <sub-nav
      :subnavList="
        Navs[currentNav].subnav ?? (Navs[currentNav].subnavList || [])
      "
    ></sub-nav>
  </div>
</template>

<script>
  import {defineComponent, ref} from "vue";

  import NavH from "@/components/nav-h";
  import SubNav from "@/components/sub-nav";

  export default defineComponent({
    name: "NavHeader",
    components: {
      NavH,
      SubNav,
    },
    setup() {
      const Navs = ref([
        {
          name: "发现音乐",
          to: "/discover",
          subnavList: [
            {name: "推荐", to: "/discover"},
            {name: "排行榜", to: "/discover/toplist"},
            {name: "歌单", to: "/discover/playlist"},
            {name: "主播电台", to: "/discover/djradio"},
            {name: "歌手", to: "/discover/artist"},
            {name: "新碟上市", to: "/discover/album"},
          ],
        },
        {name: "我的音乐", to: "/my"},
        {name: "关注", to: "/friend"},
        {name: "商城", to: "https://music.163.com/store/product"},
        {name: "音乐人", to: "https://music.163.com/st/musician"},
        {name: "下载客户端", to: "https://music.163.com/#/download", hot: true},
      ]);

      const currentNav = ref(0);

      return {
        Navs,
        currentNav,
      };
    },
  });
</script>

<style scoped></style>
