<template>
  <div class="carousel">
    <ul class="carousel_list">
      <img :src="currentData" alt=""/>
    </ul>
    <ul class="dots">
      <li
        class="dot"
        :class="index == currentIndex ? 'dot-active' : ''"
        v-for="(dot, index) in dataList"
        :key="index"
      ></li>
    </ul>
  </div>
</template>

<script>
  import {defineComponent, ref, onUnmounted, computed} from "vue";

  export default defineComponent({
    name: "Carousel",
    props: {
      dataList: {
        type: Array,
        default: () => [],
      },
      currentIndex: {
        type: [Number, String],
        default: 1
      }
    },
    setup(props, context) {
      const timer = setInterval(() => {
        let i = props.currentIndex;
        if (i >= props.dataList.length - 1) {
          i = 0;
        } else {
          i++;
        }
        context.emit("changeCurrentIndex", i);
      }, 2000);

      onUnmounted(() => {
        clearInterval(timer);
      });

      const currentData = computed(() => {
        let url;
        try {
          url = props.dataList[props.currentIndex].imageUrl;
        } catch (err) {
          err;
        }
        return url;
      });

      return {
        currentData,
      };
    },
  });
</script>

<style lang="less" scoped>
  .carousel {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .carousel_list {
      height: 100%;

      img {
        display: block;
        width: 730px;
        height: 100%;
      }
    }

    .dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);

      .dot {
        float: left;
        margin: 0 5px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgb(216, 216, 216);
        transform: all 1s;
      }

      .dot-active {
        background: rgb(32, 31, 31);
      }
    }
  }
</style>
