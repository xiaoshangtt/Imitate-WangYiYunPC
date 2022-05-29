<template>
  <div class="djradio-list">
    <ms-frame>
      <template #title>
        <div class="title">节目列表</div>
      </template>
      <template #title-slot>
        <div class="title-slot">
          <span class="total">共{{ total }}期</span>
          <div class="change-sort">
            <a
              href="javascript:void(0)"
              class="cnt_radio-desc cnt_radio"
              :class="asc ? '' : 'cnt_radio-desc-active'"
              @click="changeAsc(false)"
            ></a>
            <a
              href="javascript:void(0)"
              class="cnt_radio-asc cnt_radio"
              :class="asc ? 'cnt_radio-asc-active' : ''"
              @click="changeAsc(true)"
            ></a>
          </div>
        </div>
      </template>
      <template #content>
        <div class="content">
          <table class="m-table">
            <tbody>
              <tr v-for="(program, index) in dataList" :key="program.id">
                <td class="col1">
                  <div class="hd">
                    <i class="ply-icon q-table q-table-ply"></i>
                    <span class="idx">{{ program?.serialNum }}</span>
                  </div>
                </td>
                <td class="col2">
                  <div class="tt one-ellipsis hover_underline">
                    <router-link
                      :to="{ path: '/program', query: { id: program?.id } }"
                      >{{ program?.name }}</router-link
                    >
                  </div>
                  <div class="opt">
                    <a
                      href=""
                      class="q-icon q-icon-four q-icon-add"
                      title="添加到播放列表"
                    ></a>
                    <span
                      class="q-table q-icon-four q-icon-store cursor_pointer"
                      title="收藏"
                    ></span>
                    <span
                      class="q-table q-icon-four q-icon-share cursor_pointer"
                      title="分享"
                    ></span>
                    <span
                      class="q-table q-icon-four q-icon-download cursor_pointer"
                      title="下载"
                    ></span>
                  </div>
                </td>
                <td class="col3">
                  <span class="ply-count"
                    >播放{{ toWan(program?.listenerCount, 0) }}</span
                  >
                </td>
                <td class="col4">
                  <span class="parise-count"
                    >赞{{ toWan(program?.likedCount, 0) }}</span
                  >
                </td>
                <td class="col5">
                  <span class="time">{{
                    formatDate("YYYY-MM-DD", program?.createTime)
                  }}</span>
                </td>
                <td class="col6">
                  <div
                    v-if="index == 0"
                    class="last cnt_radio cnt_radio-label"
                  ></div>
                  <span class="duration">{{
                    toMinutes(program?.duration / 1000)
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </ms-frame>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import MsFrame from "@/components/ms-frame";

import { formatDate, toWan, toMinutes } from "@/utils";

export default defineComponent({
  name: "DjradioList",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    asc: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MsFrame,
  },
  emits: ["changeAsc"],
  setup(props, context) {
    const changeAsc = (bool) => {
      context.emit("changeAsc", bool);
    };

    return {
      formatDate,
      toWan,
      toMinutes,
      changeAsc,
    };
  },
});
</script>

<style lang="less" scoped>
.title {
  margin-top: 10px;
  font-size: 20px;
  display: inline-block;
}
.title-slot {
  display: inline-block;
  font-size: 12px;
  .total {
    margin-left: 20px;
    color: #999;
  }
  .change-sort {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }
}
.content {
  .m-table {
    width: 100%;
    table-layout: fixed;
    font-size: 12px;
    border-collapse: collapse;
    border: 1px solid #d9d9d9;
    tr:nth-child(2n) {
      background-color: #f7f7f7;
    }
    tr {
      height: 55px;
      td {
        padding: 6px 10px;
        line-height: 18px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .col1 {
        width: 62px;
        .hd {
          height: 18px;
          .ply-icon {
            float: right;
            margin: 0;
          }
          .idx {
            float: left;
            margin-left: 10px;
            width: 25px;
            color: #999;
          }
        }
      }
      .col2 {
        width: 230px;
        .tt {
          margin-right: -100px;
          float: left;
          width: 100%;
          a {
            color: #333;
          }
        }
        .opt {
          display: none;
          a,
          span {
            margin: 0;
          }
        }
      }
      .col3 {
        width: 60px;
        .ply-count {
          color: #666;
        }
      }
      .col4 {
        width: 70px;
        .parise-count {
          color: #666;
        }
      }
      .col5 {
        width: 66px;
        .time {
          color: #999;
        }
      }
      .col6 {
        position: relative;
        .last {
          position: absolute;
          top: 0;
          left: 19px;
          width: 12px;
          height: 16px;
          background-position: 0 -100px;
        }
        .duration {
          color: #999;
        }
      }
    }
  }
}
</style>
