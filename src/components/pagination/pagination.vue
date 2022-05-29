<template>
  <div class="pagination">
    <button
      class="pre cursor_pointer"
      :disabled="currentPage <= 1"
      :class="{
        disabled: currentPage <= 1,
        cursor_not_allowed: currentPage <= 1,
      }"
      @click="changeCurrentPage(-1, 'j')"
    >
      &lt;上一页
    </button>
    <div class="content">
      <span
        :class="currentPage == 1 ? 'currentPage' : ''"
        @click="changeCurrentPage(1)"
        >1</span
      >
      <span class="dot" v-if="currentPage - 2 - 1 > 1">...</span>
      <template v-if="currentPage <= 4 && currentPage >= 1">
        <span
          v-if="pageN >= 2"
          :class="currentPage == 2 ? 'currentPage' : ''"
          @click="changeCurrentPage(2)"
          >2</span
        >
        <span
          v-if="pageN >= 3"
          :class="currentPage == 3 ? 'currentPage' : ''"
          @click="changeCurrentPage(3)"
          >3</span
        >
        <span
          v-if="pageN >= 4"
          :class="currentPage == 4 ? 'currentPage' : ''"
          @click="changeCurrentPage(4)"
          >4</span
        >
        <span
          v-if="pageN >= 5"
          :class="currentPage == 5 ? 'currentPage' : ''"
          @click="changeCurrentPage(5)"
          >5</span
        >
      </template>
      <template
        v-else-if="
          currentPage >= pageN - 3 && currentPage <= pageN && pageN > 5
        "
      >
        <span
          :class="currentPage == pageN - 4 ? 'currentPage' : ''"
          @click="changeCurrentPage(pageN - 4)"
          >{{ pageN - 4 }}</span
        >
        <span
          :class="currentPage == pageN - 3 ? 'currentPage' : ''"
          @click="changeCurrentPage(pageN - 3)"
          >{{ pageN - 3 }}</span
        >
        <span
          :class="currentPage == pageN - 2 ? 'currentPage' : ''"
          @click="changeCurrentPage(pageN - 2)"
          >{{ pageN - 2 }}</span
        >
        <span
          :class="currentPage == pageN - 1 ? 'currentPage' : ''"
          @click="changeCurrentPage(pageN - 1)"
          >{{ pageN - 1 }}</span
        >
      </template>
      <template
        v-else-if="currentPage >= 5 && currentPage <= pageN - 4 && pageN > 5"
      >
        <span
          :class="currentPage == currentPage - 2 ? 'currentPage' : ''"
          @click="changeCurrentPage(currentPage - 2)"
          >{{ currentPage - 2 }}</span
        >
        <span
          :class="currentPage == currentPage - 1 ? 'currentPage' : ''"
          @click="changeCurrentPage(currentPage - 1)"
          >{{ currentPage - 1 }}</span
        >
        <span
          :class="currentPage == currentPage ? 'currentPage' : ''"
          @click="changeCurrentPage(currentPage)"
          >{{ currentPage }}</span
        >
        <span
          :class="currentPage == currentPage + 1 ? 'currentPage' : ''"
          @click="changeCurrentPage(currentPage + 1)"
          >{{ currentPage + 1 }}</span
        >
        <span
          :class="currentPage == currentPage + 2 ? 'currentPage' : ''"
          @click="changeCurrentPage(currentPage + 2)"
          >{{ currentPage + 2 }}</span
        >
      </template>
      <span class="dot" v-if="currentPage + 2 < pageN - 1 && pageN > 5 + 1"
        >. . .</span
      >
      <span
        v-if="pageN >= 5"
        :class="currentPage == pageN ? 'currentPage' : ''"
        @click="changeCurrentPage(pageN)"
        >{{ pageN }}</span
      >
    </div>
    <button
      class="next cursor_pointer"
      :disabled="currentPage >= pageN"
      :class="{
        disabled: currentPage >= pageN,
        cursor_not_allowed: currentPage >= pageN,
      }"
      @click="changeCurrentPage(1, 'j')"
    >
      下一页&gt;
    </button>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 35,
    },
    total: {
      type: Number,
      default: 200,
    },
  },
  emits: ["changeCurrentPage"],
  setup(props, context) {
    const changeCurrentPage = (i, type) => {
      context.emit("changeCurrentPage", i, type);
    };

    const pageN = computed(() => Math.ceil(props.total / props.limit));
    return {
      pageN,
      changeCurrentPage,
    };
  },
});
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  .pre,
  .next {
    display: inline-block;
    padding: 0 6px;
    margin: 0 10px;
    border: 1px solid #ccc;
    background: #eee;
    border-radius: 2px;
    &:hover {
      background: #ddd;
    }
    &.disabled {
      background: #eee;
    }
  }
  span {
    display: inline-block;
    padding: 0 7px;
    height: 22px;
    margin: 0 8px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .dot {
    border: none;
    margin: 0;
    padding: 0;
  }
}
.currentPage {
  background: url(~@/assets/images/button.png) no-repeat 0 -650px;
  color: white;
}
</style>
