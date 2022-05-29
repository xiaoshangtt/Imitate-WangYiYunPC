<template>
  <div class="home">
    <record-songs-rank
      class="record-songs-rank"
      v-if="peopleCanSeeMyPlayRecord"
      @changeUserRecordType="changeUserRecordType"
      :dataList="userRecord?.slice(0, 10) || []"
      :UserRecordType="UserRecordType"
      :showFooter="true"
    >
    </record-songs-rank>

    <user-info-content
      v-if="playlistCount.createPlaylistCount"
      class="list-song"
      :title="`${nickName}创建的歌单（${playlistCount.createPlaylistCount}）`"
    >
      <template #content>
        <list-song
          :showHeader="false"
          :dataList="userPlaylist.createPlaylist"
          :songOptions="songOptions"
          @AlScrollBottom="getUserPlayListData"
        ></list-song>
      </template>
    </user-info-content>
    <user-info-content
      v-if="playlistCount.storePlaylistCount"
      class="list-song"
      :title="`${nickName}收藏的歌单（${playlistCount.storePlaylistCount}）`"
    >
      <template #content>
        <list-song
          :showHeader="false"
          :dataList="userPlaylist.storePlaylist"
          :songOptions="songOptions"
          @AlScrollBottom="getUserPlayListData"
        ></list-song>
      </template>
    </user-info-content>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";

import UserInfoContent from "../childrencp/user-info-content.vue";
import ListSong from "@/components/list-song";
import RecordSongsRank from "../childrencp/record-songs-rank.vue";

import { useUserRecord } from "@/hooks";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "UserHome",
  mounted() {
    console.log(this.userPlaylist);
  },
  components: {
    UserInfoContent,
    ListSong,
    RecordSongsRank,
  },
  setup() {
    const limit = ref(30);
    const currentPage = ref(1);
    const store = useStore();
    const route = useRoute();
    const playlistLoading = ref(false);
    const playlistMore = ref(true);

    const {
      uid,
      UserRecordType,
      userRecord,
      peopleCanSeeMyPlayRecord,
      changeUserRecordType,
    } = useUserRecord(store, route);

    const songOptions = ref({
      showBottomText: true,
      showMask: true,
    });
    const nickName = computed(() => store.getters["user/g_nickName"]);
    const playlistCount = computed(() => store.getters["user/g_playlistCount"]);

    // 获取用户歌单
    const getUserPlayListData = async () => {
      if (playlistMore.value) {
        if (!playlistLoading.value) {
          playlistLoading.value = true;
          let more = await store.dispatch("user/ac_getUserPlaylist", {
            uid,
            limit: limit.value,
            offset: (currentPage.value++ - 1) * limit.value,
          });
          playlistMore.value = more;
          playlistLoading.value = false;
        }
      }
    };
    getUserPlayListData();

    const userPlaylist = computed(() => store.state.user.userPlaylist);

    return {
      userPlaylist,
      songOptions,
      nickName,
      playlistCount,
      peopleCanSeeMyPlayRecord,
      UserRecordType,
      userRecord,
      getUserPlayListData,
      changeUserRecordType,
    };
  },
});
</script>

<style lang="less" scoped>
.record-songs-rank {
  margin-bottom: 50px;
}
</style>
