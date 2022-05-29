<template>
  <div class="rank">
    <record-songs-rank
      @changeUserRecordType="changeUserRecordType"
      :dataList="userRecord || []"
      :UserRecordType="UserRecordType"
    ></record-songs-rank>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import RecordSongsRank from "../../../childrencp/record-songs-rank.vue";

import { useUserRecord } from "@/hooks";

export default defineComponent({
  name: "Rank",
  components: {
    RecordSongsRank,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const {
      uid,
      UserRecordType,
      userRecord,
      peopleCanSeeMyPlayRecord,
      changeUserRecordType,
    } = useUserRecord(store, route);

    return {
      uid,
      UserRecordType,
      userRecord,
      peopleCanSeeMyPlayRecord,
      changeUserRecordType,
    };
  },
});
</script>

<style scoped></style>
