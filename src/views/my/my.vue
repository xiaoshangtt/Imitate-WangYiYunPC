<template>
  <div class="my">
    <div class="my-wamp mymusic">
      <div class="pic">
        <h2>登录网易云</h2>
        <a href="#" class="login-click mymusic"></a>
      </div>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from "vue";

  export default defineComponent({
    name: "My",
  });
</script>

<style lang="less" scoped>
  .my {
    width: var(--default-banner-width);
    min-height: 700px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(211, 211, 211);
    margin: 0 auto;

    .my-wamp {
      width: 807px;
      height: 268px;
      padding-top: 104px;
      margin: 0px auto;
      background-position: 0px 104px;

      .pic {
        overflow: hidden;
        margin-top: 0;
        width: 100%;
        height: 100%;

        h2 {
          height: 100px;
          text-indent: -9999px;
        }

        .login-click {
          display: block;
          width: 167px;
          height: 45px;
          margin: 102px 0px 0px 482px;
          background-position: 0 9999px;
        }

        .login-click:hover {
          background-position: 0px -278px;
        }
      }
    }
  }
</style>