<template>
  <div class="user-info clearfix">
    <div class="user-avatar">
      <img v-lazy="userInfo?.profile?.avatarUrl || ''" alt="" />
    </div>
    <div class="user-dinfo">
      <div class="hd">
        <p class="u-ngg">
          <span class="name">{{
            userInfo?.profile?.nickname || "default"
          }}</span>
          <i class="if-vip vip-6 vip-level"></i>
          <i class="grade grade-lv">
            {{ userInfo.level }}
            <i class="grade-vl"></i>
          </i>
          <i
            class="gender"
            :class="`gender-${userInfo?.profile?.gender || 1}`"
          ></i>
          <a href="">
            <em class="s-btn btn u-btn u-btn-7">发私信</em>
          </a>
          <a href="">
            <em class="s-btn btn u-btn u-btn-8">关注</em>
          </a>
          <a href="" class="u-btn2 o-singer">
            <em class="">查看歌手页</em>
          </a>
        </p>
        <div class="acpt">
          <div class="acpt-item" v-if="false">
            <i class="q-icon2 q-icon2-ic q-icon2-yyr"></i>
            <span>网易音乐人</span>
            <ul class="tags">
              <span class="tag">作词</span>
              <span class="tag">作曲</span>
            </ul>
          </div>
          <div class="acpt-item" v-if="userInfo?.profile?.allAuthTypes">
            <i class="q-icon2 q-icon2-ic q-icon2-dr"></i>
            <span>{{
              userInfo?.profile?.allAuthTypes
                ?.map((item) => item.desc)
                ?.join("、")
            }}</span>
            <ul class="tags">
              <span class="tag">作词</span>
              <span class="tag">作曲</span>
            </ul>
          </div>
        </div>
      </div>
      <div class="subc clearfix">
        <router-link class="subc-i" :to="`/user/event?id=${$route?.query?.id}`">
          <span class="n">{{ userInfo?.profile?.eventCount }}</span>
          <span class="tn">动态</span>
        </router-link>
        <router-link
          class="subc-i"
          :to="`/user/follows?id=${$route?.query?.id}`"
        >
          <span class="n">{{ userInfo?.profile?.follows }}</span>
          <span class="tn">关注</span>
        </router-link>
        <router-link class="subc-i" :to="`/user/fans?id=${$route?.query?.id}`">
          <span class="n">{{ userInfo?.profile?.followeds }}</span>
          <span class="tn">粉丝</span>
        </router-link>
      </div>
      <div class="o-intr">
        <p v-if="userInfo?.profile?.signature">
          <em>个人介绍：</em>{{ userInfo?.profile?.signature || "" }}
        </p>
        <p><em>所在地区：</em>上海市&emsp;&emsp; <em>年龄：</em>00后</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserInfo",
  props: {
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="less" scoped>
.user-info {
  margin-bottom: 43px;
  .user-avatar {
    float: left;
    position: relative;
    width: 188px;
    height: 188px;
    margin-right: 40px;
    img {
      display: block;
      width: 180px;
      height: 180px;
      padding: 3px;
      background: #fff;
      border: 1px solid #d5d5d5;
    }
  }
  .user-dinfo {
    float: left;
    width: 670px;
    .hd {
      padding-bottom: 12px;
      border-bottom: 1px solid #ccc;
      .u-ngg {
        font-size: 22px;
        .name {
        }
        i.if-vip {
          margin-left: 10px;
          margin-bottom: 4px;
          vertical-align: middle;
          display: inline-block;
        }
        a {
          display: inline-block;
          vertical-align: bottom;
        }
        .sx {
          margin-left: 25px;
        }
        .s-btn {
          margin: 0 6px;
        }
        .o-singer {
          float: right;
          margin-top: 5px;
          font-size: 12px;
          padding: 7px 16px;
          vertical-align: middle;
          background-color: rgb(246, 246, 246);
          border: 1px solid #aaa;
          border-radius: 4px;
          box-shadow: 0 0 1px #aaa;
          &:hover {
            background-color: rgb(233, 231, 231);
          }
        }
      }
      .acpt {
        font-size: 14px;
        line-height: 20px;
        .acpt-item {
          margin: 8px 0;
          .tags {
            margin: 0 8px;
            display: inline-block;
            .tag {
              margin: 0 5px;
              font-size: 12px;
              border: 1px solid #aaa;
              padding: 2px 5px;
              border-radius: 2px;
              color: #aaa;
            }
          }
        }
      }
    }
    .subc {
      .subc-i {
        float: left;
        text-align: start;
        padding: 6px 0;
        color: #555;
        span {
          min-width: 90px;
          margin: 3px 0;
          display: block;
        }
        span.n {
          font-size: 25px;
        }
        span.tn {
          font-size: 13px;
        }
      }
      .subc-i:hover {
        color: #0c73c2;
      }
    }
    .o-intr {
      font-size: 12px;
      color: #777;
      line-height: 26px;
    }
  }
}
</style>
