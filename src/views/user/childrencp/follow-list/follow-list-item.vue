<template>
  <div class="follow-list-item clearfix">
    <a class="follow-avatar" :href="`/user/home?id=${info?.userId}`">
      <img v-lazy="info?.avatarUrl" alt="" />
    </a>
    <div class="follow-info">
      <a :href="`/user/home?id=${info?.userId}`" class="name">{{
        info?.nickname
      }}</a>
      <i class="gend gendersm" :class="`gendersm-${info?.gender}`"></i>
      <div class="tg">
        <a :href="`/user/event?id=${info?.userId}`">动态{{ info?.eventCount }}</a> <span>|</span>
        <a :href="`/user/follows?id=${info?.userId}`">关注{{ info?.follows }}</a> <span>|</span>
        <a :href="`/user/fans?id=${info?.userId}`">粉丝{{ info?.followeds }}</a>
      </div>
      <p class="intro one-ellipsis" v-if="info?.signature">
        {{ info?.signature }}
      </p>
      <div class="sub-btn cursor_pointer"><i class="add-white"></i> 关注</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FollowListItem",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="less" scoped>
.follow-list-item {
  position: relative;
  .follow-avatar {
    position: relative;
    float: left;
    width: 60px;
    height: 60px;
    margin-right: -60px;
    z-index: 99;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .follow-info {
    float: right;
    width: 100%;
    float: left;
    padding-left: 72px;
    padding-top: 2px;
    box-sizing: border-box;
    a.name {
      color: rgb(12, 115, 194);
    }
    .tg {
      margin: 4px 0 6px 0;
      font-size: 12px;
      span {
        display: inline-block;
        margin: 4px 5px 0;
        width: 1px;
        height: 10px;
      }
      a {
        color: #555;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    .intro {
      font-size: 12px;
      color: #555;
      max-width: 250px;
    }
    .sub-btn {
      float: right;
      margin-top: -30px;
      width: 70px;
      height: 31px;
      line-height: 31px;
      color: #fff;
      font-size: 14px;
      background-color: skyblue;
      border-radius: 6px;
      padding-left: 10px;
      box-shadow: 0 0 1px skyblue;
      &:hover {
        background: rgb(100, 186, 221);
      }
    }
    .gend {
      margin: 2px 4px 0;
    }
  }
}
</style>
