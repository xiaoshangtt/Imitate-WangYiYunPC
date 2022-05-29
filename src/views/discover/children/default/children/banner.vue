<template>
  <div class="banner"
       :style="{backgroundImage: `url(${banners[currentIndex]?.imageUrl + '?imageView&blur=40x20'})`}">
    <div class="content clearfix">
      <div class="banner-main">
        <div class="banner-main-wamp">
          <carousel
            @changeCurrentIndex="changeCurrentIndex"
            class="carousel"
            :dataList="banners"
            :currentIndex="currentIndex"
          ></carousel>
        </div>
      </div>
      <div class="download">
        <a
          href="https://music.163.com/#/download"
          class="download-img"
          target="_blank"
          title="下载客户端">
        </a>
        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {defineComponent, ref} from "vue";

  import Carousel from "@/components/carousel";

  export default defineComponent({
    name: "Banner",
    components: {
      Carousel,
    },
    props: {
      banners: {
        type: Array,
        default: () => [],
      },
    },
    setup() {
      const currentIndex = ref(1);
      const changeCurrentIndex = (index) => {
        currentIndex.value = index;
      }

      return {
        currentIndex,
        changeCurrentIndex
      }
    }
  });
</script>

<style lang="less" scoped>
  .banner {
    position: relative;
    height: 285px;
    background-size: 6000px;
    background-position: center center;

    .content {
      position: relative;
      width: calc(var(--default-banner-width) + 2px);
      margin: 0 auto;

      .banner-main {
        float: left;

        width: 100%;
        height: 100%;
        margin-right: -254px;

        .banner-main-wamp {
          height: 285px;
          width: 730px;
        }

        .carousel {
          height: 100%;
        }
      }

      .download {
        position: absolute;
        top: 0;
        right: -1px;
        z-index: 20;
        float: right;
        width: 254px;
        height: 285px;
        background: url(~@/assets/images/download.png);

        .download-img {
          display: block;
          width: 215px;
          height: 56px;
          margin: 186px 0 0 19px;
          background: url(~@/assets/images/download.png) no-repeat 0 -9999px;
        }

        .download-img:hover {
          background-position: 0 -290px;
        }

        p {
          color: #8d8d8d;
          margin: 10px auto;
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
</style>