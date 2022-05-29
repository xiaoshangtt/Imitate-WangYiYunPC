<template>
  <div class="right-reco-item">
    <div class="right">
      <h3>
        <span>{{ title }}</span>
        <slot name="title-slot"></slot>
      </h3>
      <ul class="hot-pl">
        <slot name="pl-item" :dataList="dataList">
          <li class="clearfix" v-for="item in dataList" :key="item.id">
            <router-link :to="{ path: '/playlist', query: { id: item?.id } }">
              <img :src="item?.coverImgUrl || ''" alt="" />
            </router-link>
            <div class="txt">
              <p class="t-h">
                <router-link
                  :to="{ path: '/playlist', query: { id: item?.id } }"
                  class="one-ellipsis"
                  >{{ item?.name }}
                </router-link>
              </p>
              <p class="t-d">
                <span class="by">by</span>
                <router-link
                  :to="{ path: '/user/home', query: { id: item?.userId } }"
                  class="one-ellipsis"
                  >{{ item?.creator?.nickname }}
                </router-link>
              </p>
            </div>
          </li>
        </slot>
      </ul>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RightRecoItem",
  props: {
    title: {
      type: String,
      default: "默认title",
    },
    dataList: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="less" scoped>
.right-reco-item {
  h3 {
    font-size: 12px;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

  .hot-pl {
    li {
      margin-bottom: 15px;

      img {
        float: left;
        width: 50px;
        height: 50px;
      }

      .txt {
        margin-left: 60px;

        a:hover {
          text-decoration: underline;
        }

        .t-h {
          font-size: 14px;
          margin-top: 4px;
        }

        .t-d {
          margin-top: 9px;

          .by {
            float: left;
            font-size: 10px;
            color: #999;
            margin-right: 3px;
          }

          a {
            font-size: 12px;
            float: left;
            max-width: 106px;
          }
        }
      }
    }
  }
}
</style>
