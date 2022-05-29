<template>
  <div class="comment">
    <div class="hd">
      <h3 class="title">评论</h3>
      <span class="total-comment">共{{ total }}条评论</span>
    </div>
    <div class="comment-hd clearfix">
      <div class="portrait">
        <img
          src="https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
          alt=""
        />
      </div>
      <div class="text-comment">
        <div class="text-content">
          <textarea placeholder="评论"></textarea>
          <div class="comment-btn clearfix">
            <span class="expin q-icon cursor_pointer"><i></i></span>
            <span class="assign q-icon cursor_pointer"><i></i></span>
            <button class="cursor_pointer">评论</button>
            <span class="num-max">140</span>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-content" v-if="comments.length">
      <comment-list
        v-if="hotComments.length > 0"
        title="精彩评论"
        :comments="hotComments || []"
      ></comment-list>
      <comment-list
        ref="cmRef"
        v-if="comments.length > 0"
        :title="`最新评论（${total}）`"
        :comments="comments || []"
      ></comment-list>
    </div>
    <div v-else class="comment-none">
      <span>暂无评论...</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import CommentList from "./comment-list.vue";

export default defineComponent({
  name: "Comment",
  components: {
    CommentList,
  },
  props: {
    hotComments: {
      type: Array,
      default: () => [],
    },
    comments: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 1000,
    },
  },
  setup() {
    const cmRef = ref(null);
    const backCmTp = () => {
      // 回到评论顶部
      document.querySelector("#app").scrollTo({
        top: cmRef.value.$el.offsetTop - 50,
      });
    };

    return {
      backCmTp,
      cmRef,
    };
  },
});
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  .hd {
    padding: 10px 0;
    border-bottom: 3px solid rgb(205, 11, 11);
    margin-bottom: 20px;
    .title {
      display: inline-block;
      font-weight: 400;
      font-size: 22px;
    }
    .total-comment {
      font-size: 12px;
      color: #444;
      margin-left: 20px;
    }
  }
  .comment-hd {
    .portrait {
      float: left;
      width: 50px;
      height: 50px;
      margin-right: -50px;
      img {
        float: left;
        width: 100%;
        height: 100%;
      }
    }
    .text-comment {
      float: right;
      width: 100%;
      .text-content {
        margin-left: 60px;
        textarea {
          font-size: 13px;
          padding: 5px;
          width: 98%;
          height: 60px;
        }
        .comment-btn {
          margin-top: 6px;
          line-height: 25px;
          font-size: 13px;
          .expin,
          .assign {
            width: 20px;
            height: 20px;
          }
          .expin {
            background-position: -40px -490px;
          }
          .assign {
            background-position: -60px -490px;
          }
          button {
            float: right;
            padding: 4 7px;
            // border: none;
            // box-shadow: 0 0 2px rgb(149, 147, 147);
            // color: white;
          }
          .num-max {
            float: right;
            color: #666;
            margin-right: 20px;
          }
        }
      }
    }
  }
  .comment-none {
    margin-top: 30px;
    text-align: center;
    font-size: 20px;
    color: #999;
  }
}
</style>
