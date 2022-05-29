<template>
  <div class="works">
    <div class="btns clearfix">
      <a
        href="javascript:void(0)"
        @click="
          $store.dispatch('musiclist/ac_playlistAddOrReplaceMusiclist', {
            type: 'replace',
            artistId: $route.query?.id || 0,
          })
        "
        class="ply button2"
      >
        <i class="button2">
          <em class="ply-icon button2"></em>
          播放
        </i>
      </a>
      <a
        href="javascript:void(0)"
        class="ad button2"
        @click="
          $store.dispatch('musiclist/ac_playlistAddOrReplaceMusiclist', {
            type: 'add',
            artistId: $route.query?.id || 0,
          })
        "
      ></a>
      <a href="javascript:void(0)" class="fav i-btnu button2">
        <span class="button2">收藏热门50</span>
      </a>
    </div>
    <div class="ctn-song">
      <div class="f-cb">
        <table class="table-bx">
          <tbody>
            <tr
              class="clearfix"
              v-for="(song, index) in artistHot50Song"
              :key="song.id"
            >
              <td class="w1 one-ellipsis">
                <div class="hd clearfix">
                  <i
                    class="ply-icon table"
                    @click="
                      $store.dispatch('musiclist/ac_changePlayMusic', song)
                    "
                    >&nbsp;</i
                  >
                  <span class="idx">{{ index + 1 }}</span>
                </div>
              </td>
              <td class="w1-2">
                <div class="f-cb">
                  <div class="txt">
                    <router-link
                      :to="{ path: '/song', query: { id: song?.id } }"
                      :title="song?.name"
                      >{{ song?.name }}</router-link
                    >
                    <i class="mv-icon table"></i>
                  </div>
                </div>
              </td>
              <td class="w2">
                <span>{{ toMinutes(song?.dt / 1000 || 0) }}</span>
              </td>
              <td class="w4">
                <div>
                  <router-link
                    :to="{ path: '/album', query: { id: song?.al?.id } }"
                    >{{ song?.al?.name }}</router-link
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import { toMinutes } from "@/utils";

export default defineComponent({
  name: "Works",
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = ref(route.query?.id || 0);

    store.dispatch("artist/ac_getArtistHot50Song", id.value);
    const artistHot50Song = computed(() => store.state.artist.artistHot50Song);

    return {
      toMinutes,
      artistHot50Song,
    };
  },
});
</script>

<style lang="less" scoped>
.btns {
  padding: 20px 0 10px;
}
.table-bx {
  width: 100%;
  border: none;
  border-collapse: collapse;
  table-layout: fixed;
  td:nth-child(2) {
    position: relative;
    padding-right: 25px;
    margin-right: -25px;
    max-width: 99%;
    width: 45%;
  }
  tr:nth-child(2n + 1) {
    background-color: #f7f7f7;
  }
  td {
    float: left;
    padding: 6px 10px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    a:hover {
      text-decoration: underline;
    }
    .f-cb {
      .txt {
        position: relative;
        max-width: 99%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .mv-icon {
      display: inline-block;
      vertical-align: middle;
      width: 23px;
      height: 17px;
      margin: 0 0 0 5px;
      background-position: 0 -151px;
    }
  }
  .w1 {
    width: 74px;
    .hd {
      height: 18px;
      .ply-icon {
        float: right;
        width: 17px;
        height: 17px;
        cursor: pointer;
        background-position: 0 -103px;
        &:hover {
          background-position: 0 -128px;
        }
      }
      .idx {
        float: left;
        width: 25px;
        margin-left: 5px;
        color: #999;
      }
    }
  }
  .w2 {
    width: 69px;
    color: #666;
  }
  .w4 {
    width: 20%;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
