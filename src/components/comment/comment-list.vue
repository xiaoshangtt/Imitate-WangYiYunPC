<template>
  <div class="comment-list">
    <h3>{{ title }}</h3>
    <div class="comment-list-main">
      <div
        class="comment-list-item clearfix"
        v-for="comment in comments"
        :key="comment.commentId"
      >
        <div class="avatar">
          <router-link
            :to="{ path: '/user/home', query: { id: comment?.user?.userId } }"
          >
            <img :src="comment?.user?.avatarUrl || ''" alt="" />
          </router-link>
        </div>
        <div class="comment-text">
          <div>
            <p class="n">
              <i class="username"
                ><router-link
                  :to="{
                    path: '/user/home',
                    query: { id: comment?.user?.userId },
                  }"
                  >{{ comment?.user?.nickname }}</router-link
                >
                ：</i
              >
              {{ comment?.content }}
              <em
                v-if="comment?.beReplied?.length > 0"
                class="be-replied one-ellipsis"
              >
                <i class="username"
                  ><router-link
                    :to="{
                      path: '/user/home',
                      query: { id: comment?.beReplied[0]?.user?.userId },
                    }"
                    >{{ comment?.beReplied[0]?.user?.nickname }}</router-link
                  >
                  ：</i
                >
                {{ comment?.beReplied[0]?.content }}
              </em>
            </p>
            <p class="d-t clearfix">
              <span class="time">{{ comment.timeStr }}</span>
              <span class="r-p">回复</span>
              <span class="praise" v-if="comment.likedCount">
                <i class="q-icon2"></i>（{{ comment?.likedCount }}）
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CommentList",
  props: {
    title: {
      type: String,
      default: "精彩评论",
    },
    comments: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="less" scoped>
.comment-list {
  h3 {
    margin-top: 20px;
    font-size: 11px;
    font-weight: 400;
    padding: 6px 0;
    border-bottom: 2px solid #ccc;
  }
  .comment-list-main {
    font-size: 13px;
    .comment-list-item {
      padding: 15px 0 10px 0;
      border-bottom: 1px solid #ddd;
      .avatar {
        position: relative;
        z-index: 99;
        a:hover {
          display: inline-block;
          text-decoration: underline;
          width: 100%;
          height: 100%;
        }
        float: left;
        width: 50px;
        height: 50px;
        margin-right: -60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .comment-text {
        width: 100%;
        float: right;
        font-size: 11px;
        line-height: 16px;
        div {
          margin-left: 60px;
          p.n {
            white-space: pre-line;
            a {
              color: #0c73c2;
            }
            .username {
            }
            .be-replied {
              display: block;
              margin-right: 10px;
              margin-top: 10px;
              padding: 8px 19px;
              width: 100%;
              box-sizing: border-box;
              line-height: 20px;
              background: #f4f4f4;
              border: 1px solid #dedede;
              word-break: break-all;
            }
          }
          p.d-t {
            margin: 15px 0 8px 0;
            .time {
              color: #999;
            }
            .praise {
              margin: 0 10px;
              float: right;
              i {
                width: 16px;
                height: 16px;
                background-position: -150px 0;
              }
            }
            .r-p {
              float: right;
            }
          }
        }
      }
    }
    .comment-list-item:last-child {
      border-bottom: none;
    }
  }
}
</style>
